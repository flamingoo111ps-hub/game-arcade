#!/usr/bin/env python3
"""
Game Arcade - Development Server Launcher
Quick setup and run for Game Arcade
"""

import os
import sys
import subprocess
import platform

def print_header():
    print("\n" + "="*50)
    print("  🎮 GAME ARCADE - Quick Setup")
    print("="*50 + "\n")

def check_python():
    """Check Python version"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 7):
        print("❌ Python 3.7+ is required")
        print(f"   Your version: {version.major}.{version.minor}")
        sys.exit(1)
    print(f"✅ Python {version.major}.{version.minor} found")

def create_venv():
    """Create virtual environment if it doesn't exist"""
    if not os.path.exists('venv'):
        print("📦 Creating virtual environment...")
        subprocess.run([sys.executable, '-m', 'venv', 'venv'], check=True)
        print("✅ Virtual environment created")
    else:
        print("✅ Virtual environment already exists")

def get_pip():
    """Get pip path"""
    if platform.system() == 'Windows':
        return os.path.join('venv', 'Scripts', 'pip')
    return os.path.join('venv', 'bin', 'pip')

def install_requirements():
    """Install required packages"""
    print("📥 Installing dependencies...")
    pip = get_pip()
    subprocess.run([pip, 'install', '-r', 'requirements.txt'], check=True)
    print("✅ Dependencies installed")

def get_python():
    """Get Python executable path"""
    if platform.system() == 'Windows':
        return os.path.join('venv', 'Scripts', 'python')
    return os.path.join('venv', 'bin', 'python')

def start_server():
    """Start Flask server"""
    print("\n✨ Starting Game Arcade Server...\n")
    python = get_python()
    os.execvp(python, [python, 'app.py'])

def main():
    print_header()
    
    try:
        check_python()
        create_venv()
        install_requirements()
        start_server()
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
