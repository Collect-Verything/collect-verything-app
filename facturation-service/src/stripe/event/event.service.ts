import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StripeEventService {
  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkEvent(body: any) {
    if (body.object.object === 'invoice') {
      return await this.invoiceTreatment(body);
    }
    if (body.object.object === 'payment_intent') {
      return await this.paymentIntentTreatment(body);
    } else {
      console.log('Object recu non traité');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async invoiceTreatment(invoice: any) {
    return this.prisma.facture.create({
      data: {
        id: invoice.object.id,
        amount: invoice.object.amount_paid,
        customer: invoice.object.customer,
        currency: invoice.object.currency,
        invoice_link: invoice.object.hosted_invoice_url,
        invoice_download: invoice.object.invoice_pdf,
        start: invoice.object.lines.data[0].period.start,
        end: invoice.object.lines.data[0].period.end,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async paymentIntentTreatment(invoice: any) {
    return this.prisma.facture.create({
      data: {
        id: invoice.object.id,
        amount: invoice.object.amount,
        customer: invoice.object.customer,
        currency: invoice.object.currency,
        invoice_link: invoice.object.charges.data[0].receipt_url,
        invoice_download: invoice.object.charges.data[0].receipt_url,
        start: invoice.object.created,
        end: invoice.object.created,
      },
    });
  }
}
