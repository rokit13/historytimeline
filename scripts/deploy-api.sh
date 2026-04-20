#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${ROOT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
API_DIR="${API_DIR:-$ROOT_DIR/apps/api}"
PHP_BIN="${PHP_BIN:-php}"
COMPOSER_BIN="${COMPOSER_BIN:-composer}"

cd "$API_DIR"

"$COMPOSER_BIN" install --no-dev --optimize-autoloader
"$PHP_BIN" artisan optimize:clear
"$PHP_BIN" artisan config:cache
"$PHP_BIN" artisan route:cache
"$PHP_BIN" artisan migrate --force

if [[ -n "${API_SERVICE_NAME:-}" ]]; then
  sudo systemctl restart "$API_SERVICE_NAME"
fi
