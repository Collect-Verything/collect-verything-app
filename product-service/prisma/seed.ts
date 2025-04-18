import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const service1 = await prisma.product.upsert({
    where: { stripe_id: 'prod_RS3pxsNscqx8wE' },
    update: {},
    create: {
      picture_path: 'http://image',
      stripe_id: 'prod_RS3pxsNscqx8wE',
      stripe_id_price: 'price_1QZ9iCK9Jv3tCgckVL5JrtPK',
      name: 'Standard',
      title: 'Conçu pour l’extensibilité\n',
      description:
        'Évoluez rapidement avec notre boutique en ligne personnalisable, ou construisez la vôtre avec la technologie qui vous plaît pour une liberté créative totale. Mieux encore, intégrez vos systèmes tiers via les API de notre écosystème d’applications.',
      details:
        '• Le processus optimisé\n' +
        '• Analyses de données standard\n' +
        '• 10 emplacements des stocks\n' +
        '• Assistance par chat à tout moment\n' +
        '• Vente globale localisée\n' +
        '• Stockage serveur 2go\n' +
        '• Le processus optimisé\n' +
        '• Analyses de données standard',
      type: 'SERVICE',
      stock: 0,
      price: 12.0,
      published: true,
    },
  });

  const service2 = await prisma.product.upsert({
    where: { stripe_id: 'prod_RS3qjdPSLTR2Uz' },
    update: {},
    create: {
      picture_path: 'http://image',
      stripe_id: 'prod_RS3qjdPSLTR2Uz',
      stripe_id_price: 'price_1QZ9j5K9Jv3tCgcku3wsvcSo',
      name: 'Medium',
      title: 'Optimisé pour le headless',
      description:
        'Pour une flexibilité optimale, créez votre boutique via la couche API headless de Shopify. Hébergez-la n’importe où, ou déployez-la en quelques heures en utilisant notre pile headless basée sur React, sans surcoût.',
      details:
        '• Le processus optimisé\n' +
        '• Analyses de données standard\n' +
        '• 10 emplacements des stocks\n' +
        '• Assistance par chat à tout moment\n' +
        '• Vente globale localisée\n' +
        '• Stockage serveur 2go\n' +
        '• Le processus optimisé\n' +
        '• Analyses de données standard\n' +
        '• 10 emplacements des stocks\n' +
        '• Vente globale localisée\n',
      type: 'SERVICE',
      stock: 0,
      price: 16.0,
      published: true,
    },
  });

  const service3 = await prisma.product.upsert({
    where: { stripe_id: 'prod_RS3rCG1UsHuVOn' },
    update: {},
    create: {
      picture_path: 'http://image',
      stripe_id: 'prod_RS3rCG1UsHuVOn',
      stripe_id_price: 'price_1QZ9jXK9Jv3tCgckxn0y8gao',
      name: 'Premium',
      title: 'L’obsession de la performance\n',
      description:
        'Optimisez notre boutique en ligne extra rapide et notre paiement le plus performant au monde avec des extensions pour le retail, la vente en gros et votre back-office.\n',
      details:
        '• Le processus optimisé\n' +
        '• Analyses de données standard\n' +
        '• 10 emplacements des stocks\n' +
        '• Assistance par chat à tout moment\n' +
        '• Vente globale localisée\n' +
        '• Stockage serveur 2go\n' +
        '• Le processus optimisé\n' +
        '• Analyses de données standard\n' +
        '• 10 emplacements des stocks\n' +
        '• Vente globale localisée\n' +
        '• Stockage serveur 2go\n' +
        '• Assistance par chat à tout moment\n',
      type: 'SERVICE',
      stock: 0,
      price: 20.0,
      published: true,
    },
  });

  console.log({ serv1: service1, serv2: service2, serv3: service3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
