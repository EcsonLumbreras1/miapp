set -euo pipefail
cd /srv/apps/miapp
echo "[1/3] Construyendo imagen..."
docker compose build
echo "[2/3] Levantando contenedores..."
docker compose up -d
echo "[3/3] Estado:"
docker ps
echo "OK. Prueba: curl -I http://localhost:3000"
