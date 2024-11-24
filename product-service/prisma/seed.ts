import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const service1 = await prisma.product.upsert({
        where: { title: 'Standard' },
        update: {},
        create: {
            picture_path: "http://image" ,
            name: "Standard",
            title: "Conçu pour l’extensibilité\n",
            description: "Évoluez rapidement avec notre boutique en ligne personnalisable, ou construisez la vôtre avec la technologie qui vous plaît pour une liberté créative totale. Mieux encore, intégrez vos systèmes tiers via les API de notre écosystème d’applications." ,
            details: "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Assistance par chat à tout moment\n" +
                "• Vente globale localisée\n" +
                "• Stockage serveur 2go\n" +
                "• Le processus optimisé\n" +
                "• Analyses de données standard",
            type: "SERVICE",
            stock: 0,
            price: 12.00,
            published: true,
        },
    });

    const service2 = await prisma.product.upsert({
        where: { name: 'Medium' },
        update: {},
        create: {
            picture_path: "http://image" ,
            name: "Medium",
            title: "Optimisé pour le headless",
            description: "Pour une flexibilité optimale, créez votre boutique via la couche API headless de Shopify. Hébergez-la n’importe où, ou déployez-la en quelques heures en utilisant notre pile headless basée sur React, sans surcoût." ,
            details: "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Assistance par chat à tout moment\n" +
                "• Vente globale localisée\n" +
                "• Stockage serveur 2go\n" +
                "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Vente globale localisée\n",
            type: "SERVICE",
            stock: 0,
            price: 16.00,
            published: true,
        },
    });

    const service3 = await prisma.product.upsert({
        where: { name: 'Premium' },
        update: {},
        create: {
            picture_path: "http://image" ,
            name: "Premium",
            title: "L’obsession de la performance\n",
            description: "Optimisez notre boutique en ligne extra rapide et notre paiement le plus performant au monde avec des extensions pour le retail, la vente en gros et votre back-office.\n" ,
            details: "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Assistance par chat à tout moment\n" +
                "• Vente globale localisée\n" +
                "• Stockage serveur 2go\n" +
                "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Vente globale localisée\n" +
                "• Stockage serveur 2go\n" +
                "• Assistance par chat à tout moment\n",
            type: "SERVICE",
            stock: 0,
            price: 20.00,
            published: true,
        },
    });

    const service4 = await prisma.product.upsert({
        where: { name: 'Expert' },
        update: {},
        create: {
            picture_path: "http://image" ,
            name: "Expert",
            title: "L'excellence à votre porté",
            description: "Bla bla sur Bla bla sur Bla bla sur Bla bla sur Bla bla sur Bla bla sur Bla bla sur Bla bla sur Bla bla sur " ,
            details: "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Assistance par chat à tout moment\n" +
                "• Vente globale localisée\n" +
                "• Stockage serveur 2go\n" +
                "• Le processus optimisé\n" +
                "• Analyses de données standard\n" +
                "• 10 emplacements des stocks\n" +
                "• Vente globale localisée\n" +
                "• Stockage serveur 2go\n" +
                "• Assistance par chat à tout moment\n",
            type: "SERVICE",
            stock: 0,
            price: 40.00,
            published: false,
        },
    });

    console.log({ serv1: service1, serv2: service2 , serv3: service3, serv4: service4 });
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