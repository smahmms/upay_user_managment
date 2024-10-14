
import { APPLICATION_USER_MENU_MAP_REPOSITORY, APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY, APPLICATION_USER_MENU_REPOSITORY, ADMIN_USER_ROLE_HISTORY,
    APPLICATION_USER_SUBMENU_REPOSITORY, APPLICATION_USER_REPOSITORY, APPLICATION_USER_TEMP_REPOSITORY, APPLICATION_USER_HISTORY_REPOSITORY, ADMIN_USER_ROLE, ADMIN_USER_ROLE_TEMP} from '../../config/constants'
import {ApplicationUserMenuMapModel, ApplicationUserMenuMapTempModel, ApplicationUserMenuModel, ApplicationUserSubMenuModel,
      ApplicationUserModel, ApplicationUserTempModel, ApplicationUserHistoryModel, ADminUserRoleModel, ADminUserRoleTempModel, ADminUserRoleHistoryModel} from '../../models'

export const UserManagementProviders = [{
    provide: APPLICATION_USER_MENU_REPOSITORY,
    useValue: ApplicationUserMenuModel
},
{
    provide: APPLICATION_USER_SUBMENU_REPOSITORY,
    useValue: ApplicationUserSubMenuModel
},
{
    provide: APPLICATION_USER_MENU_MAP_REPOSITORY,
    useValue: ApplicationUserMenuMapModel
},
{
    provide: APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY,
    useValue: ApplicationUserMenuMapTempModel
},
{
    provide: APPLICATION_USER_REPOSITORY,
    useValue: ApplicationUserModel
},
{
    provide: APPLICATION_USER_TEMP_REPOSITORY,
    useValue: ApplicationUserTempModel
},
{
    provide: APPLICATION_USER_HISTORY_REPOSITORY,
    useValue: ApplicationUserHistoryModel
    },
    {
        provide: ADMIN_USER_ROLE,
        useValue: ADminUserRoleModel
    },
    {
        provide: ADMIN_USER_ROLE_TEMP,
        useValue: ADminUserRoleTempModel
    },
    {
        provide: ADMIN_USER_ROLE_HISTORY,
        useValue: ADminUserRoleHistoryModel
    }
]