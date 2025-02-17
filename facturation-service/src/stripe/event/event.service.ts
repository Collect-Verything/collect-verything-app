import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class StripeEventService {

  constructor(
      private prisma: PrismaService
  ) {}

  async checkEvent(body: any) {
    if (body.object.object === 'invoice') {
      return await this.invoiceTreatment(body);
    } else {
      console.log('autre');
    }
  }

  // payment_intent.succeeded
  async invoiceTreatment(invoice: any) {
    return this.prisma.facture.create({
      data: {
        id: invoice.object.id,
        amount: invoice.object.amount_paid,
        customer: invoice.object.customer,
        currency: invoice.object.currency,
        invoice_link: invoice.object.hosted_invoice_url,
        invoice_download:invoice.object.invoice_pdf,
        start:invoice.object.lines.data[0].period.start,
        end:invoice.object.lines.data[0].period.end,
      },
    })
  }
}
