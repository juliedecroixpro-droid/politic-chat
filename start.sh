#!/bin/bash

echo "🚀 PoliticChat - Starting Services"
echo "=================================="
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env not found!"
    echo "Please run ./install.sh first and configure your API keys."
    exit 1
fi

# Check if API keys are set
if grep -q "your_anthropic_api_key_here" backend/.env || grep -q "your_openai_api_key_here" backend/.env; then
    echo "❌ Error: API keys not configured!"
    echo "Please edit backend/.env and add your actual API keys."
    exit 1
fi

# Create necessary directories
mkdir -p backend/uploads
mkdir -p backend/chroma_db

# Kill existing processes on our ports (optional, uncomment if needed)
# lsof -ti:8000 | xargs kill -9 2>/dev/null
# lsof -ti:5173 | xargs kill -9 2>/dev/null
# lsof -ti:5174 | xargs kill -9 2>/dev/null

echo "Starting backend (FastAPI on port 8000)..."
cd backend
source venv/bin/activate
python main.py > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✓ Backend started (PID: $BACKEND_PID)"
cd ..

# Wait for backend to be ready
echo "Waiting for backend to initialize..."
sleep 3

echo ""
echo "Starting admin portal (React on port 5173)..."
cd frontend-admin
npm run dev > ../admin.log 2>&1 &
ADMIN_PID=$!
echo "✓ Admin portal started (PID: $ADMIN_PID)"
cd ..

echo ""
echo "Starting public chat (React on port 5174)..."
cd frontend-public
npm run dev > ../public.log 2>&1 &
PUBLIC_PID=$!
echo "✓ Public chat started (PID: $PUBLIC_PID)"
cd ..

# Save PIDs for cleanup
echo "$BACKEND_PID" > .pids
echo "$ADMIN_PID" >> .pids
echo "$PUBLIC_PID" >> .pids

echo ""
echo "✅ All services started!"
echo ""
echo "Access the applications:"
echo "  📊 Admin Portal: http://localhost:5173"
echo "  💬 Public Chat:  http://localhost:5174/chat/[candidate-slug]"
echo "  🔧 API Docs:     http://localhost:8000/docs"
echo ""
echo "Logs:"
echo "  Backend:      tail -f backend.log"
echo "  Admin Portal: tail -f admin.log"
echo "  Public Chat:  tail -f public.log"
echo ""
echo "To stop all services, run: ./stop.sh"
echo ""
