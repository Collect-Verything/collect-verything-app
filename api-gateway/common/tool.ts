import {freePath} from './const';
import {configEnv} from '../env-config';

/**
 * @function checkFreePath
 * @description
 * Vérifie si l'URL d'une requête correspond à un chemin d'accès public (ex: login, register)
 * pour lequel une vérification d'identité (token JWT) n'est pas nécessaire.
 *
 * @param {string} requUrl - L'URL brute de la requête entrante
 * @returns {boolean} - Retourne `true` si la route est considérée comme libre d'accès (sans token), sinon `false`
 *
 * @example
 * checkFreePath('/auth/login'); // true
 * checkFreePath('/auth/profile'); // false
 */

export const checkFreePath = (requUrl: string) => {
  console.log('_______ Method : checkFreePath ');
  console.log('- Complete url : ', requUrl);
  console.log('- Path analyzed : ', requUrl.split('/')[1]);
  if (
    requUrl.split('/')[1] === `${configEnv.AUTH_URL_AUTH}` &&
    freePath.includes(requUrl.split('/')[2])
  )
    return true;

  // TODO: Stripe Event
};

export const returnFreePath = (requUrl: string) => {
  return requUrl.split('/')[2];
};
