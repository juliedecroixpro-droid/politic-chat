#!/bin/bash

# ÉluIA Production Deployment Verification Script
# Run this before deploying to check everything is ready

echo ""
echo "🔍 ÉluIA Deployment Verification"
echo "================================"
echo ""

ERRORS=0
WARNINGS=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Check if file exists
check_file() {
    if [ -f "$1" ]; then
        success "$1 exists"
    else
        error "$1 not found"
    fi
}

# Validate JSON file
check_json() {
    if [ -f "$1" ]; then
        if python3 -m json.tool "$1" > /dev/null 2>&1; then
            success "$1 is valid JSON"
        else
            error "$1 is invalid JSON"
        fi
    else
        error "$1 not found"
    fi
}

# Check for localhost URLs in file
check_localhost() {
    if grep -q "localhost" "$1" 2>/dev/null; then
        warning "$1 contains 'localhost' - should be updated for production"
    fi
}

echo "📋 Configuration Files"
echo "----------------------"

# Backend files
check_file "backend/railway.json"
check_json "backend/railway.json"
check_file "backend/Procfile"
check_file "backend/runtime.txt"
check_file "backend/requirements.txt"
check_file "backend/.railwayignore"
check_file "backend/.env.production"
check_file "backend/alembic.ini"
check_file "backend/alembic/env.py"

echo ""
echo "🌐 Frontend Landing"
echo "-------------------"
check_file "frontend-landing/vercel.json"
check_json "frontend-landing/vercel.json"
check_file "frontend-landing/.vercelignore"
check_file "frontend-landing/.env.production"

echo ""
echo "⚙️  Frontend Admin"
echo "------------------"
check_file "frontend-admin/vercel.json"
check_json "frontend-admin/vercel.json"
check_file "frontend-admin/.vercelignore"
check_file "frontend-admin/.env.production"

echo ""
echo "💬 Frontend Public"
echo "------------------"
check_file "frontend-public/vercel.json"
check_json "frontend-public/vercel.json"
check_file "frontend-public/.vercelignore"
check_file "frontend-public/.env.production"

echo ""
echo "📚 Documentation"
echo "----------------"
check_file "DEPLOYMENT.md"
check_file "ENV_SETUP.md"
check_file "SECURITY.md"
check_file "PRODUCTION_CHECKLIST.md"
check_file "DEPLOYMENT_SUMMARY.md"

echo ""
echo "🔧 Scripts"
echo "----------"
check_file "deploy.sh"
if [ -x "deploy.sh" ]; then
    success "deploy.sh is executable"
else
    warning "deploy.sh is not executable (run: chmod +x deploy.sh)"
fi

echo ""
echo "🔍 Code Quality Checks"
echo "----------------------"

# Check for hardcoded localhost in production code
if grep -r "localhost:8000" frontend-landing/src --include="*.jsx" --include="*.js" | grep -v "import.meta.env" > /dev/null; then
    warning "Found hardcoded localhost:8000 in frontend-landing/src (should use VITE_API_URL)"
else
    success "No hardcoded localhost URLs in frontend-landing"
fi

if grep -r "localhost:5173" frontend-landing/src --include="*.jsx" --include="*.js" | grep -v "import.meta.env" > /dev/null; then
    warning "Found hardcoded localhost:5173 in frontend-landing/src (should use VITE_ADMIN_URL)"
else
    success "No hardcoded localhost URLs for admin in frontend-landing"
fi

# Check if default SECRET_KEY is still in config
if grep -q "change-this-to-a-random-secret-key-in-production" backend/config.py; then
    warning "Default SECRET_KEY found in backend/config.py - will need to be overridden in Railway"
else
    success "No default SECRET_KEY in config.py"
fi

# Check CORS configuration
if grep -q "get_cors_origins" backend/config.py; then
    success "CORS configuration updated to support JSON array"
else
    warning "CORS configuration may need updating"
fi

echo ""
echo "🔒 Security Checks"
echo "------------------"

# Check if .env files are gitignored
if grep -q ".env" .gitignore 2>/dev/null; then
    success ".env files are in .gitignore"
else
    warning ".env files may not be in .gitignore"
fi

# Check if there are any API keys in Git history (basic check)
if git log --all --pretty=format: -S "sk-ant-" | head -1 | grep -q "sk-ant-"; then
    error "Possible API key found in Git history! Review with: git log -p | grep sk-ant"
else
    success "No obvious API keys in Git history"
fi

echo ""
echo "📦 Dependencies"
echo "---------------"

# Check if Railway CLI is installed
if command -v railway &> /dev/null; then
    success "Railway CLI is installed"
else
    warning "Railway CLI not installed (run: npm install -g @railway/cli)"
fi

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    success "Vercel CLI is installed"
else
    warning "Vercel CLI not installed (run: npm install -g vercel)"
fi

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    success "Node.js $NODE_VERSION is installed"
else
    error "Node.js not installed"
fi

# Check if Python is installed
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    success "$PYTHON_VERSION is installed"
else
    error "Python 3 not installed"
fi

echo ""
echo "================================"
echo ""

# Summary
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready for deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review DEPLOYMENT.md"
    echo "  2. Run: ./deploy.sh"
    echo "  3. Follow PRODUCTION_CHECKLIST.md"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found. Review before deploying.${NC}"
    echo ""
    echo "You can proceed, but address warnings first if possible."
    exit 0
else
    echo -e "${RED}❌ $ERRORS error(s) and $WARNINGS warning(s) found.${NC}"
    echo ""
    echo "Fix errors before deploying!"
    exit 1
fi
