import { freePath } from './const';

/**
 * @function checkFreePath
 * @description
 * Vérifie si l'URL d'une requête correspond à un chemin d'accès public (ex: login, register, ...)
 * pour lequel une vérification d'identité (token JWT) n'est pas nécessaire.
 *
 * @param {string} requestUrl - L'URL brute de la requête entrante
 * @returns {boolean} - Retourne `true` si la route est considérée comme libre d'accès (sans token), sinon `false`
 *
 * @example
 * checkFreePath('/auth/login'); // true
 * checkFreePath('/auth/profile'); // false
 */

// TODO: Stripe Event in prod mode
export const checkFreePath = (requestUrl: string): boolean => {
  if (requestUrl.split('/')[1] === `auth` && freePath.includes(requestUrl.split('/')[2]))
    return true;
};

export const returnFreePath = (requestUrl: string) => {
  return requestUrl.split('/')[2];
};
