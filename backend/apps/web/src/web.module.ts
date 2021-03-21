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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TweetController } from './tweet/tweet.controller';
import { TweetEntity } from '../../../libs/tweet/src/tweet.entity';
import { TweetModule } from '../../../libs/tweet/src';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.DB_HOST,
      port: +ENV.DB_PORT,
      username: ENV.DB_USERNAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      entities: [UserEntity, SessionEntity, TweetEntity],
      synchronize: ENV.isDev,
      logging: ENV.isDev,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../frontend', 'dist'),
    }),
    AuthModule,
    UserModule,
    TweetModule,
  ],
  controllers: [WebController, UserController, TweetController],
  providers: [WebService],
})
export class WebModule {}
