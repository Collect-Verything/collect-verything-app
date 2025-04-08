← [Retourner au sommaire] [summary]

# Run:

Pour lancer l'application apres un git clone, effectuer la commande suivante :

```zsh
docker compose up
```
L'application étant un projet d'étude, tous les fichiers .env et de configuration spécifiques sont inclus dans le dépôt. Ainsi, lors du git clone, tous les fichiers nécessaires au lancement de l'application sont déjà présents.


# Logs

Actuellement, lorsqu'on lance la commande docker compose up, tous les logs générés depuis le démarrage sont progressivement effacés du terminal. Cela peut être contraignant si l'on souhaite inspecter les erreurs survenues pendant le lancement des conteneurs.

### 🛠️ Solution :

Pour conserver tous les logs de lancement dans un fichier (et ainsi pouvoir les analyser plus facilement), il suffit d'exécuter la commande suivante :

```zsh
docker compose up 2>&1 | tee logs-start-container.txt            
```

### 📂 Cette commande va :

- Rediriger la sortie standard (> logs.txt) et la sortie d’erreur (2>&1) vers le fichier logs.txt ;

- Permettre de relire tous les logs du démarrage à tout moment, même après leur disparition dans le terminal.

### 💡 Astuce :
Tu peux également suivre les logs en direct dans un autre terminal avec :

```zsh
tail -f logs.txt
```

# Issue

## ARM64 Alert

```
docker pull --platform linux/amd64 cansefr/....
```


[summary]: ../README.md
