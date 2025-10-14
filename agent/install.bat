@echo off
title Install Medical AI Agent
cls
echo ============================================================
echo Installing Medical AI Agent Dependencies
echo ============================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found!
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo ✅ Python found
echo.

REM Create virtual environment if it doesn't exist
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo ✅ Virtual environment created
) else (
    echo ✅ Virtual environment already exists
)
echo.

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip
echo.

REM Install dependencies
echo Installing LiveKit Agent dependencies...
pip install -r requirements.txt
echo.

echo ============================================================
echo ✅ Installation Complete!
echo ============================================================
echo.
echo Next steps:
echo 1. Create .env file in project root with:
echo    LIVEKIT_URL=wss://your-project.livekit.cloud
echo    LIVEKIT_API_KEY=your-key
echo    LIVEKIT_API_SECRET=your-secret
echo    GOOGLE_API_KEY=your-google-key
echo.
echo 2. Run: run.bat
echo.
pause

