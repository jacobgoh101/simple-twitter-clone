import { NestFactory } from '@nestjs/core';
import { ENV } from '../../../libs/env/env';
import { WebModule } from './web.module';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);
  await app.listen(ENV.BACKEND_PORT_NUMBER);
}
bootstrap();
