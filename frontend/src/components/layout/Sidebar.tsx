import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  Activity, 
  ShoppingCart, 
  Users, 
  Settings,
  Video,
  BarChart3,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Brain,
  Pill,
  DollarSign,
  Bell,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role: 'patient' | 'doctor' | 'nurse' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const patientMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/patient/dashboard' },
    { icon: Brain, label: 'AI Symptom Checker', path: '/patient/ai-symptom-checker', highlight: true },
    { icon: Calendar, label: 'Book Appointment', path: '/patient/book-appointment' },
    { icon: Activity, label: 'Medical Records', path: '/patient/medical-records' },
    { icon: FileText, label: 'Prescriptions', path: '/patient/prescriptions' },
    { icon: ShoppingCart, label: 'Pharmacy', path: '/patient/pharmacy' },
    { icon: CreditCard, label: 'Payments', path: '/patient/payments' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help-support' },
    { icon: Settings, label: 'Settings', path: '/patient/settings' },
  ];

  const doctorMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
    { icon: Brain, label: 'AI Triage Review', path: '/doctor/ai-triage', highlight: true },
    { icon: Calendar, label: 'Schedule', path: '/doctor/calendar' },
    { icon: Users, label: 'Patients', path: '/doctor/patients' },
    { icon: FileText, label: 'Prescriptions', path: '/doctor/prescriptions' },
    { icon: Video, label: 'Consultations', path: '/doctor/consultations' },
    { icon: Settings, label: 'Settings', path: '/doctor/settings' },
  ];

  const nurseMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/nurse/dashboard' },
    { icon: Users, label: 'Patients', path: '/nurse/patients' },
    { icon: Activity, label: 'Vital Signs', path: '/nurse/vitals' },
    { icon: Pill, label: 'Medications', path: '/nurse/medications' },
    { icon: FileText, label: 'Nursing Notes', path: '/nurse/notes' },
    { icon: Calendar, label: 'Schedule', path: '/nurse/schedule' },
    { icon: Settings, label: 'Settings', path: '/nurse/settings' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Shield, label: 'Doctor Verification', path: '/admin/doctor-verification', highlight: true },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: DollarSign, label: 'Revenue', path: '/admin/revenue' },
    { icon: Shield, label: 'Fraud Detection', path: '/admin/fraud-detection', highlight: true },
    { icon: FileText, label: 'System Logs', path: '/admin/system-logs' },
    { icon: Brain, label: 'AI Reports', path: '/admin/ai-reports', highlight: true },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Activity, label: 'System Health', path: '/admin/system-health' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const menuItems = 
    role === 'patient' ? patientMenuItems :
    role === 'doctor' ? doctorMenuItems :
    role === 'nurse' ? nurseMenuItems :
    adminMenuItems;

  const themeColor = 
    role === 'patient' ? 'from-blue-600 to-cyan-600' :
    role === 'doctor' ? 'from-teal-600 to-emerald-600' :
    role === 'nurse' ? 'from-pink-600 to-rose-600' :
    'from-amber-600 to-orange-600';

  const brandIcon = 
    role === 'patient' ? Video :
    role === 'doctor' ? Stethoscope :
    role === 'nurse' ? Activity :
    Shield;

  const BrandIcon = brandIcon;

  return (
    <div className={cn(
      "hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Brand Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${themeColor} flex items-center justify-center shadow-lg`}>
              <BrandIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold bg-gradient-to-r ${themeColor} bg-clip-text text-transparent`}>
                TeleMedX
              </h1>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${themeColor} flex items-center justify-center shadow-lg mx-auto`}>
            <BrandIcon className="w-5 h-5 text-white" />
          </div>
        )}
        
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-gray-100 transition-colors",
            collapsed && "mx-auto mt-2"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <div key={item.path} className="relative group">
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative",
                  isActive 
                    ? `bg-gradient-to-r ${themeColor} text-white shadow-lg` 
                    : item.highlight
                    ? "text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                    : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-white" : item.highlight ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-700"
                )} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {!collapsed && item.highlight && !isActive && (
                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded">
                    AI
                  </span>
                )}
              </button>
              
              {/* Tooltip on hover when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
                  {item.label}
                  {item.highlight && (
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded">
                      AI
                    </span>
                  )}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        <div className="relative group">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-gray-700 hover:bg-gray-100",
              collapsed ? "justify-center px-3" : "justify-start"
            )}
            onClick={() => navigate('/login')}
          >
            <LogOut className={cn("w-5 h-5", !collapsed && "mr-3")} />
            {!collapsed && <span className="text-sm">Logout</span>}
          </Button>
          
          {/* Tooltip for logout when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
              Logout
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

