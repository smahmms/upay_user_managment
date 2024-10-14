import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import {UserManagementProviders} from './user-management.providers'

import {AuthModule} from '../auth/auth.module'
import { DatabaseModule } from  '../../config/database/database.module'

@Module({
  providers: [UserManagementService, ...UserManagementProviders],
  controllers: [UserManagementController],
  imports : [AuthModule, DatabaseModule]
})
export class UserManagementModule {}
