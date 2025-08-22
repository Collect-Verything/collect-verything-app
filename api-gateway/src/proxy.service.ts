import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { checkFreePath } from './common/tool';
import { checkTokenRequest, processEventPath, processMainRequest } from './common/functions';

// TODO : STRIPE EVENT
// TODO : ⚠️ Upgrade logique for free path, for the moment only auth login and register is accepted

/**
 * @method processRequest
 * @description
 * Route automatiquement une requête entrante vers le microservice approprié, en fonction de son URL.
 *
 * 🔒 Si la route est protégée :
 * - Vérifie la présence et la validité du token via le service d'authentification
 * - En cas de succès, transmet la requête au microservice concerné
 *
 * 🔓 Si la route est libre (ex: login, register) :
 * - Appelle directement le service d’authentification sans vérification du token
 *
 * @param {Request} req - Requête HTTP entrante (provenant de l'utilisateur)
 * @returns {Promise<any>} - Résultat de la requête transmise au microservice cible
 *
 * @throws {UnauthorizedException} - Si aucun token n'est fourni ou si le token est invalide
 *
 * @example
 * // Requête vers une route publique :
 * processRequest(req); // redirigée sans auth vers /auth/login
 *
 * // Requête vers une route protégée :
 * processRequest(req); // nécessite un token valide
 */

@Injectable()
export class ProxyService {
  async processRequest(req: Request) {
    // STRIPE WEB HOOK EVENT'S
    if (req.url === '/stripe/event') {
      return await processEventPath(req);
    } else {
      // REVERSE PROXY
      if (checkFreePath(req.url)) {
        // Check Token
        return checkTokenRequest(req);
      } else {
        if (req.headers.authorization) {
          // Process request
          return processMainRequest(req);
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      }
    }
  }
}
