import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { APPLICATION_USER_MENU_MAP_REPOSITORY, APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY, APPLICATION_USER_MENU_REPOSITORY, ADMIN_USER_ROLE_HISTORY,
    APPLICATION_USER_SUBMENU_REPOSITORY, APPLICATION_USER_REPOSITORY, APPLICATION_USER_TEMP_REPOSITORY, APPLICATION_USER_HISTORY_REPOSITORY, ADMIN_USER_ROLE, ADMIN_USER_ROLE_TEMP} from '../../config/constants'
import {ApplicationUserMenuMapModel, ApplicationUserMenuMapTempModel, ApplicationUserMenuModel, ApplicationUserSubMenuModel,
      ApplicationUserModel, ApplicationUserTempModel, ApplicationUserHistoryModel, ADminUserRoleModel, ADminUserRoleTempModel, ADminUserRoleHistoryModel} from '../../models'

import { Op, where } from 'sequelize'


@Injectable()
export class RoleManagementService {
    constructor(
        @Inject(APPLICATION_USER_MENU_REPOSITORY) private readonly applicationUserMenu: typeof ApplicationUserMenuModel,

        @Inject(APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY) private readonly applicationUserMenuMapTemp: typeof ApplicationUserMenuMapTempModel,
        @Inject(APPLICATION_USER_MENU_MAP_REPOSITORY) private readonly applicationUserMenuMap: typeof ApplicationUserMenuMapModel,

        @Inject(ADMIN_USER_ROLE) private readonly adminRole: typeof ADminUserRoleModel,
        @Inject(ADMIN_USER_ROLE_TEMP) private readonly adminRoleTemp: typeof ADminUserRoleTempModel,
        @Inject(ADMIN_USER_ROLE_HISTORY) private readonly adminRoleHistory: typeof ADminUserRoleHistoryModel,

    ){}

    async getApplicationUserMenuSubMenu(userinfo) {
 
        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_menu = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_menu = created_user_type === 1 ? true : false

        return this.applicationUserMenu.findAll({

            include : [
                {
                    model : ApplicationUserSubMenuModel
                }
            ],
            where : { is_admin_menu },
            order :[['id','ASC']]
        })
    }

    async getAssignedApplicationUserMenuSubMenuMap(userinfo, role_id) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_menu = true, submenuids = [], menuids = []

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_menu = created_user_type === 1 ? true : false

        const submenuinfo = await this.applicationUserMenuMap.findAll({where : {user_id : role_id,is_admin_user : is_admin_menu}})

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

    async getAssignedApplicationUserMenuSubMenuTempMap(userinfo, role_id) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_menu = true, submenuids = [], menuids = []

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_menu = created_user_type === 1 ? true : false

        const submenuinfo = await this.applicationUserMenuMapTemp.findAll({where : {user_id : role_id,is_admin_user : is_admin_menu}})

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

    async getAdminRoleTempDataByMainId (role_id) {
        return await this.adminRoleTemp.findOne({where : { ref_id: role_id }})
    }

    async getAdminRoleTempData(role_name) {

        return await this.adminRoleTemp.findOne({where : { role_name }})
    }
    async getAdminRoleData(role_name) {
        
        return await this.adminRole.findOne({where : { role_name }})
    }

    async getAdminRoleDataById(role_id) {
        
        return await this.adminRole.findOne({where : { id: role_id }})
    }


    async createRoleUser(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_user = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        let {role_name, sub_menu_ids = [],menu_ids = []} = reqbody

        const checkRoleName = await this.getAdminRoleData(role_name)
        if (checkRoleName) {
            throw new BadRequestException(`This role name already exist, use different name`)
        }

        const checkRoleTempName = await this.getAdminRoleTempData(role_name)
        if (checkRoleTempName) {
            throw new BadRequestException(`This role name already exist in pending list, use different name`)
        }

        const createData = {
            role_name: role_name,
            action: 'INSERT',
            created_by: created_by_name
        }

        const createdinfo = await this.adminRoleTemp.create(createData)

        this.createApplicationUserMenuMapTemp(sub_menu_ids,createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)

        this.adminRoleHistory.create({...createData, temp_id: createdinfo['dataValues']['id']})

       return createdinfo['dataValues']

    }

