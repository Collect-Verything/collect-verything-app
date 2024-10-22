import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordSuperAdmin = await bcrypt.hash('adminadmin', roundsOfHashing);
  const passwordSimple = await bcrypt.hash('useruser', roundsOfHashing);
  const passwordInvoice = await bcrypt.hash('invoiceinvoice', roundsOfHashing);

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
    where: { email: 'admin@admin.admin' },
    update: { password: passwordSuperAdmin },
    create: {
      firstname: 'Julien',
      lastname: 'Cansell',
      email: 'admin@admin.admin',
      password: passwordSuperAdmin,
      birthDate: new Date('1992-06-10'),
      gender: 'MR',
      phone: '0606060606',
      role: {
        connect: { id: roleSuperAdmin.id },
      },
    },
  });

  const userSimple = await prisma.user.upsert({
    where: { email: 'user@user.user' },
    update: { password: passwordSimple },
    create: {
      firstname: 'Brice',
      lastname: 'Bite',
      email: 'user@user.user',
      password: passwordSimple,
      birthDate: new Date('1992-06-10'),
      gender: 'MR',
      phone: '0606060606',
      role: {
        connect: { id: roleUser.id },
      },
    },
  });

  const userInvoice = await prisma.user.upsert({
    where: { email: 'invoice@invoice.invoice' },
    update: { password: passwordInvoice },
    create: {
      firstname: 'Thomas',
      lastname: 'Titoon',
      email: 'invoice@invoice.invoice',
      password: passwordInvoice,
      birthDate: new Date('1992-06-10'),
      gender: 'MR',
      phone: '0606060606',
      role: {
        connect: { id: roleInvoice.id },
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
