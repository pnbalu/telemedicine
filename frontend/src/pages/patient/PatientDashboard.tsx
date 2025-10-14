import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { DraggableCard } from '@/components/DraggableCard';
import { useDraggableGrid } from '@/hooks/useDraggableGrid';
import { 
  CalendarDays, 
  Video, 
  FileText, 
  ShoppingCart, 
  Activity,
  TrendingUp,
  Clock,
  ArrowRight,
  Calendar,
  Heart,
  Pill,
  MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-10-15', time: '10:00 AM', status: 'confirmed', avatar: '👩‍⚕️', duration: '30 min' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', date: '2025-10-18', time: '2:30 PM', status: 'pending', avatar: '👨‍⚕️', duration: '45 min' },
    { id: 3, doctor: 'Dr. Emily Davis', specialty: 'General Physician', date: '2025-10-20', time: '11:00 AM', status: 'confirmed', avatar: '👩‍⚕️', duration: '30 min' },
  ];

  const recentPrescriptions = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2025-10-05', medications: ['Lisinopril 10mg', 'Aspirin 81mg', 'Atorvastatin 20mg'], status: 'active' },
    { id: 2, doctor: 'Dr. Emily Davis', date: '2025-09-28', medications: ['Vitamin C 1000mg', 'Paracetamol 500mg'], status: 'completed' },
  ];

  const vitalSigns = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: Heart, color: 'text-green-600' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: Activity, color: 'text-blue-600' },
    { label: 'Weight', value: '165', unit: 'lbs', status: 'normal', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Temperature', value: '98.6', unit: '°F', status: 'normal', icon: Activity, color: 'text-orange-600' },
  ];

  const activeOrders = [
    { id: 1, items: 3, total: 45, status: 'In Transit', eta: '2 days', trackingId: 'TRK123456' },
    { id: 2, items: 2, total: 30, status: 'Processing', eta: '3 days', trackingId: 'TRK123457' },
  ];

  const stats = [
    { label: 'Upcoming', value: '3', change: '+1 this week', icon: CalendarDays, color: 'from-blue-500 to-cyan-500' },
    { label: 'Prescriptions', value: '5', change: '2 active', icon: FileText, color: 'from-purple-500 to-pink-500' },
    { label: 'Cart Items', value: '3', change: '$45 total', icon: ShoppingCart, color: 'from-rose-500 to-orange-500' },
    { label: 'Health Score', value: 'Good', change: '85/100', icon: Activity, color: 'from-green-500 to-emerald-500' },
  ];

  // Mobile/Tablet View (existing)
  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    TeleMedX
                  </h1>
                  <p className="text-xs text-gray-500">Patient Portal</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h2>
            <p className="text-gray-600 mt-1">Here's your health overview</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover-lift backdrop-blur-xl bg-white/80">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-lg backdrop-blur-xl bg-white/80">
            <CardHeader>
              <h3 className="font-bold">Upcoming Appointments</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAppointments.slice(0, 2).map((apt) => (
                <div key={apt.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="text-3xl">{apt.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{apt.doctor}</p>
                    <p className="text-xs text-gray-600">{apt.date} at {apt.time}</p>
                  </div>
                  <Button size="sm" onClick={() => navigate('/video-call')}>Join</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Desktop View (new)
  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard' }]}>
      <div className="p-8 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John! 👋</h1>
            <p className="text-gray-600 mt-1">Here's your health overview for today</p>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg"
            onClick={() => navigate('/patient/book-appointment')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Appointments (Span 5) */}
          <div className="col-span-5 space-y-6">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/patient/book-appointment')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="text-4xl">{appointment.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                          className="capitalize text-xs"
                        >
                          {appointment.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{appointment.duration}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                      onClick={() => navigate('/video-call')}
                    >
                      <Video className="w-4 h-4 mr-1" /> Join
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Orders */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Active Orders</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {activeOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-orange-50 to-rose-50/50 rounded-xl border border-orange-100">
                    <div>
                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.items} items • ${order.total}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {order.status}
                        </Badge>
                        <span className="text-xs text-gray-500">ETA: {order.eta}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Track
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Vital Signs & Prescriptions (Span 4) */}
          <div className="col-span-4 space-y-6">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Vital Signs</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {vitalSigns.map((vital, index) => {
                    const Icon = vital.icon;
                    return (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-4 h-4 ${vital.color}`} />
                          <p className="text-xs font-medium text-gray-600">{vital.label}</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{vital.value}</p>
                        <p className="text-xs text-gray-500">{vital.unit}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Recent Prescriptions</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {recentPrescriptions.map((prescription) => (
                  <div 
                    key={prescription.id} 
                    className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate('/patient/prescriptions')}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{prescription.doctor}</p>
                        <p className="text-xs text-gray-600">{prescription.date}</p>
                      </div>
                      <Badge 
                        variant={prescription.status === 'active' ? 'success' : 'secondary'}
                        className="text-xs capitalize"
                      >
                        {prescription.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 mt-3">
                      {prescription.medications.slice(0, 2).map((med, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <Pill className="w-3 h-3" />
                          <span>{med}</span>
                        </div>
                      ))}
                      {prescription.medications.length > 2 && (
                        <p className="text-xs text-gray-500 ml-5">+{prescription.medications.length - 2} more</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Health Tips (Span 3) */}
          <div className="col-span-3 space-y-6">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {[
                  { icon: Calendar, label: 'Book Appointment', route: '/patient/book-appointment', color: 'from-blue-500 to-cyan-500' },
                  { icon: Activity, label: 'Medical Records', route: '/patient/medical-records', color: 'from-teal-500 to-green-500' },
                  { icon: ShoppingCart, label: 'Pharmacy', route: '/patient/pharmacy', color: 'from-rose-500 to-orange-500' },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(action.route)}
                      className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-100 hover:shadow-md transition-all group text-left"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="flex-1 font-medium text-gray-900">{action.label}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <CardContent className="p-6 relative z-10">
                <TrendingUp className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-bold mb-2">Health Tip</h3>
                <p className="text-sm text-indigo-50 mb-4">
                  Regular check-ups help detect issues early. Schedule your annual physical today!
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-indigo-600 hover:bg-indigo-50"
                  onClick={() => navigate('/patient/book-appointment')}
                >
                  Book Check-up
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
