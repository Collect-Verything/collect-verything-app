← [Retourner au sommaire] [summary]

Voici les étapes à respecter lors de la création d’un nouveau service au sein du monorepo.
(Personnellement, à chaque création de service, je copie-colle ces étapes dans le dossier src du service et je les coche au fur et à mesure.)

```txt
TODO :
[ ] Generer un nouveau service avec la commande :  npx @nestjs/cli new new-service
[ ] Afficher les dossier caché dans le finder puis supprimer le dossier caché .git du nouveau service
[ ] Dans le git dif retablif le fichier present /.idea/vsc.xml (laisser le git root en maitre)
[ ] Supprimer les fichier de base generé par nestjs
[ ] Generer les premiere ressource avec la commande
[ ] Rajouter les script correspondant au besoin du nouveau service dans le package.json du root.
----[ ] Installation
----[ ] Base de donnée :
--------[ ] Generer schema
--------[ ] Seed
----[ ] Run
[ ] Configuration du fichier main du nouveau service
----[ ] Ajout du nouveau port dans le .env du root et
----[ ] npm i dotenv dans le service concerné
----[ ] Creer fichier env-config.ts pour la recuperation des .env du root (suivre pattern present dans les autres service)
[ ] Mettre a jour le document ReadeMe.md du root pour y ajouter la ligne concernant le nouveau service, suivre le pattern
[ ] Mettre a jour les fichier en rapport avec Docker (suivre pattern existant
----[ ] Dockerfile 
----[ ] compose.yaml
----[ ] start.sh
[ ] Mettre a jour les action github en rajoutant le nouveau service, donc un nouveau fichier. (suivre le pattern)
[ ] Une fois les classes, db et process en place, creer documentation, diagramme classe et sequence
```


[summary]: ../README.md
