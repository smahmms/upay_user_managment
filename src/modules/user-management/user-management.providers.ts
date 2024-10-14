
import { APPLICATION_USER_MENU_MAP_REPOSITORY, APPLICATION_USER_MENU_MAP_TEMP_REPOSITORY, APPLICATION_USER_MENU_REPOSITORY, ADMINUSER_PASSWORDHISTORY_REPO,
    APPLICATION_USER_SUBMENU_REPOSITORY, APPLICATION_USER_REPOSITORY, APPLICATION_USER_TEMP_REPOSITORY, APPLICATION_USER_HISTORY_REPOSITORY} from '../../config/constants'
import {ApplicationUserMenuMapModel, ApplicationUserMenuMapTempModel, ApplicationUserMenuModel, ApplicationUserSubMenuModel,
      ApplicationUserModel, ApplicationUserTempModel, ApplicationUserHistoryModel, ADminUserPasswordHistoryModel} from '../../models'

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
    provide: ADMINUSER_PASSWORDHISTORY_REPO,
    useValue: ADminUserPasswordHistoryModel
}]