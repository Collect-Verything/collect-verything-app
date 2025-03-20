import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  DOMAIN: process.env.DOMAIN,
  FRONT_PORT: process.env.FRONT_PORT,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  AUTH_PORT: process.env.AUTH_PORT,
  AUTH_URL_AUTH: process.env.AUTH_URL_AUTH,
  AUTH_URL_ROLES: process.env.AUTH_URL_ROLES,
  AUTH_URL_USERS: process.env.AUTH_URL_USERS,

  PRODUCT_PORT: process.env.PRODUCT_PORT,
  PRODUCT_URL: process.env.PRODUCT_URL,

  FACTURATION_PORT: process.env.FACTURATION_PORT,
  FACTURATION_URL: process.env.FACTURATION_URL,

  CONFIG_PORT: process.env.CONFIG_PORT,
  CONFIG_URL: process.env.CONFIG_URL,
};
