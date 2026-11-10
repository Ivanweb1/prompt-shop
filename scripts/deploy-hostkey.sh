#!/usr/bin/env bash
# Сборка магазина для своего домена и выкладка на HostKey (Caddy раздаёт /opt/prompt-shop/site)
set -euo pipefail
cd "$(dirname "$0")/.."

SSH="ssh -i $HOME/.ssh/hostkey_ed25519 ubuntu@147.90.11.65"

SITE_BASE_PATH="" npm run build

# заливаем в site.new и подменяем папку целиком, чтобы сайт не был наполовину обновлён
tar -C out -czf - . | $SSH 'set -e
  sudo mkdir -p /opt/prompt-shop
  sudo rm -rf /opt/prompt-shop/site.new && sudo mkdir /opt/prompt-shop/site.new
  sudo tar -xzf - -C /opt/prompt-shop/site.new
  sudo rm -rf /opt/prompt-shop/site.old
  [ -d /opt/prompt-shop/site ] && sudo mv /opt/prompt-shop/site /opt/prompt-shop/site.old
  sudo mv /opt/prompt-shop/site.new /opt/prompt-shop/site
  echo "выложено: $(sudo find /opt/prompt-shop/site -type f | wc -l) файлов"'

# локальная сборка снова под GitHub Pages не нужна — out/ в .gitignore
