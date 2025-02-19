import { Facture } from '@prisma/client';

export class InvoiceEntity implements Facture {
  id: string;
  amount: number;
  customer: string;
  currency: string;
  invoice_link: string;
  invoice_download: string;
  start: number;
  end: number;
}
