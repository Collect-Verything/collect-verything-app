import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  FRONT_PORT: process.env.FRONT_PORT,

  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,

  FACTURATION_PORT: process.env.FACTURATION_PORT,
  FACTURATION_URL: process.env.FACTURATION_URL,
};
