
import {RILAC_MODULE_REPO, MODULE_APPROVAL_ROLE_MAP_REPO, MODULE_APPROVAL_ROLE_MAP_TEMP_REPO, ADMIN_USER_ROLE, MODULE_APPROVAL_ROLE_MAP_HISTORY_REPO} from '../../config/constants'
import {RilacModulesModel, ModuleApprovalRoleMapModel, ModuleApprovalRoleMapTempModel, ADminUserRoleModel, ModuleApprovalRoleMapHistoryModel} from '../../models'

export const RoleModuleMapProviders = [{
  provide: RILAC_MODULE_REPO,
  useValue: RilacModulesModel
},
{
  provide: MODULE_APPROVAL_ROLE_MAP_REPO,
  useValue: ModuleApprovalRoleMapModel
},{
  provide: MODULE_APPROVAL_ROLE_MAP_TEMP_REPO,
  useValue: ModuleApprovalRoleMapTempModel
},{
  provide: ADMIN_USER_ROLE,
  useValue: ADminUserRoleModel
},{
  provide: MODULE_APPROVAL_ROLE_MAP_HISTORY_REPO,
  useValue: ModuleApprovalRoleMapHistoryModel
}]