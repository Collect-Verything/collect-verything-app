import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//  "prisma": {
//    "seed": "ts-node prisma/seed.ts"
//  }

async function main() {
    // const sub1 = await prisma.solutionSubscription.upsert({
    //     where: { sub_stripe_id: 'Prisma Adds Support for MongoDB' },
    //     update: {},
    //     create: {
    //         published: false,
    //     },
    // });
    //
    // console.log({ sub1 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

