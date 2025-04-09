import { freePath } from './const';
import { configEnv } from '../env-config';

export const checkFreePath = (requUrl: string) => {
  // AUTH : Login & Register
  console.log('_______Check Free Path Method')
  console.log(requUrl)
  console.log(requUrl.split('/')[1])
  if (
    requUrl.split('/')[1] === `${configEnv.AUTH_URL_AUTH}` &&
    freePath.includes(requUrl.split('/')[2])
  )
    return true;

  //   Stripe Event
};

export const returnFreePath = (requUrl: string) => {
    return requUrl.split('/')[2];
};
