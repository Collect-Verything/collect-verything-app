import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  PRODUCT_PORT: process.env.PRODUCT_PORT,
  PRODUCT_URL: process.env.PRODUCT_URL,
};
