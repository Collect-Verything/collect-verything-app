import { freePath } from './const';

export const checkFreePath = (requUrl: string) => {
  // AUTH : Login & Register
  if (
    requUrl.split('/')[1] === 'auth' &&
    freePath.includes(requUrl.split('/')[2])
  )
    return true;

  //   Stripe Event
};
