#!/bin/sh
set -e

until nc -z -v -w30 mysql-product 3306; do
  echo "En attente de la base de données MySQL..."
  sleep 1
done
echo "La base de données MySQL est prête."

echo "Prisma generate…"
npx prisma generate

echo "Prisma migrate deploy…"
npx prisma migrate deploy

echo "Prisma db seed…"
npx prisma db seed

echo "Démarrage de l'application…"
npm run start:debug
