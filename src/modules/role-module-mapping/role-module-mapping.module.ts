import { Module } from '@nestjs/common';
import { RoleModuleMappingController } from './role-module-mapping.controller';
import { RoleModuleMapProviders } from './role-module-mapping.providers';
import { RoleModuleMappingService } from './role-module-mapping.service';
import { DatabaseModule } from '../../config/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [RoleModuleMappingController],
  providers: [RoleModuleMappingService, ...RoleModuleMapProviders]
})
export class RoleModuleMappingModule {}
