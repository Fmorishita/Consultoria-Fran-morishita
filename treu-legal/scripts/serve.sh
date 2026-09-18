#!/bin/bash
# Arranca o reinicia el servidor de producción local en el puerto indicado.
PORT="${1:-3100}"
# Libera el puerto sin usar patrones que puedan coincidir con otros procesos.
fuser -k "${PORT}/tcp" 2>/dev/null
sleep 1
cd "$(dirname "$0")/.." || exit 1
nohup npx next start -p "$PORT" > /tmp/treu-next-$PORT.log 2>&1 &
for i in $(seq 1 40); do
  curl -sS -o /dev/null -m 2 "http://127.0.0.1:$PORT/" 2>/dev/null && { echo "servidor listo en :$PORT"; exit 0; }
  sleep 0.5
done
echo "el servidor no respondió"; tail -5 "/tmp/treu-next-$PORT.log"; exit 1
