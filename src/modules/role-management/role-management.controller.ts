import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { RoleManagementService} from './role-management.service'
import {JwtAuthGuard} from '../../middleware/guards'
import {UserCreateDto,UserApproveDto,UpdateUserCreateDto, DeleteUserCreateDto} from '../../dto'


@Controller('role-management')
@UseGuards(JwtAuthGuard)
export class UserManagementController {

    constructor(private ApplicationUserService: RoleManagementService) { }

    @Get('/menusubmenu_list')
    getApplicationUserMenuSubMenuList(@Request() req) {
        return this.ApplicationUserService.getApplicationUserMenuSubMenu(req.user)
    }

    @Post('/admin/create_role')
    createAdminRole(@Request() req,@Body() reqbody : any) {
        return this.ApplicationUserService.createRoleUser(reqbody,req.user)
    }

    @Post('/admin/edit_role')
    editAdminRole(@Request() req,@Body() reqbody : any) {
        return this.ApplicationUserService.editRoleUser(reqbody,req.user)
    }

    @Post('/admin/delete_role')
    deleteAdminRole(@Request() req,@Body() reqbody : any) {
        return this.ApplicationUserService.deleteAdminRole(reqbody,req.user)
    }

    @Get('/admin/role_list')
    adminRoleList(@Request() req ) {
        return this.ApplicationUserService.adminRoleList(req.user)
    }

    @Get('/admin/role_list_for_assign')
    adminRoleListForAssign(@Request() req ) {
        return this.ApplicationUserService.adminRoleListForAssign(req.user)
    }

    @Post('/admin/role_temp_details')
    roleTempDetails(@Request() req, @Body() body ) {
        return this.ApplicationUserService.roleTempDetails(body, req.user)
    }

    @Post('/admin/role_details')
    roleDetails(@Request() req, @Body() body ) {
        return this.ApplicationUserService.roleDetails(body, req.user)
    }


    @Post('/admin/pending_role_approve_reject_delete')
    async pendingRoleAction(@Request() req, @Body() reqbody: any) {
  
      return await this.ApplicationUserService.pendingAdminRoleAction(reqbody,req.user);
  
    }
}
