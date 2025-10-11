import React from 'react';
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
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role: 'patient' | 'doctor' | 'admin';
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ role, collapsed = false, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const patientMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/patient/dashboard' },
    { icon: Calendar, label: 'Book Appointment', path: '/patient/book-appointment' },
    { icon: Activity, label: 'Medical Records', path: '/patient/medical-records' },
    { icon: FileText, label: 'Prescriptions', path: '/patient/prescriptions' },
    { icon: ShoppingCart, label: 'Pharmacy', path: '/patient/pharmacy' },
    { icon: Settings, label: 'Settings', path: '/patient/settings' },
  ];

  const doctorMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
    { icon: Calendar, label: 'Schedule', path: '/doctor/calendar' },
    { icon: Users, label: 'Patients', path: '/doctor/patients' },
    { icon: FileText, label: 'Prescriptions', path: '/doctor/prescriptions' },
    { icon: Video, label: 'Consultations', path: '/doctor/consultations' },
    { icon: Settings, label: 'Settings', path: '/doctor/settings' },
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Activity, label: 'System Health', path: '/admin/system-health' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const menuItems = 
    role === 'patient' ? patientMenuItems :
    role === 'doctor' ? doctorMenuItems :
    adminMenuItems;

  const themeColor = 
    role === 'patient' ? 'from-blue-600 to-cyan-600' :
    role === 'doctor' ? 'from-teal-600 to-emerald-600' :
    'from-amber-600 to-orange-600';

  const brandIcon = 
    role === 'patient' ? Video :
    role === 'doctor' ? Stethoscope :
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
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                isActive 
                  ? `bg-gradient-to-r ${themeColor} text-white shadow-lg` 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
              )} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100"
          onClick={() => navigate('/login')}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </Button>
      </div>
    </div>
  );
}

