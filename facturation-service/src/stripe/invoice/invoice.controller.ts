import { Controller, Get, Param } from '@nestjs/common';
import { StripeInvoiceService } from './invoice.service';
import { configEnv } from '../../../env-config';

@Controller(`${configEnv.FACTURATION_URL}/invoice`)
export class StripeInvoiceController {
  constructor(private readonly stripeEventService: StripeInvoiceService) {}

  @Get(':stripe_id')
  async getUserInvoices(@Param('stripe_id') stripe_id: string) {
    return this.stripeEventService.getUserInvoices(stripe_id);
  }
}
