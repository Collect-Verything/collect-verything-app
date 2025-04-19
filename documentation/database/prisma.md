← [Retourner au sommaire] [summary]

NEED TO BE UPDATE DEPENDNG THE NEW PROJECT

## Prisma

If you wish to modify the database, such as a table for example or certain constraints on certain fields. Paying attention to the impact and edge effect that this could have, you must modify the following file

### **prisma/schema.prisma**

```prisma
model Article {
  id          Int      @id @default(autoincrement())
  title       String   @unique
  newItem     NewType  @default()
}
```

### Migrate the database

With the Prisma schema defined, you will run migrations to create the actual tables in the database. To generate and execute your first migration, run the following command in the terminal:

```shell
npx prisma migrate dev --name "NameModification"
```

Check the generated migration file to get an idea about what Prisma Migrate is doing behind the scenes:

### prisma/migrations/20220528101323_init/migration.sql

```sql
-- CreateTable
CREATE TABLE "Article"
(
    "id"          SERIAL       NOT NULL,
    "title"       TEXT         NOT NULL,
    "description" TEXT,
    "body"        TEXT         NOT NULL,
    "published"   BOOLEAN      NOT NULL DEFAULT false,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,

CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");
);
```

Then you must modify the seed file accordingly

### prisma/seed.ts

```ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      newItem: 'New Dat',
    },
  });

  console.log({ post1 });
}
```

## Execute Seed

The seed command will execute the prisma/seed.ts script that you previously defined. This command should work automatically because ts-node is already installed as a dev dependency in your package.json.

Execute seeding with the following command:

```shell
npx prisma db seed
```

You can then visually check your tables to make a check.

Then you need to think about modifying the classes in the front and in the targeted service

[summary]: ../README.md
