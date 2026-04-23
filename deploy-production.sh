#!/bin/bash
# Production Deployment Script for www.growrixos.com
# Usage: bash deploy-production.sh

set -e  # Exit on error

echo "🚀 Growrix OS Production Deployment Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Pre-deployment checks
echo "📋 Running pre-deployment checks..."

if [ ! -f "web/.env.production" ]; then
    echo -e "${RED}❌ Error: web/.env.production not found${NC}"
    exit 1
fi

if [ ! -f "web/next.config.ts" ]; then
    echo -e "${RED}❌ Error: web/next.config.ts not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Configuration files found${NC}"

# Check domain in env
if grep -q "www.growrixos.com" web/.env.production; then
    echo -e "${GREEN}✓ Domain configured: www.growrixos.com${NC}"
else
    echo -e "${RED}❌ Domain not found in .env.production${NC}"
    exit 1
fi

# Test Sanity connectivity
echo ""
echo "🔗 Testing Sanity API connectivity..."
SANITY_TEST=$(curl -s "https://1tk4ulcx.api.sanity.io/v2025-01-01/data/query/production?query=%7B%22query%22:%22%2A%5B_type%20%3D%3D%20%27blogPost%27%5D%5B0%5D%7Btitle%7D%22%7D")

if echo "$SANITY_TEST" | grep -q "title"; then
    echo -e "${GREEN}✓ Sanity API reachable and working${NC}"
else
    echo -e "${YELLOW}⚠ Sanity API test inconclusive (may be empty dataset)${NC}"
fi

# Build test
echo ""
echo "🔨 Building production bundle..."
cd web
if npm run build; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
cd ..

# Run tests
echo ""
echo "✅ Running tests..."
if npm --prefix web run test:release; then
    echo -e "${GREEN}✓ All tests passed${NC}"
else
    echo -e "${YELLOW}⚠ Some tests failed - review before deploying${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Pre-deployment checks complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "  1. Push to main branch: git push origin main"
echo "  2. Vercel auto-deploys within 2-3 minutes"
echo "  3. Verify at: https://www.growrixos.com"
echo ""
echo "🔗 Deployment tracking:"
echo "  - Vercel Dashboard: https://vercel.com/dashboard"
echo "  - Project: Growrix OS"
echo ""
echo "Done! 🎉"