    async editRoleUser(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_user = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        let {role_id, role_name, sub_menu_ids = [], menu_ids = []} = reqbody

        const tempData = await this.getAdminRoleTempDataByMainId(role_id)

        if(tempData) {

            throw new BadRequestException('This role is already in pending list')
        }

        const mainData = await this.getAdminRoleDataById(role_id)

        if(!mainData) {

            throw new BadRequestException(`This role doesn't exist`)
        }

        if (role_name != mainData.role_name) {
            const checkRoleName = await this.getAdminRoleData(role_name)
            if (checkRoleName) {
                throw new BadRequestException(`This role name already exist, use different name`)
            }
        }

        const updateData = {
            role_name : role_name,
            action: 'UPDATE',
            created_by: created_by_name,
            ref_id : role_id
            
        }

        const createdinfo = await this.adminRoleTemp.create(updateData)

        this.createApplicationUserMenuMapTemp(sub_menu_ids,createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)

        this.adminRoleHistory.create({...updateData, temp_id: createdinfo['dataValues']['id']})

       return createdinfo['dataValues']

    }

    async deleteAdminRole(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0 } = userinfo, is_admin_user = true

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        let {role_id } = reqbody


        const tempData = await this.getAdminRoleTempDataByMainId(role_id)

        if(tempData) {

            throw new BadRequestException('This role is in pending list')
        }

        const mainData = await this.getAdminRoleDataById(role_id)

        if(!mainData) {

            throw new BadRequestException(`This role doesn't exist`)
        }

        const rolemenudata = await this.getAssignedApplicationUserMenuSubMenuMap(userinfo, role_id)
        const menu_ids = [], submenuids = []
        rolemenudata.map(item => {
            menu_ids.push(item.id)
            if (item.submenu && item.submenu.length) {
                item.submenu.map(item2 => submenuids.push(item2.id)) 
            }
        })
        const updateData = {
            role_name : mainData.role_name,
            action: 'DELETE',
            created_by: created_by_name,
            ref_id : role_id
        }

        const createdinfo = await this.adminRoleTemp.create(updateData)

        this.createApplicationUserMenuMapTemp(submenuids,createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)

        this.adminRoleHistory.create({...updateData, temp_id: createdinfo['dataValues']['id']})

