@echo off
REM Game Arcade Setup and Run Script for Windows

echo 🎮 Game Arcade Setup
echo ===================

REM Check Python installation
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.7 or later.
    pause
    exit /b 1
)

echo ✅ Python found: 
python --version

REM Check if venv exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔗 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

echo.
echo ✨ Setup complete!
echo.
echo To start the game server, run:
echo   python app.py
echo.
echo Then open http://127.0.0.1:5000 in your browser
echo.
pause
