import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import { checkFreePath, returnFreePath } from './common/tool';
import { configEnv } from '../env-config';
import { toolRequest } from './common/requests';

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
      const res = await axios[req.method.toLowerCase()](
        `http://facturation-service:3003/stripe/event`,
        req.body
      );
      return res.status(200);
    }

    // REVERSE PROXY
    if (checkFreePath(req.url)) {
      const res = await axios[req.method.toLowerCase()](
        `http://${configEnv.DOMAIN_AUTH}:3001/auth/${returnFreePath(req.url)}`,
        req.body
      );
      return res.data;
    } else {
      if (req.headers.authorization) {
        const responseCheckToken = await axios.post(
          `http://${configEnv.DOMAIN_AUTH}:${configEnv.AUTH_PORT}/${configEnv.AUTH_URL_AUTH}/validate-token`,
          {},
          { headers: { Authorization: req.headers.authorization } }
        );
        if (responseCheckToken.status === 200) {
          const response = await toolRequest(req);
          return response.data;
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
