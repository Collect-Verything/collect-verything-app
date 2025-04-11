import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  FRONT_PORT: process.env.FRONT_PORT,

  AUTH_PORT: process.env.AUTH_PORT,
  AUTH_URL_AUTH: process.env.AUTH_URL_AUTH,
  AUTH_URL_ROLES: process.env.AUTH_URL_ROLES,
  AUTH_URL_USERS: process.env.AUTH_URL_USERS,

  FORGOT_PASSWORD_PATTERN: process.env.FORGOT_PASSWORD_PATTERN,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EMAIL_QUEUE: process.env.EMAIL_QUEUE,
};
