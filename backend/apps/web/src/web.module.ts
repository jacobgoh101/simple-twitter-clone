import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '../../../libs/config/env';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { UserController } from './user/user.controller';
import { AuthModule } from '../../../libs/account/src/auth/auth.module';
import { UserModule } from '../../../libs/account/src/user/user.module';
import { UserEntity } from '../../../libs/account/src/user/user.entity';
import { SessionEntity } from '../../../libs/account/src/auth/session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.DB_HOST,
      port: +ENV.DB_PORT,
      username: ENV.DB_USERNAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      entities: [UserEntity, SessionEntity],
      synchronize: ENV.isDev,
      logging: ENV.isDev,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [WebController, UserController],
  providers: [WebService],
})
export class WebModule {}