       return true

    }

    async roleTempDetails (reqbody,userinfo) {

        const roledata = await this.adminRoleTemp.findOne({ where : { id : reqbody.role_id}})
        const rolemenudata = await this.getAssignedApplicationUserMenuSubMenuTempMap(userinfo, reqbody.role_id)

        if (roledata) {
            return { ...roledata['dataValues'], rolemenudata}
        }

        return null
        
    }

    async roleDetails (reqbody,userinfo) {

        const roledata = await this.adminRole.findOne({ where : { id : reqbody.role_id}})
        const rolemenudata = await this.getAssignedApplicationUserMenuSubMenuMap(userinfo, reqbody.role_id)

        if (roledata) {
            return { ...roledata['dataValues'], rolemenudata}
        }

        return null
    }
    async adminRoleList(userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        if(created_user_type == 2) {

            return { List : [], MyPendingList : [], PendingList : []}
        }

        else if(created_user_type == 1) {

            //for admin/ admin user..
            const [List, PendingList, MyPendingList] = await Promise.all([
                this.adminRole.findAll({
                    include : [{
                        model : ApplicationUserModel
                    }]
                    
                }),
                this.adminRoleTemp.findAll({  
                    where : { created_by : {[Op.ne]: created_by_name} },
                    include : [{
                        model : ApplicationUserModel
                    }] 
                }),
                this.adminRoleTemp.findAll({ 
                    where : { created_by: created_by_name},
                    include : [{
                        model : ApplicationUserModel
                    }] 
                })
            ])
    
            return { List, MyPendingList, PendingList}
        }
        else {

            //for unknown...
            return { List : [], MyPendingList : [], PendingList : []}
        }
    }

    async adminRoleListForAssign(userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = `${id}`, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        if(created_user_type == 2) {

            return []
        }

        else if(created_user_type == 1) {

            //for admin/ admin user..
            return await this.adminRole.findAll({
                logging: console.log,
                include : [
                    {
                        model : ADminUserRoleTempModel,
                        required: false
                    }
                ],
                where: { '$temp_info.id$' : null}
            })
        }
        else {

            //for unknown...
            return []
        }

    }

    async pendingAdminRoleAction(reqbody,userinfo) {

        let {id, username = null, roleid = 0, mobile=null, idx = 0} = userinfo, is_admin_user = true, action = 'REJECTED',menu_ids= [],sub_menu_ids = []

        const created_user_type = (username && roleid) ? 1 : 2
        const created_by = id, created_by_name = username ? username : mobile

        idx = (created_user_type == 2 && idx ) ? idx : -1

        is_admin_user= created_user_type === 1 ? true : false

        //action_id = 1=> approve, action_id = 2=> reject, action_id = 3 => delete
        const {action_id = 2, temp_id} = reqbody

        action = (action_id == 1) ? 'APPROVED' : (action_id == 2) ? 'REJECTED' : 'DELETE'

        const tempInfo = await this.adminRoleTemp.findOne({ where : { id: temp_id}})

        if(!tempInfo) {

            throw new NotFoundException(`This role does not exist `)
        }
        // if(tempInfo['dataValues']['created_by'] == created_by_name  && (action_id == 1 || action_id == 2)) {

        //     throw new BadRequestException('You cannot Approve/Reject it')
        // }

        const tempSubmenuInfo = await this.applicationUserMenuMapTemp.findAll({ where : { user_id : tempInfo['dataValues']['id'] ,is_admin_user }})

        tempSubmenuInfo.map(item => {
            
            if(item['dataValues']['submenu_id']){ sub_menu_ids.push(item['dataValues']['submenu_id'])}
            if(item['dataValues']['menu_id']){ menu_ids.push(item['dataValues']['menu_id'])}
        
        })

        const {action:old_action,created_by:old_created_by, role_name, ref_id} = tempInfo['dataValues']

        const createData = {
            role_name : role_name,
            action: `${action}-${old_action}`,
            created_by : old_created_by,
            ref_id      
        }

        if(old_action == 'INSERT') {

            if(action_id == 1) {
    
                const createdinfo = await this.adminRole.create(createData)
        
                await this.createApplicationUserMenuMap(sub_menu_ids, createdinfo['dataValues']['id'],is_admin_user,created_by,menu_ids)

                //don't delete , keep for history activity details...
               // this.deleteApplicationUserMenuMapTemp(tempInfo['dataValues']['id'],is_admin_user)

            }

        }
        else if(old_action == 'UPDATE') {

            if(action_id == 1) {
    
                   await this.adminRole.update(createData, { where : { id : ref_id },returning: true  })

                    await this.deleteApplicationUserMenuMap(ref_id,is_admin_user)

                    this.createApplicationUserMenuMap(sub_menu_ids, ref_id,is_admin_user,created_by,menu_ids)

           }

        }

        else if(old_action == 'DELETE') {

            if(action_id == 1) {

                await this.adminRole.destroy({ where : { id : ref_id}})
                await this.deleteApplicationUserMenuMap(ref_id,is_admin_user)

            }
    
        }

        this.adminRoleTemp.destroy({ where : { id : temp_id }})

        this.adminRoleHistory.create({...createData, temp_id})

        return true
    }
}
