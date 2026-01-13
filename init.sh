#!/bin/bash

# TOC React → Next.js 14 Initialization Script
# Based on TOC_PROJECT_GUIDE.md

set -e

echo "======================================"
echo "TOC React → Next.js 14 Conversion Init"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "TOC_PROJECT_GUIDE.md" ]; then
    echo -e "${RED}Error: TOC_PROJECT_GUIDE.md not found. Are you in the correct directory?${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Analyzing existing React structure${NC}"
echo "Current project structure:"
echo "  - Components: $(find src/components -type f 2>/dev/null | wc -l | tr -d ' ') files"
echo "  - Pages: $(find src/pages -type f 2>/dev/null | wc -l | tr -d ' ') files"
echo "  - Config: $(find src/config -type f 2>/dev/null | wc -l | tr -d ' ') files"
echo ""

# Backup existing project
echo -e "${BLUE}Step 2: Creating backup of React project${NC}"
BACKUP_DIR="../toc-react-backup-$(date +%Y%m%d-%H%M%S)"
echo "Creating backup at: $BACKUP_DIR"
read -p "Continue with backup? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cp -r . "$BACKUP_DIR"
    echo -e "${GREEN}✓ Backup created successfully${NC}"
else
    echo -e "${YELLOW}⚠ Skipping backup (not recommended)${NC}"
fi
echo ""

# Install Next.js dependencies
echo -e "${BLUE}Step 3: Installing Next.js 14 and dependencies${NC}"
echo "This will install:"
echo "  - Next.js 14 (App Router)"
echo "  - @supabase/supabase-js"
echo "  - @supabase/ssr"
echo "  - lucide-react (icons)"
echo "  - sharp (image optimization)"
echo ""
read -p "Install dependencies now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm install next@latest react@latest react-dom@latest
    npm install @supabase/supabase-js @supabase/ssr
    npm install lucide-react
    npm install sharp
    npm install -D @types/node
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Skipping dependency installation${NC}"
    echo "  Run manually: npm install next@latest react@latest react-dom@latest @supabase/supabase-js @supabase/ssr lucide-react sharp"
fi
echo ""

# Create Next.js directory structure
echo -e "${BLUE}Step 4: Creating Next.js directory structure${NC}"
read -p "Create Next.js app structure? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    mkdir -p app
    mkdir -p app/api
    mkdir -p app/products
    mkdir -p app/categories
    mkdir -p app/brands
    mkdir -p app/rooms
    mkdir -p app/quote
    mkdir -p components/products
    mkdir -p components/layout
    mkdir -p components/ui
    mkdir -p lib/supabase
    mkdir -p types
    mkdir -p public/fonts

    echo -e "${GREEN}✓ Directory structure created${NC}"
    echo "Created:"
    echo "  /app - Next.js 14 App Router pages"
    echo "  /components - React components (organized by feature)"
    echo "  /lib/supabase - Supabase client utilities"
    echo "  /types - TypeScript type definitions"
else
    echo -e "${YELLOW}⚠ Skipping directory creation${NC}"
fi
echo ""

# Environment variables
echo -e "${BLUE}Step 5: Setting up environment variables${NC}"
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local from template..."
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        echo -e "${GREEN}✓ .env.local created from template${NC}"
        echo -e "${YELLOW}⚠ ACTION REQUIRED: Edit .env.local with your Supabase credentials${NC}"
    else
        echo -e "${YELLOW}⚠ .env.local.example not found${NC}"
    fi
else
    echo ".env.local already exists"
fi
echo ""

