#!/bin/bash

# Détection du flag
PLATFORM=""
if [[ "$1" == "-arm64" ]]; then
  PLATFORM="--platform linux/amd64"
  echo "📦 Utilisation de la plateforme: linux/amd64"
fi

# Liste des images à puller
IMAGES=(
  "cansefr/auth-service"
  "cansefr/front-app"
  "cansefr/product-service"
  "cansefr/facturation-service"
  "cansefr/config-service"
  "cansefr/api-gateway"
)

echo "🔄 Pull des images Docker depuis Docker Hub..."

for IMAGE in "${IMAGES[@]}"
do
  echo "➡️  Pulling $IMAGE:latest $PLATFORM"
  docker pull $PLATFORM "$IMAGE:latest"
done

echo "✅ Tous les pulls sont terminés !"
