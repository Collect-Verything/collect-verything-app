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
      products: {
        create: [
          { name: 'T-shirt', quantity: 3, delivered: 3 },
          { name: 'Porte clé vert', quantity: 2, delivered: 2 },
        ],
      },
      user: {
        create: {
          name: 'Cansell',
          email: 'admin@admin.fr',
          owner: 'cus_RnTtXDu5wUoTLf',
        },
      },
    },
  });

  const delivery2 = await prisma.delivery.upsert({
    where: { id: 2 },
    update: {},
    create: {
      delivery_status: 'Partial',
      delivery_type: 'Shop',
      info: "Le client a téléphoné pour dire qu'il viendrait mardi à 17h00",
      products: {
        create: [
          { name: 'T shirt', quantity: 2, delivered: 1 },
          { name: 'Porte clé vert', quantity: 3, delivered: 0 },
        ],
      },
      user: {
        create: {
          name: 'Cansell',
          email: 'admin@admin.fr',
          owner: 'cus_RnTtXDu5wUoTLf',
        },
      },
    },
  });

  const delivery3 = await prisma.delivery.upsert({
    where: { id: 3 },
    update: {},
    create: {
      delivery_status: 'Done',
      delivery_type: 'Shop',
      info: 'Commande récupérée, le client a offert un bouquet de fleurs',
      products: {
        create: [{ name: 'T shirt', quantity: 1, delivered: 1 }],
      },
      user: {
        create: {
          name: 'Cansell',
          email: 'admin@admin.fr',
          owner: 'cus_RnTtXDu5wUoTLf',
        },
      },
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
    await prisma.$disconnect();
  });
