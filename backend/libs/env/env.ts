import { config as dotEnvConfig } from 'dotenv';
import { resolve as resolvePath } from 'path';

dotEnvConfig({ path: resolvePath(process.cwd(), '..', '.env') });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DATABASE_HOST,
  DB_PORT: +process.env.DATABASE_PORT_NUMBER,
  DB_USERNAME: process.env.DATABASE_USERNAME,
  DB_PASSWORD: process.env.DATABASE_PASSWORD,
  DB_NAME: process.env.DATABASE_NAME,
  BACKEND_PORT_NUMBER: +process.env.BACKEND_PORT_NUMBER,
  BACKEND_HOSTNAME: process.env.BACKEND_HOSTNAME,
  FRONTEND_HOSTNAME: process.env.FRONTEND_HOSTNAME,
  FRONTEND_PORT_NUMBER: +process.env.FRONTEND_PORT_NUMBER,
  isDev: process.env.NODE_ENV === 'development',
  isStaging: process.env.NODE_ENV === 'staging',
  isProd: process.env.NODE_ENV === 'production',
};
