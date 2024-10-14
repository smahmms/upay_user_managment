import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ADminUserRoleModel, ModuleApprovalRoleMapModel, ModuleApprovalRoleMapTempModel, RilacModulesModel, ModuleApprovalRoleMapHistoryModel } from '../../models';
import { DATABASE_CONNECTION, ADMIN_USER_ROLE, MODULE_APPROVAL_ROLE_MAP_REPO, MODULE_APPROVAL_ROLE_MAP_TEMP_REPO, RILAC_MODULE_REPO, MODULE_APPROVAL_ROLE_MAP_HISTORY_REPO } from '../../config/constants';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class RoleModuleMappingService {
  constructor(
    @Inject(MODULE_APPROVAL_ROLE_MAP_REPO) private readonly moduleApprovalRoleMapRepo: typeof ModuleApprovalRoleMapModel,
    @Inject(MODULE_APPROVAL_ROLE_MAP_TEMP_REPO) private readonly moduleApprovalRoleMapTempRepo: typeof ModuleApprovalRoleMapTempModel,
    @Inject(RILAC_MODULE_REPO) private readonly rilacModulesRepo: typeof RilacModulesModel,
    @Inject(ADMIN_USER_ROLE) private readonly adminUserRoleModelRepo: typeof ADminUserRoleModel,
    @Inject(MODULE_APPROVAL_ROLE_MAP_HISTORY_REPO) private readonly moduleApprovalRoleMapHistoryRepo: typeof ModuleApprovalRoleMapHistoryModel,
    @Inject(DATABASE_CONNECTION) private DB: Sequelize,
  ){}


  async getAllList(){
    // return await this.moduleApprovalRoleMapRepo.findAll({group:['ModuleApprovalRoleMapModel.module_id'],include:[{model:RilacModulesModel},{model:ADminUserRoleModel}],logging:console.log})
    // return await this.moduleApprovalRoleMapRepo.findAll({attributes:['module_id',[sequelize.fn('COUNT', 'role_id'), 'count']],group:[sequelize.col('ModuleApprovalRoleMapModel.module_id'),sequelize.col('ModuleApprovalRoleMapModel.id'),sequelize.col('module.module_id'),sequelize.col('roles.id')],include:[{model:RilacModulesModel},{model:ADminUserRoleModel,}],logging:console.log})
    // return await this.moduleApprovalRoleMapRepo.findAll({attributes:['id','module_id','role_id'],group:'module_id',include:[{model:ADminUserRoleModel}],logging:console.log})
    // return await this.moduleApprovalRoleMapRepo.findAll({include:[{model:RilacModulesModel},{model:ADminUserRoleModel}],logging:console.log})
    // return await this.moduleApprovalRoleMapRepo.findAll({attributes:[[sequelize.fn('COUNT','ModuleApprovalRoleMapModel.id'), 'count_id']],group:['ModuleApprovalRoleMapModel.module_id'],include:[{model:RilacModulesModel},{model:ADminUserRoleModel}]})
    const result = await this.moduleApprovalRoleMapRepo.findAll({include:[{model:RilacModulesModel},{model:ADminUserRoleModel}]})
    const result_list = []
    let result_entry = {}

    for(const item of result){

      if (item.role_id == 12 && item.role == null){
        const roles = {
          role_name : "Admin"
        } 

        result_entry ={
          id:item.id,
          module_id: item.module_id,
          role_id: item.role_id,
          module : item.module,
          roles: roles
        }

      }
      else {
        result_entry = result_entry ={
          id:item.id,
          module_id: item.module_id,
          role_id: item.role_id,
          module : item.module,
          roles: item.role
        }
      }

      result_list.push(result_entry)
    }

    return result_list


  }

  async getRoleMap(module_id){
    return await this.moduleApprovalRoleMapRepo.findAll({where:{module_id},include:[{model:RilacModulesModel},{model:ADminUserRoleModel}]})
  }

  async getAllPendingMap(){
    const result = await this.moduleApprovalRoleMapTempRepo.findAll({include:[{model:RilacModulesModel},{model:ADminUserRoleModel}]})

    const result_list = []
    let result_entry = {}

    for(const item of result){

      if (item.role_id == 12 && item.role == null){
        const roles = {
          role_name : "Admin"
        } 

        result_entry ={
          id:item.id,
          created_by: item.created_by,
          created_at: item.created_at,
          action: item.action,
          module_id: item.module_id,
          role_id: item.role_id,
          module : item.module,
          roles: roles
        }

      }
      else {
        result_entry = result_entry ={
          id:item.id,
          created_by: item.created_by,
          created_at: item.created_at,
          action: item.action,
          module_id: item.module_id,
          role_id: item.role_id,
          module : item.module,
          roles: item.role
        }
      }

      result_list.push(result_entry)
    }

    return result_list
  }

  async getPendingMap(module_id){
    return await this.moduleApprovalRoleMapTempRepo.findAll({where:{module_id},include:[{model:RilacModulesModel},{model:ADminUserRoleModel}]})
  }

  async getRilacModuleList() {

    const response = await this.DB.query(`select module_id as id, module_name as name from rilac_modules order by module_id ASC`)
    return response[0]
  }

  async updateRoleMap(data,user){
    
    const module_id = data.module_id
    const role_id = data.role_id
    const entry_data = []
    let entry_data_object 
    let exist_role_ids  = []

    //const check_exist = await this.moduleApprovalRoleMapRepo.findAll({where:{module_id: module_id}, raw:true})
    const check_exist_temp = await this.moduleApprovalRoleMapTempRepo.findAll({where:{module_id: module_id}})

    // return check_exist
    // if(check_exist.length > 1){
    //    exist_role_ids = check_exist.map( item => {
    //     return item.role_id
    //   })
    // }


    if(check_exist_temp.length  > 1 ){
      throw new BadRequestException("Module already has a pending request")
    }



    // // for insert
    // for(const item of role_id){
    //   if(exist_role_ids.includes(item) === false){
    //     entry_data_object = {
    //       module_id : module_id,
    //       role_id: item,
    //       created_by: user,
    //       action: "INSERT",
    //       status: 0
    //     }

    //     entry_data.push(entry_data_object)
    //   }
    // }

        // for insert
      if(role_id.length) {
        for(const item of role_id){
          entry_data_object = {
            module_id : module_id,
            role_id: item,
            created_by: user,
            action: "INSERT",
            status: 0
          }
          entry_data.push(entry_data_object)
        }
      } else {

        entry_data_object = {
          module_id : module_id,
          role_id: 0,
          created_by: user,
          action: "INSERT",
          status: 0
        }
        entry_data.push(entry_data_object)
      }

    // // for delete
    // for(const item of exist_role_ids){
    //   if(role_id.includes(item) === false){
    //     entry_data_object = {
    //       module_id : module_id,
    //       role_id: item,
    //       created_by: user,
    //       action: "DELETE",
    //       status: 0
    //     }

    //     entry_data.push(entry_data_object)

    //   }
    // }


    const result = await this.moduleApprovalRoleMapTempRepo.bulkCreate(entry_data)
    this.moduleApprovalRoleMapHistoryRepo.bulkCreate(entry_data)

    return result

  } 

  async roleMapAction(data,user){

    const module_id = data.module_id
    const action = data.action

    const check_exist = await this.moduleApprovalRoleMapTempRepo.findAll({where:{module_id : module_id}})

    if(check_exist.length < 1){
      throw new BadRequestException('Entry not found')
    }

    let item_data  = [], historyData = []

    if(action == 'approve'){

      // for(let item of check_exist){

      //   console.log(item['dataValues']);
        

      //   if(item['dataValues']['action'] == 'INSERT'){
      //     item_data = item['dataValues']
      //     await this.moduleApprovalRoleMapRepo.create(item_data)
      //     await this.moduleApprovalRoleMapTempRepo.destroy({where:{id:item_data.id}})
      //   }

      //   if(item['dataValues']['action'] == 'DELETE'){
      //     item_data = item['dataValues']
      //     await this.moduleApprovalRoleMapRepo.destroy({where:{module_id: item.module_id, role_id: item_data.role_id}})
      //     await this.moduleApprovalRoleMapTempRepo.destroy({where:{id:item_data.id}})
      //   }
      // }

      await this.moduleApprovalRoleMapRepo.destroy({where:{module_id }})

      for(let item of check_exist){

        item_data.push({
          module_id,
          role_id: item['dataValues']['role_id']
        })

        delete item['dataValues']['id']
        historyData.push({...item['dataValues'], action: 'UPDATE-APPROVE', created_by: user})

      }

      await this.moduleApprovalRoleMapRepo.bulkCreate(item_data)
      await this.moduleApprovalRoleMapTempRepo.destroy({where:{module_id}})
      this.moduleApprovalRoleMapHistoryRepo.bulkCreate(historyData)

      return('module map updated')
    }

    if(action == 'reject'){

      for(let item of check_exist){

        delete item['dataValues']['id']
        historyData.push({...item['dataValues'], action: 'UPDATE-REJECT', created_by: user})

      }

      await this.moduleApprovalRoleMapTempRepo.destroy({where:{module_id}})
      this.moduleApprovalRoleMapHistoryRepo.bulkCreate(historyData)
    }


    return('module map updated')


  }
}

