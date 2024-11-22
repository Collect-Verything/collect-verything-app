# Attendre que MySQL soit prêt
until nc -z -v -w30 mysql-auth 3306
do
  echo "En attente de la base de données MySQL..."
  sleep 1
done

echo "La base de données MySQL est prête, lancement de Prisma !"


# Exécuter Prisma
npx prisma migrate dev --name "Setup auth db"
npx prisma db seed

# Démarrer l'application TODO : changer le script start pour lancement prod
npm run start:dev

