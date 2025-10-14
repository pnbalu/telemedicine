MEDICAL AI AGENT - SETUP GUIDE
==============================

QUICK START:
-----------
1. Double-click: install.bat
2. Create .env file in project root (see .env.example)
3. Double-click: run.bat

THAT'S IT!


DETAILED STEPS:
---------------

STEP 1: Install Dependencies
  → Double-click: install.bat
  
  This will:
  - Create Python virtual environment
  - Install livekit-agents
  - Install Google plugins
  - Install dependencies

STEP 2: Configure Environment
  Create .env file in PROJECT ROOT (not in agent folder!)
  
  Location: D:\project\telemedicine\telemedicine\.env
  
  Contents:
    LIVEKIT_URL=wss://your-project.livekit.cloud
    LIVEKIT_API_KEY=your-key
    LIVEKIT_API_SECRET=your-secret
    GOOGLE_API_KEY=your-google-key

STEP 3: Run Agent
  → Double-click: run.bat
  
  You should see:
    🚀 Starting Medical AI Agent
    Agent Name: medical-assistant
    [Waiting for patients...]

STEP 4: Test
  Frontend: http://localhost:5173/ai-agent-consultation
  
  When patient joins, agent terminal shows:
    🤖 Agent Name: Medical AI Assistant
    🏠 Connected Room: voice_assistant_room_1234
    ✅ Session started
    🗣️ Greeting sent to patient!


FILES:
------
agent.py          - Main agent code
instructions.py   - AI instructions/prompts
requirements.txt  - Python dependencies
install.bat       - Installation script
run.bat          - Run agent script
.env.example     - Environment template


TROUBLESHOOTING:
---------------
Agent won't start?
  → Run install.bat first

Can't find .env?
  → Make sure .env is in PROJECT ROOT
  → Not in agent/ folder!

Agent not joining rooms?
  → Check LIVEKIT credentials in .env
  → Make sure token server is running

No audio?
  → Check GOOGLE_API_KEY in .env
  → Check internet connection


CUSTOMIZATION:
-------------
Edit instructions.py to change:
- Agent personality
- Conversation flow
- Questions to ask
- Voice tone

