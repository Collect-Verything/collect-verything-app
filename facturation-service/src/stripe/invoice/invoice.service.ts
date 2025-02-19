import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StripeInvoiceService {
  constructor(private prisma: PrismaService) {}

  async getUserInvoices(id: string) {
    return this.prisma.facture.findMany({ where: { customer: id } });
  }
}
