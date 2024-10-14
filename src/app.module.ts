import { Module, NestModule,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module'
import {LoggerMiddleware} from './middleware'
import { AuthModule } from './modules/auth/auth.module'
import {interceptorProviders} from './helpers/interceptor'
import { UserManagementModule } from './modules/user-management/user-management.module';
import { RoleManagementModule } from './modules/role-management/role-management.module';
import { BdAddressModule } from './modules/bd-address/bd-address.module'
import { RoleModuleMappingModule } from './modules/role-module-mapping/role-module-mapping.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule,
    AuthModule,
    UserManagementModule,
    RoleManagementModule,
    BdAddressModule,
    RoleModuleMappingModule
  ],
  controllers: [

  ],
  providers: [

     ...interceptorProviders
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

