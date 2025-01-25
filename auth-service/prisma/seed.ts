import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

/*
 *  Les clients du seed ne possede pas d'id Stripe, il faut obligatoirement ce register pour possede un id stripe
 * */
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
    where: { email: 'admin@admin.fr' },
    update: { password: passwordSuperAdmin },
    create: {
      id_stripe: '',
      firstname: 'Julien',
      lastname: 'Cansell',
      email: 'admin@admin.fr',
      password: passwordSuperAdmin,
      birthDate: new Date('1992-06-10'),
      gender: 'Monsieur',
      phone: '0606060606',
      role: {
        connect: { id: roleSuperAdmin.id },
      },
    },
  });

  const userSimple = await prisma.user.upsert({
    where: { email: 'user@user.fr' },
    update: { password: passwordSimple },
    create: {
      id_stripe: '',
      firstname: 'Brice',
      lastname: 'Bite',
      email: 'user@user.fr',
      password: passwordSimple,
      birthDate: new Date('1992-06-10'),
      gender: 'Monsieur',
      phone: '0606060606',
      role: {
        connect: { id: roleUser.id },
      },
    },
  });

  const userInvoice = await prisma.user.upsert({
    where: { email: 'invoice@invoice.fr' },
    update: { password: passwordInvoice },
    create: {
      id_stripe: '',
      firstname: 'Thomas',
      lastname: 'Titoon',
      email: 'invoice@invoice.fr',
      password: passwordInvoice,
      birthDate: new Date('1992-06-10'),
      gender: 'Monsieur',
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
