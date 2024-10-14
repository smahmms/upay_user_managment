import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../middleware/guards';
import { RoleModuleMappingService } from './role-module-mapping.service';

@Controller('role-module-mapping')
@UseGuards(JwtAuthGuard)
export class RoleModuleMappingController {

  constructor(private roleModuleMappingService: RoleModuleMappingService) { }

  @Get('/all')
  getAllList(@Request() req, @Body() reqbody) {
      return this.roleModuleMappingService.getAllList()
  }

  @Get('/get-rilac-module-list')
  getRilacModuleList(@Request() req, @Body() reqbody) {
      return this.roleModuleMappingService.getRilacModuleList()
  }


  @Get('/pending')
  getAllPendingList(@Request() req, @Body() reqbody) {
      return this.roleModuleMappingService.getAllPendingMap()
  }

  @Get('/pending/:id')
  getPending(@Request() req, @Body() reqbody,  @Param('id') id) {
      return this.roleModuleMappingService.getPendingMap(id)
  }

  @Get('/id/:id')
  getRoleMap(@Request() req, @Body() reqbody, @Param('id') id) {
      return this.roleModuleMappingService.getRoleMap(id)
  }

  @Post('/update-map')
  updateRoleMap(@Request() req, @Body() reqbody) {
      return this.roleModuleMappingService.updateRoleMap(reqbody, req.user.username)
  }

  @Post('/action')
  roleMapAction(@Request() req, @Body() reqbody) {
      return this.roleModuleMappingService.roleMapAction(reqbody, req.user.username)
  }
}
