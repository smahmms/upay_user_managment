import { Module } from '@nestjs/common';
import { RoleManagementService } from './role-management.service';
import { UserManagementController } from './role-management.controller';
import {UserManagementProviders} from './role-management.providers'

import {AuthModule} from '../auth/auth.module'

@Module({
  providers: [RoleManagementService, ...UserManagementProviders],
  controllers: [UserManagementController],
  imports : [AuthModule]
})
export class RoleManagementModule {}
