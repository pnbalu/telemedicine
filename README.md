# TeleMedX - Comprehensive Telemedicine Platform

A modern, full-featured telemedicine platform built with React, TypeScript, and Tailwind CSS. This platform enables secure online consultations between doctors and patients with integrated appointment scheduling, e-prescriptions, medicine delivery, and comprehensive admin management.

## 🚀 Features

### For Patients (6 Screens)
- 📅 **Appointment Booking** - Browse doctors, select time slots, and pay securely online
- 🎥 **Video Consultations** - HD video calls with doctors via WebRTC
- 📄 **E-Prescriptions** - Digital prescriptions with medication details
- 📋 **Medical Records** - Complete health history with vitals, lab results, and consultations
- 🛒 **Pharmacy & Delivery** - Order medicines and track deliveries in real-time
- ⚙️ **Settings** - Profile, notifications, payment methods, and privacy settings

### For Doctors (8 Screens)
- 🩺 **Doctor Dashboard** - Today's schedule, patient stats, and quick actions
- 📅 **Schedule Calendar** - Week/day/month views with appointment management
- 👥 **Patient Management** - Full patient list with search and contact info
- 📋 **Patient Records** - Comprehensive medical histories with tabbed navigation
- 💊 **Prescription Management** - View, edit, and track all prescriptions
- ✍️ **Prescription Writer** - Dynamic e-prescription creation with medication database
- 🎥 **Consultation History** - Past video consultations with detailed notes
- ⚙️ **Settings** - Profile, availability schedule, notifications, and payments

### For Administrators (5 Screens)
- 📊 **Admin Dashboard** - Platform overview with key metrics and recent activity
- 👤 **User Management** - Full user list with search, filters, and bulk actions
- 📈 **Analytics** - Revenue trends, top doctors, specialty distribution, and reports
- 💻 **System Health** - Server monitoring, service status, performance metrics, and logs
- ⚙️ **Settings** - Email, payment, security, backup, API keys, and content management

### Shared Features
- 🔐 **Role-Based Authentication** - Secure login for patients, doctors, and admins
- 🎨 **Modern UI/UX** - Professional glassmorphism design with smooth animations
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔒 **HIPAA-Ready Architecture** - Healthcare data compliance structure
- 🌐 **Multi-Role Support** - Distinct workflows for each user type
- ✨ **Premium Design** - Latest UI trends with gradients, shadows, and micro-interactions

## 🏗️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite (blazing fast HMR)
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts (ready for integration)
- **Date Handling**: date-fns
- **Type Safety**: Full TypeScript coverage

## 📁 Project Structure

