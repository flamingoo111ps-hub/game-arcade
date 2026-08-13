#!/bin/bash
# Game Arcade Setup and Run Script

echo "🎮 Game Arcade Setup"
echo "==================="

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.7 or later."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔗 Activating virtual environment..."
source venv/bin/activate || . venv/Scripts/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the game server, run:"
echo "  python app.py"
echo ""
echo "Then open http://127.0.0.1:5000 in your browser"
