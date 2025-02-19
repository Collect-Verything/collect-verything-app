import { Controller, Get, Param } from '@nestjs/common';
import { STRIPE_URL } from '../const';
import { StripeInvoiceService } from './invoice.service';

@Controller(`${STRIPE_URL}/invoice`)
export class StripeInvoiceController {
  constructor(private readonly stripeEventService: StripeInvoiceService) {}

  @Get(':stripe_id')
  async getUserInvoices(@Param('stripe_id') stripe_id: string) {
    return this.stripeEventService.getUserInvoices(stripe_id);
  }
}
