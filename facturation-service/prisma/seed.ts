import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const invoice = await prisma.facture.upsert({
    where: { id: 'in_1QtPsMK9Jv3tCgckLYXpgmfy' },
    update: {},
    create: {
      id: 'in_1QtPsMK9Jv3tCgckLYXpgmfy',

      amount: 1100,
      customer: 'cus_RmzpxFcuDJqenR',
      currency: 'eur',
      invoice_link:
        'https://invoice.stripe.com/i/acct_1BscbLK9Jv3tCgck/test_YWNjdF8xQnNjYkxLOUp2M3RDZ2NrLF9SbXpzeG45T1MzcGw2VVhwd0lzWXFFQzNjWlVqVzIwLDEzMDMyMjQzMA0200RQY8yFTQ?s=ap',
      invoice_download:
        'https://pay.stripe.com/invoice/acct_1BscbLK9Jv3tCgck/test_YWNjdF8xQnNjYkxLOUp2M3RDZ2NrLF9SbXpzeG45T1MzcGw2VVhwd0lzWXFFQzNjWlVqVzIwLDEzMDMyMjQzMA0200RQY8yFTQ/pdf?s=ap',
      start: 1742200826,
      end: 1739781626,
    },
  });

  console.log({ invoice });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
