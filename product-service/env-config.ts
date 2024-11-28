import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  PRODUCT_PORT_API: process.env.PRODUCT_PORT,
  FRONT_PORT_CLIENT: process.env.FRONT_PORT,
};
