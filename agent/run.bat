@echo off
title Medical AI Agent
cls
echo ============================================================
echo Medical AI Agent - Google Gemini Realtime
echo ============================================================
echo.

REM Check if venv exists
if not exist "venv\" (
    echo ❌ Virtual environment not found!
    echo.
    echo Please run install.bat first
    echo.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.

REM Check .env file in project root
if not exist "..\.env" (
    echo ⚠️  Warning: .env file not found in project root
    echo.
    echo Make sure you have .env file at: D:\project\telemedicine\telemedicine\.env
    echo.
    echo With these variables:
    echo   LIVEKIT_URL=wss://...
    echo   LIVEKIT_API_KEY=...
    echo   LIVEKIT_API_SECRET=...
    echo   GOOGLE_API_KEY=...
    echo.
    pause
)

echo ============================================================
echo Starting Agent...
echo ============================================================
echo.
echo Agent Name: medical-assistant
echo Model: Google Gemini 2.0 Flash
echo Voice: Puck
echo.
echo Waiting for patients to join rooms...
echo.

REM Run the agent
python agent.py start

pause

