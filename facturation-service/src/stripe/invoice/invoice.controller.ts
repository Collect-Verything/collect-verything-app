import { Controller, Get, Param } from '@nestjs/common';
import { StripeInvoiceService } from './invoice.service';
import { configEnv } from '../../../env-config';

@Controller(`${configEnv.FACTURATION_URL}/invoice`)
export class StripeInvoiceController {
  constructor(private readonly stripeEventService: StripeInvoiceService) {}

  // TODO : Quand un user job souhaite consulter les facture il ne peut pas car on get des facture avec un userstripe undefined, car un user job n'en possedepas, donc trouver le moyen de detecter si user job effectue la requete, si c'est le cas, alors un findAllInvoces est effectué plutot q'un findInvoicesByUserId
  // Probleme qui provient de la methode toolRequest de api gateway/common
  @Get(':stripe_id')
  async getUserInvoices(@Param('stripe_id') stripe_id: string) {
    return this.stripeEventService.getUserInvoices(stripe_id);
  }
}
