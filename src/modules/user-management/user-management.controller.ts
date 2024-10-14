import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { UserManagementService} from './user-management.service'
import {JwtAuthGuard} from '../../middleware/guards'
import {UserCreateDto,UserApproveDto,UpdateUserCreateDto, DeleteUserCreateDto} from '../../dto'


@Controller('user-management')
@UseGuards(JwtAuthGuard)
export class UserManagementController {

    constructor(private ApplicationUserService: UserManagementService) { }

    @Get('/merchant_plan_functions_menu')
    getMerchantPlanFunctionMenuList(@Request() req) {
        return this.ApplicationUserService.getMerchantPlanFunctionMenuList()
    }

    @Get('/merchant/assignFunctionmenu')
    getMerchantAssignFunctionMenu(@Request() req ) {
        return this.ApplicationUserService.getAssignFunctionMenu(req.user)
    }

    @Get('/menusubmenu_list')
    getApplicationUserMenuSubMenuList(@Request() req) {
        return this.ApplicationUserService.getApplicationUserMenuSubMenu(req.user)
    }

    @Post('/admin/create_user')
    createApplicationUser(@Request() req,@Body() reqbody : UserCreateDto) {
        return this.ApplicationUserService.createApplicationUser(reqbody,req.user)
    }

    @Post('/admin/edit')
    editApplicationUser(@Request() req,@Body() reqbody : UpdateUserCreateDto) {
        return this.ApplicationUserService.editApplicationUser(reqbody,req.user)
    }

    @Post('/admin/delete')
    deleteApplicationUser(@Request() req,@Body() reqbody : DeleteUserCreateDto) {
        return this.ApplicationUserService.deleteApplicationUser(reqbody,req.user)
    }

    @Get('/admin/list')
    applicationUserList(@Request() req ) {
        return this.ApplicationUserService.applicationUserList(req.user)
    }

    @Post('/admin/pending_user_approve_reject_delete')
    async pendingUserActionAction(@Request() req, @Body() reqbody: UserApproveDto) {
  
      return await this.ApplicationUserService.pendingUserActionAction(reqbody,req.user);
  
    }

    @Get('/admin/assignmenusubmenu')
    assignMenuSubmenuList(@Request() req ) {
        return this.ApplicationUserService.assignMenuSubmenuList(req.user)
    }

    @Post('/adminuser/assignmenusubmenu')
    userAssignMenuSubmenuList(@Body() reqbody : DeleteUserCreateDto ) {
        return this.ApplicationUserService.userAssignMenuSubmenuList(reqbody)
    }

    @Post('/adminuser/pendinguser/assignmenusubmenu')
    pendingUserAssignMenuSubmenuList(@Body() reqbody : DeleteUserCreateDto ) {
        return this.ApplicationUserService.pendingUserAssignMenuSubmenuList(reqbody)
    }
}
