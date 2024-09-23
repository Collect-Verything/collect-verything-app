import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roleUser = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER',
    },
  });

  const roleSuperAdmin = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
    },
  });

  const roleInvoice = await prisma.role.upsert({
    where: { name: 'INVOICE' },
    update: {},
    create: {
      name: 'INVOICE',
    },
  });

  const roleSupport = await prisma.role.upsert({
    where: { name: 'SUPPORT' },
    update: {},
    create: {
      name: 'SUPPORT',
    },
  });

  const userSuperAdmin = await prisma.user.upsert({
    where: { email: "admin@admin.admin" },
    update: {},
    create: {
      firstname: 'Julien',
      lastname: 'Cansell',
      email: "admin@admin.admin",
      password: "adminadmin",
      birthDate: new Date('1992-06-10'),
      gender: "MR",
      phone: "0606060606",
      roles: {
        connect: { id: roleSuperAdmin.id },
      },
    },
  });

  const userSimple = await prisma.user.upsert({
    where: { email: "user@user.user" },
    update: {},
    create: {
      firstname: 'Brice',
      lastname: 'Bite',
      email: "user@user.user",
      password: "useruser",
      birthDate: new Date('1992-06-10'),
      gender: "MR",
      phone: "0606060606",
      roles: {
        connect: { id: roleUser.id },
      },
    },
  });

  const userInvoice = await prisma.user.upsert({
    where: { email: "invoice@invoice.invoice" },
    update: {},
    create: {
      firstname: 'Thomas',
      lastname: 'Titoon',
      email: "invoice@invoice.invoice",
      password: "invoiceinvoice",
      birthDate: new Date('1992-06-10'),
      gender: "MR",
      phone: "0606060606",
      roles: {
        connect: { id: roleInvoice.id },
      },
    },
  });

  const userInvoiceSupport = await prisma.user.upsert({
    where: { email: "invoicesupport@invoicesupport.invoicesupport" },
    update: {},
    create: {
      firstname: 'Isaac',
      lastname: 'Lachnouff',
      email: "invoicesupport@invoicesupport.invoicesupport",
      password: "invoicesupport",
      birthDate: new Date('1992-06-10'),
      gender: "MR",
      phone: "0606060606",
      roles: {
        connect: [
          { id: roleInvoice.id },
          { id: roleSupport.id },
        ],
      },
    },
  });

  console.log({
    roleUser,
    roleSuperAdmin,
    roleInvoice,
    roleSupport,
    userSuperAdmin,
    userSimple,
    userInvoice,
    userInvoiceSupport,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