# Copy Supabase utilities from toc-crm
echo -e "${BLUE}Step 6: Copy Supabase utilities from toc-crm${NC}"
TOC_CRM_PATH="/Users/brunocukic/toc-crm"
if [ -d "$TOC_CRM_PATH" ]; then
    echo "Found toc-crm at: $TOC_CRM_PATH"
    read -p "Copy Supabase utilities from toc-crm? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Copy Supabase client files
        if [ -f "$TOC_CRM_PATH/lib/supabase/client.ts" ]; then
            cp "$TOC_CRM_PATH/lib/supabase/client.ts" lib/supabase/ 2>/dev/null || echo "  Note: Adjust path if needed"
            echo "  ✓ Copied client.ts"
        fi
        if [ -f "$TOC_CRM_PATH/lib/supabase/server.ts" ]; then
            cp "$TOC_CRM_PATH/lib/supabase/server.ts" lib/supabase/ 2>/dev/null || echo "  Note: Adjust path if needed"
            echo "  ✓ Copied server.ts"
        fi
        # Copy database types
        if [ -f "$TOC_CRM_PATH/types/database.types.ts" ]; then
            cp "$TOC_CRM_PATH/types/database.types.ts" types/ 2>/dev/null || echo "  Note: Adjust path if needed"
            echo "  ✓ Copied database.types.ts"
        fi
        # Copy environment variables as reference
        if [ -f "$TOC_CRM_PATH/.env.local" ]; then
            echo ""
            echo -e "${YELLOW}Reference: toc-crm .env.local (copy these values to your .env.local)${NC}"
            echo "---"
            grep "SUPABASE" "$TOC_CRM_PATH/.env.local" || echo "No SUPABASE variables found"
            echo "---"
        fi
        echo -e "${GREEN}✓ Supabase utilities copied${NC}"
    else
        echo -e "${YELLOW}⚠ Skipping Supabase utilities copy${NC}"
        echo "  Copy manually from: $TOC_CRM_PATH/lib/supabase/"
    fi
else
    echo -e "${YELLOW}⚠ toc-crm not found at: $TOC_CRM_PATH${NC}"
    echo "  Update TOC_CRM_PATH in this script or copy files manually"
fi
echo ""

# Update package.json scripts
echo -e "${BLUE}Step 7: Updating package.json scripts${NC}"
echo "Current scripts will be updated for Next.js"
read -p "Update scripts? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create backup of package.json
    cp package.json package.json.backup
    echo -e "${GREEN}✓ package.json backed up to package.json.backup${NC}"
    echo ""
    echo -e "${YELLOW}ACTION REQUIRED: Manually update package.json scripts to:${NC}"
    echo ""
    echo '  "scripts": {'
    echo '    "dev": "next dev",'
    echo '    "build": "next build",'
    echo '    "start": "next start",'
    echo '    "lint": "next lint"'
    echo '  }'
    echo ""
fi
echo ""

# Summary
echo -e "${GREEN}======================================"
echo "Initialization Complete!"
echo "======================================${NC}"
echo ""
echo -e "${YELLOW}NEXT STEPS:${NC}"
echo ""
echo "1. Review INIT_CHECKLIST.md for detailed conversion steps"
echo ""
echo "2. Configure environment variables:"
echo "   - Edit .env.local with your Supabase credentials"
echo "   - Copy from toc-crm/.env.local"
echo ""
echo "3. Update package.json scripts (if not done):"
echo '   - "dev": "next dev"'
echo '   - "build": "next build"'
echo '   - "start": "next start"'
echo ""
echo "4. Start analyzing existing components:"
echo "   - Review src/components/ structure"
echo "   - Note which components can be Server Components"
echo "   - Identify Client Components ('use client')"
echo ""
echo "5. Begin Phase 1 migration:"
echo "   - Create app/layout.tsx (root layout)"
echo "   - Create app/page.tsx (homepage)"
echo "   - Migrate styles and preserve design"
echo ""
echo "6. Test the setup:"
echo "   - Run: npm run dev"
echo "   - Visit: http://localhost:3000"
echo ""
echo -e "${BLUE}Reference: TOC_PROJECT_GUIDE.md for complete instructions${NC}"
echo ""
echo -e "${GREEN}Good luck with the conversion!${NC}"
echo ""
