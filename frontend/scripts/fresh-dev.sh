#!/usr/bin/env bash
# Ensures you are developing from the primary checkout, clears Next cache, restarts dev.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(cd "$ROOT/.." && pwd)"
PORT="${PORT:-3000}"

echo "==> Repo root: $REPO"
echo "==> Frontend:  $ROOT"

if [[ ! -f "$ROOT/package.json" ]]; then
  echo "error: run this from the frontend package (missing package.json)" >&2
  exit 1
fi

# Warn loudly if this checkout is a linked worktree other than the primary path.
PRIMARY="/home/goose/goose/projects/hassan/client"
ACTUAL="$(git -C "$REPO" rev-parse --show-toplevel)"
if [[ "$ACTUAL" != "$PRIMARY" ]]; then
  echo ""
  echo "WARNING: You are not in the primary checkout."
  echo "  primary: $PRIMARY"
  echo "  actual:  $ACTUAL"
  echo "Work done here will NOT show up in the usual localhost session until it is merged into primary main."
  echo ""
fi

echo "==> Git status"
git -C "$REPO" status -sb
git -C "$REPO" worktree list || true

# Stop anything already bound to the dev port (stale next-server is a common culprit).
if command -v fuser >/dev/null 2>&1; then
  fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
elif command -v lsof >/dev/null 2>&1; then
  PIDS="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN || true)"
  if [[ -n "${PIDS}" ]]; then
    kill ${PIDS} >/dev/null 2>&1 || true
    sleep 1
  fi
fi

echo "==> Clearing Next.js cache (.next)"
rm -rf "$ROOT/.next"

echo "==> Starting next dev on :${PORT}"
cd "$ROOT"
exec npm run dev -- --port "$PORT"
