#!/bin/bash

set -e  # Exit on error

echo ""
echo "🚀 ÉluIA Production Deployment"
echo "================================"
echo ""

# Check if required CLIs are installed
check_cli() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Installing..."
        return 1
    else
        echo "✅ $1 is installed"
        return 0
    fi
}

# Step 1: Check prerequisites
echo "📋 Step 1/5: Checking prerequisites..."
echo ""

if ! check_cli "npm"; then
    echo "Please install Node.js and npm first."
    exit 1
fi

if ! check_cli "vercel"; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

if ! check_cli "railway"; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo ""
echo "================================"
echo ""

# Step 2: Backend deployment (Railway)
echo "🔧 Step 2/5: Deploying Backend to Railway..."
echo ""

cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  Warning: No .env file found in backend/"
    echo "Please ensure Railway environment variables are configured:"
    echo "  - ANTHROPIC_API_KEY"
    echo "  - SECRET_KEY"
    echo "  - DATABASE_URL (auto-provided by Railway)"
    echo "  - CORS_ORIGINS"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "Logging into Railway..."
railway login

echo "Deploying to Railway..."
railway up

echo "✅ Backend deployed to Railway"
echo ""

# Get Railway URL
RAILWAY_URL=$(railway status --json 2>/dev/null | grep -o '"url":"[^"]*"' | cut -d'"' -f4 || echo "")
if [ -z "$RAILWAY_URL" ]; then
    echo "⚠️  Could not auto-detect Railway URL. Please update vercel.json files manually."
    read -p "Enter your Railway backend URL (e.g., https://eluia-api.railway.app): " RAILWAY_URL
fi

echo "Railway URL: $RAILWAY_URL"
echo ""

cd ..

# Update Vercel configurations with Railway URL
echo "Updating Vercel configurations with Railway URL..."
for dir in frontend-admin frontend-public; do
    if [ -f "$dir/vercel.json" ]; then
        # Update the destination URL in vercel.json
        sed -i.bak "s|https://eluia-api.railway.app|$RAILWAY_URL|g" "$dir/vercel.json"
        rm -f "$dir/vercel.json.bak"
    fi
done

echo ""
echo "================================"
echo ""

# Step 3: Frontend Landing deployment
echo "🌐 Step 3/5: Deploying Frontend Landing to Vercel..."
echo ""

cd frontend-landing

echo "Logging into Vercel..."
vercel login

echo "Deploying to production..."
vercel --prod

LANDING_URL=$(vercel --prod 2>&1 | grep -o 'https://[^[:space:]]*' | tail -1 || echo "")
echo "✅ Frontend Landing deployed"
if [ ! -z "$LANDING_URL" ]; then
    echo "   URL: $LANDING_URL"
fi
echo ""

cd ..

echo "================================"
echo ""

# Step 4: Frontend Admin deployment
echo "⚙️  Step 4/5: Deploying Frontend Admin to Vercel..."
echo ""

cd frontend-admin

echo "Deploying to production..."
vercel --prod

ADMIN_URL=$(vercel --prod 2>&1 | grep -o 'https://[^[:space:]]*' | tail -1 || echo "")
echo "✅ Frontend Admin deployed"
if [ ! -z "$ADMIN_URL" ]; then
    echo "   URL: $ADMIN_URL"
fi
echo ""

cd ..

echo "================================"
echo ""

# Step 5: Frontend Public Chat deployment
echo "💬 Step 5/5: Deploying Frontend Public Chat to Vercel..."
echo ""

cd frontend-public

echo "Deploying to production..."
vercel --prod

PUBLIC_URL=$(vercel --prod 2>&1 | grep -o 'https://[^[:space:]]*' | tail -1 || echo "")
echo "✅ Frontend Public Chat deployed"
if [ ! -z "$PUBLIC_URL" ]; then
    echo "   URL: $PUBLIC_URL"
fi
echo ""

cd ..

echo "================================"
echo ""
echo "🎉 Deployment Complete!"
echo "================================"
echo ""
echo "📊 Deployment Summary:"
echo "  Backend (API):    $RAILWAY_URL"
echo "  Landing Page:     $LANDING_URL"
echo "  Admin Dashboard:  $ADMIN_URL"
echo "  Public Chat:      $PUBLIC_URL"
echo ""
echo "⚠️  Next Steps:"
echo "1. Update CORS_ORIGINS in Railway environment variables:"
echo "   railway variables --set CORS_ORIGINS='[\"$LANDING_URL\",\"$ADMIN_URL\",\"$PUBLIC_URL\"]'"
echo ""
echo "2. Verify environment variables in Vercel dashboard"
echo ""
echo "3. Test all deployments:"
echo "   - Landing page registration flow"
echo "   - Admin dashboard login"
echo "   - Public chat functionality"
echo ""
echo "4. Set up custom domains (optional):"
echo "   - vercel domains add <your-domain> --project <project-name>"
echo ""
echo "📚 Full documentation: See DEPLOYMENT.md"
echo ""
