import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import {expressBind} from 'i18n-2'
import {localize} from './middleware'
import { ValidateInputPipe } from './middleware/validate';
import {AuthModuleGuard} from './middleware/guards'
import {nestwinstonLog, HttpPortLog} from './config/winstonLog'


async function bootstrap() {

 const app = await NestFactory.create<NestExpressApplication>(AppModule,{
  logger:  nestwinstonLog,
})
 // global prefix
  app.setGlobalPrefix('usrm')
  
   expressBind(app, {locales: [ 'en' ] })
 
   app.use(localize)

   //handle browser cros..
   app.enableCors()

  // handle all user input validation globally

  app.useGlobalPipes(new ValidateInputPipe());

  //use globally to check auth module from request header
  app.useGlobalGuards(new AuthModuleGuard())

  await app.listen(process.env.PORT || 3000, () => HttpPortLog(process.env.PORT || 3000));

}

bootstrap();
