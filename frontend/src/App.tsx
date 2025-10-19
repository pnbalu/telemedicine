import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Auth pages
import Login from './pages/Login'
import Register from './pages/Register'

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard'
import BookAppointment from './pages/patient/BookAppointment'
import Prescriptions from './pages/patient/Prescriptions'
import MedicalRecords from './pages/patient/MedicalRecords'
import Pharmacy from './pages/patient/Pharmacy'
import PatientSettings from './pages/patient/Settings'
import AISymptomChecker from './pages/patient/AISymptomChecker'
import AIAgentConsultation from './pages/patient/AIAgentConsultation'
import PaymentScreen from './pages/patient/PaymentScreen'
import HelpSupport from './pages/HelpSupport'

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientRecord from './pages/doctor/PatientRecord'
import WritePrescription from './pages/doctor/WritePrescription'
import Schedule from './pages/doctor/Schedule'
import DoctorPatients from './pages/doctor/Patients'
import DoctorPrescriptions from './pages/doctor/Prescriptions'
import DoctorConsultations from './pages/doctor/Consultations'
import DoctorSettings from './pages/doctor/Settings'
import AITriageReview from './pages/doctor/AITriageReview'

// Nurse pages
import NurseDashboard from './pages/nurse/NurseDashboard'
import NursePatients from './pages/nurse/Patients'
import NurseVitals from './pages/nurse/Vitals'
import NurseMedications from './pages/nurse/Medications'
import NurseNotes from './pages/nurse/Notes'
import NurseSchedule from './pages/nurse/Schedule'
import NurseSettings from './pages/nurse/Settings'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/Users'
import AdminAnalytics from './pages/admin/Analytics'
import AdminSystemHealth from './pages/admin/SystemHealth'
import AdminSettings from './pages/admin/Settings'
import AdminSetup from './pages/admin/Setup'
import UserDetails from './pages/admin/UserDetails'
import DoctorVerification from './pages/admin/DoctorVerification'
import RevenueDashboard from './pages/admin/RevenueDashboard'
import FraudDetection from './pages/admin/FraudDetection'
import SystemLogs from './pages/admin/SystemLogs'
import AIReports from './pages/admin/AIReports'
import NotificationManagement from './pages/admin/NotificationManagement'

// Shared pages
import VideoConsultation from './pages/VideoConsultation'
import LiveKitDemo from './pages/LiveKitDemo'

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Patient routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/book-appointment" element={<BookAppointment />} />
        <Route path="/patient/prescriptions" element={<Prescriptions />} />
        <Route path="/patient/medical-records" element={<MedicalRecords />} />
        <Route path="/patient/pharmacy" element={<Pharmacy />} />
        <Route path="/patient/ai-symptom-checker" element={<AISymptomChecker />} />
        <Route path="/ai-agent-consultation" element={<AIAgentConsultation />} />
        <Route path="/patient/payments" element={<PaymentScreen />} />
        <Route path="/patient/settings" element={<PatientSettings />} />
        <Route path="/help-support" element={<HelpSupport />} />
        
        {/* Doctor routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/calendar" element={<Schedule />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/patient-record/:patientId" element={<PatientRecord />} />
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        <Route path="/doctor/write-prescription" element={<WritePrescription />} />
        <Route path="/doctor/consultations" element={<DoctorConsultations />} />
        <Route path="/doctor/ai-triage" element={<AITriageReview />} />
        <Route path="/doctor/settings" element={<DoctorSettings />} />
        
        {/* Nurse routes */}
        <Route path="/nurse/dashboard" element={<NurseDashboard />} />
        <Route path="/nurse/patients" element={<NursePatients />} />
        <Route path="/nurse/vitals" element={<NurseVitals />} />
        <Route path="/nurse/medications" element={<NurseMedications />} />
        <Route path="/nurse/notes" element={<NurseNotes />} />
        <Route path="/nurse/schedule" element={<NurseSchedule />} />
        <Route path="/nurse/settings" element={<NurseSettings />} />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/user-details" element={<UserDetails />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/system-health" element={<AdminSystemHealth />} />
        <Route path="/admin/doctor-verification" element={<DoctorVerification />} />
        <Route path="/admin/revenue" element={<RevenueDashboard />} />
        <Route path="/admin/fraud-detection" element={<FraudDetection />} />
        <Route path="/admin/system-logs" element={<SystemLogs />} />
        <Route path="/admin/ai-reports" element={<AIReports />} />
        <Route path="/admin/notifications" element={<NotificationManagement />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/setup" element={<AdminSetup />} />
        
        {/* Shared routes */}
        <Route path="/video-call" element={<VideoConsultation />} />
        <Route path="/livekit-demo" element={<LiveKitDemo />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

