# Frontend Setup Guide

## 🚀 Quick Start

### Windows Users:
Simply **double-click** on `START_FRONTEND.bat` in the root directory!

OR run from the `frontend` folder:
```cmd
start-frontend.bat
```

### Manual Start:
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Access the Frontend

Once started, open your browser to:
**http://localhost:5173**

## 🔑 Demo Accounts

The frontend now has **automatic role detection** - no need to select your role!

Just enter the credentials and it will automatically route you to the correct dashboard:

| Email | Password | Role | Dashboard |
|-------|----------|------|-----------|
| `patient@test.com` | `test123` | Patient | Patient Dashboard |
| `doctor@test.com` | `test123` | Doctor | Doctor Dashboard |
| `admin@test.com` | `test123` | Admin | Admin Dashboard |

## ✨ What's New

### 1. **Simplified Login**
- ❌ **Removed** role dropdown selector
- ✅ **Automatic routing** based on email credentials
- ✅ **Error handling** with visual feedback
- ✅ **Demo accounts card** showing test credentials

### 2. **Smart Authentication**
The system detects your role from your email and automatically routes you to:
- **Patients** → Patient Dashboard
- **Doctors** → Doctor Dashboard  
- **Admins** → Admin Dashboard

## 📱 Features

- React + TypeScript + Vite
- TailwindCSS for styling
- React Router for navigation
- LiveKit integration for video calls
- AI Agent consultation
- Comprehensive dashboards for all user types

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Bundler**: Vite 5
- **Styling**: TailwindCSS
- **UI Components**: Custom shadcn/ui components
- **Icons**: Lucide React
- **Video**: LiveKit
- **Charts**: Recharts

## 📝 Notes

- The frontend runs on port **5173** by default
- Hot reload is enabled for development
- All demo accounts use password: `test123`
- Login automatically detects user role from credentials

## 🆘 Troubleshooting

If you encounter issues:

1. **Port already in use**:
   - Close any existing Vite instances
   - Or change the port in `vite.config.ts`

2. **Dependencies error**:
   - Delete `node_modules` folder
   - Delete `package-lock.json`
   - Run `npm install` again

3. **TypeScript errors**:
   - Run `npm run build` to check for errors
   - Fix any TypeScript issues reported

## 🎯 Development Workflow

1. Start frontend: `npm run dev`
2. Make changes in `src/` directory
3. Browser auto-refreshes
4. Login with demo accounts to test

Enjoy building with TeleMedX! 🏥✨

