import { freePath } from './const';
import { configEnv } from '../../env-config';

/**
 * @function checkFreePath
 * @description
 * Vérifie si l'URL d'une requête correspond à un chemin d'accès public (ex: login, register)
 * pour lequel une vérification d'identité (token JWT) n'est pas nécessaire.
 *
 * @param {string} requestUrl - L'URL brute de la requête entrante
 * @returns {boolean} - Retourne `true` si la route est considérée comme libre d'accès (sans token), sinon `false`
 *
 * @example
 * checkFreePath('/auth/login'); // true
 * checkFreePath('/auth/profile'); // false
 */

export const checkFreePath = (requestUrl: string): boolean => {
  console.log('_______ Method : checkFreePath ');
  console.log('- Complete url : ', requestUrl);
  console.log('- Path analyzed : ', requestUrl.split('/')[1]);
  if (
    requestUrl.split('/')[1] === `${configEnv.AUTH_URL_AUTH}` &&
    freePath.includes(requestUrl.split('/')[2])
  )
    return true;

  // TODO: Stripe Event
};

export const returnFreePath = (requestUrl: string) => {
  return requestUrl.split('/')[2];
};
