← [Retourner au sommaire] [summary]

# 🏥 Node Env Poke-Center

Étant donné le nombre de services et de paires clé/valeur utilisées pour nos variables d’environnement, ce fichier a pour but de **recenser toutes les variables nécessaires au projet**.

👉 Dès qu’une nouvelle variable est ajoutée quelques part dans l'application, **quelle qu’en soit la raison**, il est impératif de la référencer ici.  
Cela évitera toute confusion ou oubli susceptible de hanter vos nuits de développement 🧛🏻‍♂️.

👉 Il permet également de garantir une **cohérence entre les services**, notamment lorsque plusieurs d’entre eux partagent les mêmes variables (ex. : ports, URLs, clés d’accès, etc.).

👉 En cas de doute, le README de chaque service contient également la liste des variables d’environnement (key/value) nécessaires à son fonctionnement — à condition qu’il soit bien à jour, bien sûr... 👨🏻‍🎨

Chaque env necessaire a chaque micro service est present dans un fichier env.txt, et le fichier .env est egalement poussé sur le repo donc devrait etre dispo dans tous les cas. 

[summary]: ../../../README.md
