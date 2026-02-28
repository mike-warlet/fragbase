#!/bin/bash
# FragBase Deploy Script
# Run this from your local machine (not VM) since the VM proxy blocks Cloudflare API
#
# Usage: cd backend && bash deploy.sh
#
# Prerequisites:
#   npm install -g wrangler
#   wrangler login

set -e

echo "========================================="
echo "  FragBase - Deploy Script"
echo "========================================="
echo ""

cd "$(dirname "$0")"

# Check wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Error: wrangler CLI not found. Install it with: npm install -g wrangler"
    exit 1
fi

echo "[1/3] Running D1 migrations..."
echo ""

# Run all migrations in order
MIGRATIONS=(
    "002-add-username.sql"
    "003-post-likes-and-comments.sql"
    "004-voting-tables.sql"
    "005-seed-perfumes.sql"
    "006-sotd.sql"
    "007-diary-fields.sql"
    "008-layering.sql"
    "009-challenges.sql"
    "010-seed-500-perfumes.sql"
    "011-discovery.sql"
    "012-gamification.sql"
    "013-push-tokens.sql"
    "014-perfume-accords-column.sql"
    "015-marketplace.sql"
    "016-barcode.sql"
    "017-statements-perfumers-recs.sql"
)

for migration in "${MIGRATIONS[@]}"; do
    if [ -f "migrations/$migration" ]; then
        echo "  Running migration: $migration"
        wrangler d1 execute fragbase --remote --file="migrations/$migration" 2>&1 || {
            echo "  Warning: Migration $migration may have already been applied (continuing...)"
        }
    else
        echo "  Skipping missing migration: $migration"
    fi
done

echo ""
echo "[2/3] Deploying Worker..."
echo ""

wrangler deploy

echo ""
echo "[3/3] Verifying deployment..."
echo ""

# Quick health check
WORKER_URL="https://fragbase-api.warlet-invest.workers.dev"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$WORKER_URL/api/status" 2>/dev/null || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "Worker is live and responding! Status: $HTTP_STATUS"
else
    echo "Warning: Worker health check returned status $HTTP_STATUS"
    echo "This might be normal if the worker is still propagating."
fi

echo ""
echo "========================================="
echo "  Deploy Complete!"
echo "========================================="
echo ""
echo "Worker URL: $WORKER_URL"
echo ""
echo "To set JWT_SECRET (if not already set):"
echo "  wrangler secret put JWT_SECRET"
echo ""
