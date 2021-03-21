import { NestFactory } from '@nestjs/core';
import { ENV } from '../../../libs/config/env';
import { WebModule } from './web.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as helmet from 'helmet';
import { DATE_TIME } from '../../../libs/util/date-time.util';
import { TypeormStore } from 'connect-typeorm';
import { getConnection } from 'typeorm';
import { SessionEntity } from '../../../libs/account/src/auth/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);

  app.use(helmet());
  app.enableCors({
    origin: [ENV.FRONTEND_HOSTNAME],
    credentials: true,
  });

  app.setGlobalPrefix('api-v1');

  const sessionRepository = await getConnection().getRepository(SessionEntity);
  app.use(
    session({
      secret: ENV.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: 'twt.sid',
      cookie: {
        httpOnly: true,
        maxAge: DATE_TIME.ONE_HOUR_IN_MILLISECONDS,
        secure: !ENV.isDev,
      },
      store: new TypeormStore({
        cleanupLimit: 1000,
        ttl: DATE_TIME.ONE_HOUR_IN_MILLISECONDS,
      }).connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(ENV.BACKEND_PORT_NUMBER);
}
bootstrap();
