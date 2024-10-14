import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION, APPLICATION_USER_MENU_MAP_REPOSITORY, APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY, APPLICATION_USER_MENU_REPOSITORY, ADMINUSER_PASSWORDHISTORY_REPO,
    APPLICATION_USER_SUBMENU_REPOSITORY, APPLICATION_USER_REPOSITORY, APPLICATION_USER_TEMP_REPOSITORY, APPLICATION_USER_HISTORY_REPOSITORY} from '../../config/constants'
import {ApplicationUserMenuMapModel, ApplicationUserMenuMapTempModel, ApplicationUserMenuModel, ApplicationUserSubMenuModel,
      ApplicationUserModel, ApplicationUserTempModel, ApplicationUserHistoryModel, ADminUserRoleModel, ADminUserPasswordHistoryModel} from '../../models'

import {AuthService} from '../auth/auth.service'
import { Op } from 'sequelize'
import { generateRandomString } from '../../helpers/utils'
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class UserManagementService {
    constructor(
        @Inject(APPLICATION_USER_MENU_REPOSITORY) private readonly applicationUserMenu: typeof ApplicationUserMenuModel,
        @Inject(APPLICATION_USER_SUBMENU_REPOSITORY) private readonly applicationUserSubMenu: typeof ApplicationUserSubMenuModel,

        @Inject(APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY) private readonly applicationUserMenuMapTemp: typeof ApplicationUserMenuMapTempModel,
        @Inject(APPLICATION_USER_MENU_MAP_REPOSITORY) private readonly applicationUserMenuMap: typeof ApplicationUserMenuMapModel,

        @Inject(APPLICATION_USER_REPOSITORY) private readonly applicationUserRepo: typeof ApplicationUserModel,
        @Inject(APPLICATION_USER_TEMP_REPOSITORY) private readonly applicationUserTempRepo: typeof ApplicationUserTempModel,
        @Inject(APPLICATION_USER_HISTORY_REPOSITORY) private readonly applicationUserHistoryRepo: typeof ApplicationUserHistoryModel,

        @Inject(ADMINUSER_PASSWORDHISTORY_REPO) private readonly applicationUserPasswordHistoryRepo: typeof ADminUserPasswordHistoryModel,

        private readonly authService: AuthService,
        @Inject(DATABASE_CONNECTION) private DB: Sequelize,

    ){}

    async getMerchantPlanFunctionMenuList () {

        const response = await this.DB.query(` select * from merchant_plan_functions_menu where status = 1 order by id `)
        return response[0]
    }

    async getAssignFunctionMenu(userInfo) {
      
        const {MSISDN=null, parent_id = null, plan_id=null} = userInfo
        if (plan_id) {
            const response = await this.DB.query(` select * from plan_features_map where plan_id =:plan_id`, { replacements: {plan_id}})
            return response[0]
        }

        return []

    }
    async adminuserPasswordHistoryCheck(username, password){
    
        let historyMatch = false
        const passHistory = await this.applicationUserPasswordHistoryRepo.findAll({ where: { username }, order:[['id','DESC']], limit: 4})
        for(const item of passHistory) {
    
            if (await this.authService.comparePassword(password, item.password)) {
                historyMatch = true
            }
        }
    
        return historyMatch
    }

    async passwordHistoryLog (username, password, activity) {
        await this.applicationUserPasswordHistoryRepo.create({username, password, activity})
    }
    async passwordNotification(password) {
        
    }
    async getApplicationUserMenuSubMenu(userinfo) {
 
        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_menu = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_menu = created_user_type === 1 ? true : false

        //[{ model: ApplicationUserSubMenuModel, as: 'submenu' }, 'id', 'ASC']
        return this.applicationUserMenu.findAll({

            include : [
                {
                    model : ApplicationUserSubMenuModel
                }
            ],
            logging:console.log,
            where : { is_admin_menu },
            order :[
                ['id','ASC'],
                [{ model: ApplicationUserSubMenuModel, as: 'submenu' }, 'id', 'ASC']
            ]
        })
    }

    async getAssignedApplicationUserMenuSubMenuMap(userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_menu = true, submenuids = [], menuids = []

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_menu = created_user_type === 1 ? true : false

        // const submenuinfo = await this.applicationUserMenuMap.findAll({where : {user_id : id,is_admin_user : is_admin_menu}})
        const submenuinfo = await this.applicationUserMenuMap.findAll({where : {user_id : roleid,is_admin_user : is_admin_menu}})

        if(submenuinfo.length) {

            submenuinfo.map(item => {

                submenuids.push(item['dataValues'].submenu_id)
                if(item['dataValues'].menu_id) {
                    menuids.push(item['dataValues'].menu_id)
                }
            })
        }

        const data1 = await this.applicationUserMenu.findAll({
            include : [
                {
                    model : ApplicationUserSubMenuModel,
                    where : { id : submenuids},
                    required : true
                }
            ],
            order :[['id','ASC']]
        })

        data1.map(item => menuids.push(item['dataValues'].id))

        return this.applicationUserMenu.findAll({

            where : { id : menuids},
            include : [
                {
                    model : ApplicationUserSubMenuModel,
                    where : { id : submenuids},
                    required : false

                }
            ],
            order :[['id','ASC']]
        })
    }

    async deleteApplicationUserMenuMapTemp(user_id,is_admin_user) {

        return this.applicationUserMenuMapTemp.destroy({where : { user_id, is_admin_user }})
    }

    async createApplicationUserMenuMapTemp(sub_menu_ids, user_id,is_admin_user,created_by,menu_ids = []) {
 
        const createData = sub_menu_ids.map(item => {

            return {
                user_id ,
                is_admin_user,
                submenu_id : item,
                created_by
            }
        })
        const createMenuData = menu_ids.map(item => {
            return {
                user_id ,
                is_admin_user,
                submenu_id : 0,
                created_by,
                menu_id : item
            }
        })

        await this.deleteApplicationUserMenuMapTemp(user_id,is_admin_user)

        return this.applicationUserMenuMapTemp.bulkCreate([...createData,...createMenuData])
    }

    async deleteApplicationUserMenuMap(user_id,is_admin_user) {

        return this.applicationUserMenuMap.destroy({where : { user_id, is_admin_user }})
    }

    async createApplicationUserMenuMap(sub_menu_ids, user_id,is_admin_user,created_by,menu_ids = []) {
 
        const createData = sub_menu_ids.map(item => {

            return {
                user_id ,
                is_admin_user,
                submenu_id : item,
                created_by
            }
        })

        const createMenuData = menu_ids.map(item => {

            return {
                user_id ,
                is_admin_user,
                submenu_id : 0,
                menu_id : item,
                created_by
            }
        })

        await this.deleteApplicationUserMenuMap(user_id,is_admin_user)

        return this.applicationUserMenuMap.bulkCreate([...createData,...createMenuData])
    }

    async getApplicationUserTempData(username) {

        return await this.applicationUserTempRepo.findOne({where : { username }})
    }
    async getApplicationUserData(username) {
        
        return await this.applicationUserRepo.findOne({where : { username }})
    }

    async createApplicationUser(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_user = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        let {username : u_username, password, emailid,  mobileno, userstatus, fullname, title, sub_menu_ids = [],menu_ids = [], roleid: role_id} = reqbody

        u_username = u_username.toLowerCase()

        const tempData = await this.getApplicationUserTempData(u_username)

        if(tempData) {

            throw new BadRequestException('This user already have in pending list')
        }

        const mainData = await this.getApplicationUserData(u_username)

        if(mainData) {

            throw new BadRequestException('This user already exist')
        }

       // password = generateRandomString()
        const hashpass = await this.authService.hashPassword(password)

        const createData = {
            username : u_username,
            password : hashpass,
            roleid: role_id,
            emailid,
            storeid : 1616500667837,
            mobileno,
            userstatus,
            fullname,
            title,
            created_by : created_by_name,
            action : 'INSERT',
            p_password : password
        }

        this.applicationUserHistoryRepo.create(createData)

        const createdinfo = await this.applicationUserTempRepo.create(createData)

        //this.createApplicationUserMenuMapTemp(sub_menu_ids,createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)

       return createdinfo['dataValues']

    }

    async editApplicationUser(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_user = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        let {username : u_username, password=null, emailid,  mobileno, userstatus, fullname, title, sub_menu_ids = [], menu_ids = [], roleid: role_id} = reqbody

        u_username = u_username.toLowerCase()

        const tempData = await this.getApplicationUserTempData(u_username)

        if(tempData) {

            throw new BadRequestException('This user already have in pending list')
        }

        const mainData = await this.getApplicationUserData(u_username)

        if(!mainData) {

            throw new BadRequestException(`This user doesn't exist`)
        }
        if (password) {
            const historyMatch = await this.adminuserPasswordHistoryCheck(u_username, password)
            if (historyMatch) {
                throw new BadRequestException('System allow same password to be used again after at least 4 times')
            }
            password = await this.authService.hashPassword(password)
        }
        else {
            password = mainData.password || " "
        }
        
        const updateData = {
            username : u_username,
            roleid : role_id,
            emailid,
            storeid : 1616500667837,
            mobileno,
            userstatus,
            fullname,
            title,
            created_by: created_by_name,
            action : 'UPDATE',
            password
        }

        this.applicationUserHistoryRepo.create(updateData)

        const createdinfo = await this.applicationUserTempRepo.create(updateData)

        //this.createApplicationUserMenuMapTemp(sub_menu_ids,createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)

       return createdinfo['dataValues']

    }

    async deleteApplicationUser(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0,sub_menu_ids = []} = userinfo, is_admin_user = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        let {username : u_username} = reqbody

        u_username = u_username.toLowerCase()

        const tempData = await this.getApplicationUserTempData(u_username)

        if(tempData) {

            throw new BadRequestException('This user already have in pending list')
        }

        const mainData = await this.getApplicationUserData(u_username)

        if(!mainData) {

            throw new BadRequestException(`This user doesn't exist`)
        }

        const updateData = {
            username : u_username,
            roleid : mainData['dataValues'].roleid,
            emailid : mainData['dataValues'].emailid,
            storeid : 1616500667837,
            mobileno : mainData['dataValues'].mobileno,
            userstatus : mainData['dataValues'].userstatus,
            fullname : mainData['dataValues'].fullname,
            title : 1,
            created_by: created_by_name,
            action : 'DELETE',
            first_name : mainData['dataValues'].first_name,
            password : mainData.password || " "
        }

        this.applicationUserHistoryRepo.create(updateData)

        const createdinfo = await this.applicationUserTempRepo.create(updateData)

        //this.createApplicationUserMenuMapTemp(sub_menu_ids,createdinfo['dataValues']['id'],is_admin_user,created_by)

       return true

    }

    async applicationUserList(userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        if(created_user_type == 2) {

            return { List : [], MyPendingList : [], PendingList : []}
        }

        else if(created_user_type == 1) {

            //for admin/ admin user..
            const List = await this.applicationUserRepo.findAll({ 
                include : [
                {
                    model : ADminUserRoleModel
                }] 
            })

            const MyPendingList = await this.applicationUserTempRepo.findAll({ 
                where : { created_by: created_by_name},
                include : [
                    {
                        model : ADminUserRoleModel
                    }]
            })
    
            const PendingList = await this.applicationUserTempRepo.findAll({  
                where : { created_by : {[Op.ne]: created_by_name} },
                include : [
                    {
                        model : ADminUserRoleModel
                    }] 
            })
    
            return { List, MyPendingList, PendingList}
        }
        else {

            //for unknown...
            return { List : [], MyPendingList : [], PendingList : []}
        }
    }

    async pendingUserActionAction(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_user = true, action = 'REJECTED',menu_ids= [],sub_menu_ids = []

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = id, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        //action_id = 1=> approve, action_id = 2=> reject, action_id = 3 => delete
        const {action_id = 2, username : u_username} = reqbody

        action = (action_id == 1) ? 'APPROVED' : (action_id == 2) ? 'REJECTED' : 'DELETE'

        const tempInfo = await this.getApplicationUserTempData(u_username)

        if(!tempInfo) {

            throw new NotFoundException(`This user does not exist `)
        }
        if(tempInfo['dataValues']['created_by'] == created_by_name  && (action_id == 1 || action_id == 2)) {

            throw new BadRequestException('You cannot Approve/Reject it')
        }

        // const tempSubmenuInfo = await this.applicationUserMenuMapTemp.findAll({ where : { user_id : tempInfo['dataValues']['id'] ,is_admin_user }})

        // tempSubmenuInfo.map(item => {
            
        //     if(item['dataValues']['submenu_id']){ sub_menu_ids.push(item['dataValues']['submenu_id'])}
        //     if(item['dataValues']['menu_id']){ menu_ids.push(item['dataValues']['menu_id'])}
        
        // })

        const {password,roleid:u_roleid,emailid,storeid,mobileno,userstatus,fullname,action:old_action,title,created_by:old_created_by,p_password=null} = tempInfo['dataValues']

        if(old_action == 'INSERT') {

            const createData = {
                username : u_username,
                password ,
                roleid : u_roleid,
                emailid,
                storeid ,
                mobileno,
                userstatus,
                fullname,
                title,
                created_by : old_created_by,
                action : `${action}-${old_action}`,
                approve_by: created_by_name
            }
            if(action_id == 1) {

                const createdinfo = await this.applicationUserRepo.create(createData)
        
               // await this.createApplicationUserMenuMap(sub_menu_ids, createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)
                //distroy...
                this.applicationUserTempRepo.destroy({ where : { username : u_username }})
                //this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)

                this.passwordNotification(p_password)

                this.passwordHistoryLog (u_username, password, 'New Create')


            }
            else {
                //this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)
               this.applicationUserTempRepo.destroy({ where : { username : u_username }})
            }

            this.applicationUserHistoryRepo.create(createData)
    
        }
        else if(old_action == 'UPDATE') {

            const createData = {
                username : u_username,
                roleid : u_roleid,
                emailid,
                storeid ,
                mobileno,
                email : emailid,
                msisdn : mobileno,
                address :" ",
                userstatus,
                status : userstatus,
                fullname,
                first_name : fullname,
                title,
                created_by : old_created_by,
                action : `${action}-${old_action}`,
                approve_by: created_by_name,
                password
                 
            }
            if(action_id == 1) {

                this.applicationUserHistoryRepo.create({...createData})

                const oldData = await this.applicationUserRepo.findOne({ where : { username : u_username  }})
    
                const [affectedCount, affectedRows] = await this.applicationUserRepo.update(createData, { where : { username : u_username },returning: true  })
        
                //distroy...
                await this.applicationUserTempRepo.destroy({ where : { username : u_username }})
                //await  this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)

                if (oldData.password != password) {

                    this.passwordHistoryLog (u_username, password, 'Update')
                }

            }
            else {

                this.applicationUserHistoryRepo.create({...createData})
               // this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)
               await this.applicationUserTempRepo.destroy({ where : { username : u_username }})
            }
    
        }
        else if(old_action == 'DELETE') {

            const createData = {
                username : u_username,
                roleid : u_roleid,
                emailid,
                storeid ,
                mobileno,
                userstatus,
                fullname,
                first_name : fullname,
                title,
                created_by : old_created_by,
                action : `${action}-${old_action}`,
                approve_by: created_by_name,
                password
            }
            if(action_id == 1) {

                this.applicationUserHistoryRepo.create(createData)
    
                const createdinfo = await this.applicationUserRepo.findOne({ where : { username : u_username }})

                if(createdinfo) {

                    await this.applicationUserRepo.destroy({ where : { id : createdinfo['dataValues']['id'] }})
                   // await this.deleteApplicationUserMenuMap(createdinfo['dataValues']['id'],is_admin_user)
                }

                //distroy...
                this.applicationUserTempRepo.destroy({ where : { username : u_username }})
                //this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)

            }
            else {

                this.applicationUserHistoryRepo.create(createData)
               // this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)
               this.applicationUserTempRepo.destroy({ where : { username : u_username }})
            }
    
        }

        return true
    }

    async userAssignMenuSubmenuList(reqbody){

        let {username} = reqbody, submenuids = [], menuids= []

        const userinfo = await this.applicationUserRepo.findOne({ where : { username }})
        const submenuinfo = await this.applicationUserMenuMap.findAll({where : {user_id : userinfo['dataValues'].id,is_admin_user : true}})

        if(submenuinfo.length) {

            submenuinfo.map(item => {

                submenuids.push(item['dataValues'].submenu_id)
                if(item['dataValues'].menu_id) {
                    menuids.push(item['dataValues'].menu_id)
                }
            })
        }

        const data1 = await this.applicationUserMenu.findAll({
            include : [
                {
                    model : ApplicationUserSubMenuModel,
                    where : { id : submenuids},
                    required : true
                }
            ]
        })

        data1.map(item => menuids.push(item['dataValues'].id))

        return await this.applicationUserMenu.findAll({
            where : { id : menuids},
            include : [
                {
                    model : ApplicationUserSubMenuModel,
                    where : { id : submenuids},
                    required : false
                }
              ]
            })
    }

    
    async assignMenuSubmenuList(userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        //for admin users
        if(created_user_type == 1) {

            const adminuser = await this.applicationUserRepo.findOne({ where : { username }})

            const menusubmenuinfo = (adminuser['dataValues']['user_type'] == 200) ? await this.getApplicationUserMenuSubMenu(userinfo) : await this.getAssignedApplicationUserMenuSubMenuMap(userinfo)

            return menusubmenuinfo

        }
        else {

            return []
        }

    }

    async pendingUserAssignMenuSubmenuList(reqbody){

        let {username} = reqbody, submenuids = [], menuids= []

        const userinfo = await this.applicationUserTempRepo.findOne({ where : { username }})
        const submenuinfo = await this.applicationUserMenuMapTemp.findAll({where : {user_id : userinfo['dataValues'].id,is_admin_user : true}})

        if(submenuinfo.length) {

            submenuinfo.map(item => {

                submenuids.push(item['dataValues'].submenu_id)
                if(item['dataValues'].menu_id) {
                    menuids.push(item['dataValues'].menu_id)
                }
            })
        }

        //const data1 = await this.applicationUserMenu.findAll({ where : { id : menuids}  })

        const data1 = await this.applicationUserMenu.findAll({
                        include : [
                            {
                                model : ApplicationUserSubMenuModel,
                                where : { id : submenuids},
                                required : true
                            }
                        ]
                    })

       data1.map(item => menuids.push(item['dataValues'].id))

       return await this.applicationUserMenu.findAll({
            where : { id : menuids},
            include : [
                {
                    model : ApplicationUserSubMenuModel,
                    where : { id : submenuids},
                    required : false
                }
            ]
        })
    }
}
