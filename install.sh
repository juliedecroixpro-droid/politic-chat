#!/bin/bash

echo "🚀 PoliticChat - Installation Script"
echo "===================================="
echo ""

# Check Python version
echo "📦 Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | grep -oP '\d+\.\d+')
echo "✓ Found Python $PYTHON_VERSION"

# Check Node.js version
echo ""
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✓ Found Node.js $NODE_VERSION"

# Setup backend
echo ""
echo "🔧 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo "✓ Backend setup complete"
cd ..

# Setup frontend-admin
echo ""
echo "🔧 Setting up admin portal..."
cd frontend-admin
npm install --silent
echo "✓ Admin portal setup complete"
cd ..

# Setup frontend-public
echo ""
echo "🔧 Setting up public chat interface..."
cd frontend-public
npm install --silent
echo "✓ Public chat setup complete"
cd ..

# Check for .env file
echo ""
if [ ! -f "backend/.env" ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from template..."
    cp .env.example backend/.env
    echo ""
    echo "⚠️  IMPORTANT: Edit backend/.env and add your API keys:"
    echo "   - ANTHROPIC_API_KEY"
    echo "   - OPENAI_API_KEY"
    echo ""
else
    echo "✓ .env file found"
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env and add your API keys"
echo "2. Run ./start.sh to start all services"
echo ""
