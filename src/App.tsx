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

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientRecord from './pages/doctor/PatientRecord'
import WritePrescription from './pages/doctor/WritePrescription'
import Schedule from './pages/doctor/Schedule'
import DoctorPatients from './pages/doctor/Patients'
import DoctorPrescriptions from './pages/doctor/Prescriptions'
import DoctorConsultations from './pages/doctor/Consultations'
import DoctorSettings from './pages/doctor/Settings'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/Users'
import AdminAnalytics from './pages/admin/Analytics'
import AdminSystemHealth from './pages/admin/SystemHealth'
import AdminSettings from './pages/admin/Settings'

// Shared pages
import VideoConsultation from './pages/VideoConsultation'

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
        <Route path="/patient/settings" element={<PatientSettings />} />
        
        {/* Doctor routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/calendar" element={<Schedule />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/patient-record/:patientId" element={<PatientRecord />} />
        <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
        <Route path="/doctor/write-prescription" element={<WritePrescription />} />
        <Route path="/doctor/consultations" element={<DoctorConsultations />} />
        <Route path="/doctor/settings" element={<DoctorSettings />} />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/system-health" element={<AdminSystemHealth />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        
        {/* Shared routes */}
        <Route path="/video-call" element={<VideoConsultation />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

