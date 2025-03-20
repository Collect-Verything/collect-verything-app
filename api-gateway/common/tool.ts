import { freePath } from './const';
import { configEnv } from '../env-config';

export const checkFreePath = (requUrl: string) => {
  // AUTH : Login & Register
  if (
    requUrl.split('/')[1] === `${configEnv.AUTH_URL_AUTH}` &&
    freePath.includes(requUrl.split('/')[2])
  )
    return true;

  //   Stripe Event
};
