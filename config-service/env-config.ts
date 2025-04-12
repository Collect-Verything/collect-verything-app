import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  DOMAIN: process.env.DOMAIN,

  FRONT_PORT: process.env.FRONT_PORT,

  CONFIG_PORT: process.env.CONFIG_PORT,
  CONFIG_URL: process.env.CONFIG_URL,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
};
