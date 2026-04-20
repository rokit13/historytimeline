#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" != "marketing" && "${1:-}" != "app" ]]; then
  echo "Usage: $0 <marketing|app>" >&2
  exit 1
fi

TARGET="$1"
ROOT_DIR="${ROOT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
TARGET_DIR="$ROOT_DIR/apps/$TARGET"

cd "$TARGET_DIR"

npm ci
npm run build

if [[ -n "${NEXT_SERVICE_NAME:-}" ]]; then
  sudo systemctl restart "$NEXT_SERVICE_NAME"
fi
