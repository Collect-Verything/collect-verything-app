import { All, Controller, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProxyService } from './proxy.service';

/**
 * @controller ProxyController
 * @description
 * Contrôleur central de la Gateway qui intercepte toutes les requêtes entrantes (*),
 * et les transmet au service `ProxyService` pour qu'elles soient redirigées vers le bon microservice.
 *
 * Ce contrôleur agit comme un **reverse proxy** :
 * - Il capte toutes les méthodes HTTP (`GET`, `POST`, `PUT`, etc.)
 * - Il délègue la logique de traitement à `ProxyService.processRequest()`
 */

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  async checkRequest(@Req() req: Request) {
    return this.proxyService.processRequest(req);
  }
}
