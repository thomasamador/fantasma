#!/usr/bin/env bash
set -euo pipefail

# Load nvm
export NVM_DIR="$HOME/.nvm"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 22

GHOST_DIR="$HOME/ghost-local"

# Start Ghost if not running
if curl -s http://localhost:2368 -o /dev/null 2>&1; then
    echo "Ghost already running at http://localhost:2368"
else
    echo "Starting Ghost..."
    (cd "$GHOST_DIR" && ghost start)
fi

# Open browser
open http://localhost:2368

echo "Starting theme watch mode..."
pnpm dev
