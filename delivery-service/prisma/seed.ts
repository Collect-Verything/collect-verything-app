import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const delivery1 = await prisma.delivery.upsert({
    where: { id: 1 },
    update: {},
    create: {
      delivery_status: 'Pending',
      delivery_type: 'Point_Relais',
      info: '',
      product: { create: { name: 'T shirt', quantity: 3 } },
      user: { create: { name: 'Cansell', email: 'admin@admin.fr', owner: 'cus_RnTtXDu5wUoTLf' } },
    },
  });

  const delivery2 = await prisma.delivery.upsert({
    where: { id: 2 },
    update: {},
    create: {
      delivery_status: 'Pending',
      delivery_type: 'Shop',
      info: "Le client à telehponé pour dire qu'il viendrait mardi à 17h00",
      product: { create: { name: 'T shirt', quantity: 2 } },
      user: { create: { name: 'Cansell', email: 'admin@admin.fr', owner: 'cus_RnTtXDu5wUoTLf' } },
    },
  });

  const delivery3 = await prisma.delivery.upsert({
    where: { id: 3 },
    update: {},
    create: {
      delivery_status: 'Done',
      delivery_type: 'Shop',
      info: 'Commande recuperé, le client à offert un bouquet de fleur',
      product: { create: { name: 'T shirt', quantity: 1 } },
      user: { create: { name: 'Cansell', email: 'admin@admin.fr', owner: 'cus_RnTtXDu5wUoTLf' } },
    },
  });

  console.log({ delivery1, delivery2, delivery3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
