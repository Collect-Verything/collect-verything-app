import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const configEnv = {
  EMAIL_MESSAGE_BROKER: process.env.EMAIL_MESSAGE_BROKER,
  PASSWORD_MESSAGE_BROKER: process.env.PASSWORD_MESSAGE_BROKER,
  EMAIL_QUEUE: process.env.EMAIL_QUEUE,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  FORGOT_PASSWORD_PATTERN: process.env.FORGOT_PASSWORD_PATTERN,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
};
