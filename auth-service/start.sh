# Attendre que MySQL soit prêt
until nc -z -v -w30 mysql 3306
do
  echo "En attente de la base de données MySQL..."
  sleep 1
done

echo "La base de données MySQL est prête, lancement de Prisma !"

# Générer le client Prisma
npx prisma generate

# Exécuter Prisma
npx prisma migrate dev --name "Setup auth db"
npx prisma db seed

# Démarrer l'application
npm run start:dev
