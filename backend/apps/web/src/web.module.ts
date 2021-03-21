import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '../../../libs/env/env';
import { WebController } from './web.controller';
import { WebService } from './web.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.DB_HOST,
      port: +ENV.DB_PORT,
      username: ENV.DB_USERNAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      entities: [],
      synchronize: true,
      logging: ENV.isDev,
    }),
  ],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
