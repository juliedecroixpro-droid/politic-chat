#!/bin/bash

echo "🛑 Stopping PoliticChat services..."
echo ""

if [ -f ".pids" ]; then
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo "Stopping process $pid..."
            kill $pid 2>/dev/null
        fi
    done < .pids
    rm .pids
    echo "✓ All services stopped"
else
    echo "No PIDs file found. Killing by port..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    lsof -ti:5173 | xargs kill -9 2>/dev/null
    lsof -ti:5174 | xargs kill -9 2>/dev/null
    echo "✓ Ports cleared"
fi

echo ""