```
telemedicine/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── table.tsx
│   │   └── TelemedicineUI.tsx     # Original demo component
│   ├── pages/
│   │   ├── Login.tsx              # Authentication
│   │   ├── Register.tsx           # User registration
│   │   ├── VideoConsultation.tsx  # Video call interface
│   │   ├── patient/               # Patient portal
│   │   │   ├── PatientDashboard.tsx
│   │   │   ├── BookAppointment.tsx
│   │   │   ├── Prescriptions.tsx
│   │   │   ├── MedicalRecords.tsx
│   │   │   └── Pharmacy.tsx
│   │   ├── doctor/                # Doctor portal
│   │   │   ├── DoctorDashboard.tsx
│   │   │   ├── PatientRecord.tsx
│   │   │   └── WritePrescription.tsx
│   │   └── admin/                 # Admin portal
│   │       └── AdminDashboard.tsx
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Main app with routing
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── ARCHITECTURE.md                # Detailed architecture docs
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd telemedicine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Demo Accounts

Use these credentials to explore different user roles:

**Patient Account:**
- Navigate to login → Select "Patient" role
- Explore: Dashboard, Book Appointments, Medical Records, Prescriptions, Pharmacy

**Doctor Account:**
- Navigate to login → Select "Doctor" role  
- Explore: Dashboard, Patient Records, Write Prescriptions, Video Consultations

**Admin Account:**
- Navigate to login → Select "Admin" role
- Explore: Analytics, User Management, System Configuration

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Key Pages & Routes

### Authentication
- `/login` - User login
- `/register` - New user registration

### Patient Routes
- `/patient/dashboard` - Patient home
- `/patient/book-appointment` - 3-step appointment booking
- `/patient/medical-records` - Complete health records
- `/patient/prescriptions` - E-prescription management
- `/patient/pharmacy` - Medicine ordering & tracking
- `/patient/settings` - Profile and preferences

### Doctor Routes
- `/doctor/dashboard` - Doctor home with schedule
- `/doctor/calendar` - Weekly/monthly schedule calendar
- `/doctor/patients` - Patient list and management
- `/doctor/patient-record/:id` - Patient medical history
- `/doctor/prescriptions` - Prescription management
- `/doctor/write-prescription` - E-prescription creator
- `/doctor/consultations` - Consultation history
- `/doctor/settings` - Profile and preferences

### Admin Routes
- `/admin/dashboard` - Platform overview
- `/admin/users` - User management with advanced search
- `/admin/analytics` - Reports and business intelligence
- `/admin/system-health` - System monitoring and logs
- `/admin/settings` - Platform configuration

### Shared Routes
- `/video-call` - Video consultation interface

## 📚 Architecture Overview

**Component Structure:**
```
src/
├── components/
│   ├── layout/          # Desktop layout components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── DesktopLayout.tsx
│   └── ui/              # Reusable UI components
├── pages/
│   ├── patient/         # Patient portal pages
│   ├── doctor/          # Doctor portal pages
│   └── admin/           # Admin console pages
└── lib/                 # Utilities
```

**Layout System:**
- Uses `DesktopLayout` wrapper for desktop (≥1024px)
- Direct rendering for mobile/tablet
- Automatic responsive switching
- Role-based theming

**API Integration Points:**
- Authentication endpoints ready
- Patient/Doctor/Admin API structure
- WebRTC signaling architecture
- Payment gateway integration ready

**Database Recommendations:**
- Users, Doctors, Patients tables
- Appointments with scheduling
- Prescriptions and medications
- Medical records (EHR)
- Orders and pharmacy tracking

## 🔐 Security Features

- Role-based access control (RBAC)
- Secure authentication flow
- HIPAA-compliance ready architecture
- End-to-end encryption indicators
- Protected routes
- Input validation
- XSS protection ready

## 🎨 UI/UX Highlights

- **Dual Layout System**: Professional desktop app (1024px+) + Beautiful mobile/tablet design
- **Desktop Features**: Sidebar navigation, data tables, multi-column grids, breadcrumbs
- **Modern Design**: Glassmorphism effects, gradient accents, and professional aesthetics
- **Smooth Animations**: Fade-in, slide-up, and hover lift effects throughout
- **Fully Responsive**: Automatically switches between desktop and mobile layouts
- **Premium Components**: Enhanced buttons, cards, and inputs with depth and shadows
- **Intuitive Navigation**: Sidebar menu (desktop) or sticky header (mobile)
- **Accessibility**: Semantic HTML, WCAG AA compliant
- **Color-Coded Roles**: 
  - Blue/Cyan gradients for patients
  - Teal/Emerald gradients for doctors
  - Amber/Orange gradients for admins
- **Professional Polish**: Enterprise-ready desktop UI + Touch-optimized mobile

## 🖥️ Desktop vs Mobile Layout

**Desktop (≥1024px):**
- Sidebar navigation (250px)
- Top bar with search and breadcrumbs
- Multi-column grid layouts (12-column system)
- Data tables with full information
- Higher information density

**Mobile/Tablet (<1024px):**
- Sticky top header
- Card-based layouts
- Touch-optimized spacing
- Vertical stacking
- Simplified views

## 🚀 Deployment

### Frontend Deployment

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

**AWS S3 + CloudFront**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

### Backend Requirements (Suggested)

For a production deployment, you'll need:
- **API Server**: Node.js/Express or Python/FastAPI
- **Database**: PostgreSQL for relational data
- **Cache**: Redis for sessions
- **Storage**: S3 for files (prescriptions, documents)
- **Video**: WebRTC signaling server + TURN/STUN servers

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete deployment guide.

## 🔮 Future Roadmap

- [ ] Progressive Web App (PWA) with offline support
- [ ] Real backend API integration
- [ ] WebRTC video implementation  
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] SMS/Email notifications
- [ ] Advanced analytics with charts
- [ ] Mobile apps (React Native)
- [ ] AI symptom checker
- [ ] Wearable device integration
- [ ] Multi-language support
- [ ] Insurance integration

## 🤝 Contributing

Contributions are welcome! The architecture is modular and extensible:

1. Create new page components in appropriate directories
2. Add routes in `App.tsx`
3. Build reusable UI components in `components/ui/`
4. Follow established patterns for consistency

## 📄 License

MIT License - Feel free to use this for your telemedicine projects.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For questions, issues, or feature requests, please open an issue on the repository.

---

**Built with ❤️ for modern healthcare**

