#!/usr/bin/env bash
# Выкладка сервиса оплаты (server/) на HostKey: контейнер prompt-shop-pay в сети web,
# Caddy отдаёт ему всё под creative-ai.shop/api/*. Ключи берутся из .env.local.
# Файлы товаров лежат на сервере в /opt/prompt-shop/files/<slug>.<расширение>.
set -euo pipefail
cd "$(dirname "$0")/.."

SSH="ssh -i $HOME/.ssh/hostkey_ed25519 ubuntu@147.90.11.65"
[ -f .env.local ] || { echo "нет .env.local с ключами"; exit 1; }

# 1. код сервиса и каталог
tar -czf - server/Dockerfile server/package.json server/package-lock.json server/index.mjs data | $SSH 'set -e
  sudo mkdir -p /opt/prompt-shop/pay-src /opt/prompt-shop/files /opt/prompt-shop/state
  sudo rm -rf /opt/prompt-shop/pay-src/* && sudo tar -xzf - -C /opt/prompt-shop/pay-src'

# 2. ключи — только нужные строки, файл доступен лишь root
{ grep -E '^(YOOKASSA_|SMTP_|DOWNLOAD_SECRET|NOTIFY_EMAIL)' .env.local | tr -d '\r'; echo "SITE_URL=https://creative-ai.shop"; } \
  | $SSH 'sudo tee /opt/prompt-shop/pay.env >/dev/null && sudo chmod 600 /opt/prompt-shop/pay.env'

# 3. сборка и перезапуск контейнера
$SSH 'set -e
  cd /opt/prompt-shop/pay-src
  sudo docker build -q -t prompt-shop-pay -f server/Dockerfile . >/dev/null
  sudo docker rm -f prompt-shop-pay >/dev/null 2>&1 || true
  sudo docker run -d --name prompt-shop-pay --restart unless-stopped --network web \
    --env-file /opt/prompt-shop/pay.env \
    -v /opt/prompt-shop/files:/files:ro -v /opt/prompt-shop/state:/state \
    prompt-shop-pay >/dev/null
  sleep 2; sudo docker logs --tail 3 prompt-shop-pay'

# 4. Caddy: /api/* → сервис оплаты (один раз, с бэкапом и проверкой конфига)
$SSH 'set -e
  F=/opt/caddy/Caddyfile
  if ! sudo grep -q "prompt-shop-pay" $F; then
    sudo cp $F $F.bak-$(date +%Y%m%d-%H%M)
    sudo python3 - "$F" <<'"'"'PY'"'"'
import sys
p = sys.argv[1]; s = open(p, encoding="utf-8").read()
start = s.index("creative-ai.shop, www.creative-ai.shop {")
i = s.index("\thandle {", start)
s = s[:i] + "\t# оплата ЮKassa и скачивание материалов (scripts/deploy-pay.sh)\n\thandle /api/* {\n\t\treverse_proxy prompt-shop-pay:8787\n\t}\n\n" + s[i:]
open(p, "w", encoding="utf-8").write(s)
PY
    sudo docker exec caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
    sudo docker exec caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
    echo "Caddy: /api подключён"
  fi'

curl -fsS https://creative-ai.shop/api/health && echo " — сервис оплаты отвечает"
