import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Video, 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  Activity,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bell,
  Star,
  Phone,
  Mail,
  Brain,
  DollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const todaysAppointments = [
    { 
      id: 1, 
      patient: 'John Doe', 
      age: 45, 
      gender: 'M', 
      time: '09:00 AM', 
      type: 'Follow-up', 
      status: 'upcoming', 
      avatar: '👨', 
      lastVisit: '2 weeks ago',
      consultationType: 'live_doctor', // live_doctor or ai_agent
      cost: 75,
      duration: '30 min'
    },
    { 
      id: 2, 
      patient: 'Jane Smith - AI Review Pending', 
      age: 32, 
      gender: 'F', 
      time: '10:00 AM', 
      type: 'AI Agent Intake', 
      status: 'completed', 
      avatar: '🤖', 
      lastVisit: 'AI session completed',
      consultationType: 'ai_agent',
      cost: 15,
      duration: '8 min'
    },
    { 
      id: 3, 
      patient: 'Mike Johnson', 
      age: 58, 
      gender: 'M', 
      time: '11:30 AM', 
      type: 'Check-up', 
      status: 'upcoming', 
      avatar: '👨‍💼', 
      lastVisit: '1 month ago',
      consultationType: 'live_doctor',
      cost: 75,
      duration: '30 min'
    },
    { 
      id: 4, 
      patient: 'Sarah Williams - AI Review Pending', 
      age: 28, 
      gender: 'F', 
      time: '02:00 PM', 
      type: 'AI Agent Intake', 
      status: 'pending_review', 
      avatar: '🤖', 
      lastVisit: 'AI session scheduled',
      consultationType: 'ai_agent',
      cost: 15,
      duration: '10 min'
    },
    { 
      id: 5, 
      patient: 'David Brown', 
      age: 65, 
      gender: 'M', 
      time: '03:30 PM', 
      type: 'Follow-up', 
      status: 'upcoming', 
      avatar: '👨‍🦳', 
      lastVisit: '1 week ago',
      consultationType: 'live_doctor',
      cost: 75,
      duration: '45 min'
    },
  ];

  const stats = [
    { label: "Today's Appointments", value: '5', change: '+2', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Patients', value: '247', change: '+12', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Pending e-Rx', value: '3', change: '-1', icon: FileText, color: 'from-orange-500 to-red-500' },
    { label: 'Completed Today', value: '2', change: '+2', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  ];

  const pendingTasks = [
    { id: 1, title: 'Prescription Review', patient: 'Jane Smith', description: 'Awaiting approval', priority: 'high', time: '10 min ago' },
    { id: 2, title: 'Lab Results', patient: 'David Brown', description: 'New results available', priority: 'medium', time: '1 hour ago' },
    { id: 3, title: 'Follow-up Required', patient: 'Sarah Williams', description: 'Schedule follow-up', priority: 'low', time: '2 hours ago' },
  ];

  const recentActivity = [
    { type: 'consultation', patient: 'Emma Wilson', action: 'Completed consultation', time: '2 hours ago' },
    { type: 'prescription', patient: 'John Doe', action: 'Issued prescription', time: '4 hours ago' },
    { type: 'note', patient: 'Mike Johnson', action: 'Updated medical notes', time: 'Yesterday' },
  ];

  // Mobile/Tablet View
  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50">
        <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  TeleMedX
                </h1>
                <p className="text-xs text-gray-500">Doctor Portal</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Good morning, Dr. Johnson! 👋</h2>
            <p className="text-gray-600 mt-1">You have {stats[0].value} appointments today</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg backdrop-blur-xl bg-white/80">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-lg backdrop-blur-xl bg-white/80">
            <CardHeader>
              <h3 className="font-bold">Today's Schedule</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysAppointments.slice(0, 3).map((apt) => (
                <div key={apt.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="text-3xl">{apt.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{apt.patient}</p>
                    <p className="text-xs text-gray-600">{apt.time}</p>
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

  // Desktop View
  return (
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }]}>
      <div className="p-8 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. Johnson! 👋</h1>
            <p className="text-gray-600 mt-1">You have 5 appointments scheduled for today</p>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg"
            onClick={() => navigate('/doctor/write-prescription')}
          >
            <FileText className="w-5 h-5 mr-2" />
            New Prescription
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
                  <Badge variant={stat.change.startsWith('+') ? 'success' : 'secondary'} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Today's Schedule (Span 6) */}
          <div className="col-span-6">
            <Card className="border-0 shadow-md bg-white h-full">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Today's Schedule</h3>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-16">Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className={`hover:bg-gray-50 ${
                        appointment.consultationType === 'ai_agent' ? 'bg-indigo-50/30' : ''
                      }`}>
                        <TableCell className="font-medium text-sm">{appointment.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                              appointment.consultationType === 'ai_agent'
                                ? 'bg-gradient-to-br from-indigo-400 to-purple-400'
                                : 'bg-gradient-to-br from-teal-400 to-emerald-400'
                            }`}>
                              {appointment.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">{appointment.patient}</p>
                                {appointment.consultationType === 'ai_agent' && (
                                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] px-1.5 py-0">
                                    <Brain className="w-2.5 h-2.5 mr-1" />
                                    AI
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">{appointment.age}Y • {appointment.gender} • {appointment.lastVisit}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-600">{appointment.type}</span>
                            <span className="text-xs text-gray-500">${appointment.cost} • {appointment.duration}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              appointment.status === 'in-progress' ? 'warning' : 
                              appointment.status === 'completed' ? 'success' : 
                              appointment.status === 'pending_review' ? 'warning' :
                              'secondary'
                            }
                            className="capitalize text-xs"
                          >
                            {appointment.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {appointment.consultationType === 'ai_agent' ? (
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                onClick={() => navigate('/doctor/ai-triage')}
                              >
                                <Brain className="w-3.5 h-3.5 mr-1" />
                                {appointment.status === 'pending_review' ? 'Review' : 'View'} AI Intake
                              </Button>
                            ) : (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => navigate(`/doctor/patient-record/${appointment.id}`)}
                                >
                                  View
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-teal-600 hover:bg-teal-700 text-white"
                                  onClick={() => navigate(`/video-call?room=consultation-${appointment.id}&name=Dr. Sarah Johnson&role=doctor`)}
                                >
                                  <Video className="w-3.5 h-3.5 mr-1" />
                                  {appointment.status === 'in-progress' ? 'Join' : 'Start'}
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Pending Tasks & Activity (Span 3) */}
          <div className="col-span-3 space-y-6">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Pending Tasks</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {pendingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer ${
                      task.priority === 'high' ? 'bg-red-50 border-red-200' :
                      task.priority === 'medium' ? 'bg-orange-50 border-orange-200' :
                      'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{task.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{task.patient}</p>
                      </div>
                      <Badge 
                        variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'warning' :
                          'secondary'
                        }
                        className="text-xs capitalize"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{task.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.patient}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Performance & Quick Stats (Span 3) */}
          <div className="col-span-3 space-y-6">
            <Card className="border-0 shadow-md bg-gradient-to-br from-teal-500 to-emerald-500 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5" />
                      <span className="text-sm font-medium opacity-90">Patient Rating</span>
                    </div>
                    <p className="text-3xl font-bold">4.9/5.0</p>
                    <p className="text-sm opacity-75 mt-1">Based on 247 reviews</p>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium opacity-90">This Week</span>
                    </div>
                    <p className="text-2xl font-bold">32</p>
                    <p className="text-sm opacity-75 mt-1">Consultations completed</p>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5" />
                      <span className="text-sm font-medium opacity-90">Avg Response</span>
                    </div>
                    <p className="text-2xl font-bold">8 min</p>
                    <p className="text-sm opacity-75 mt-1">Response time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {[
                  { icon: FileText, label: 'Write Prescription', route: '/doctor/write-prescription' },
                  { icon: Calendar, label: 'View Schedule', route: '/doctor/calendar' },
                  { icon: Users, label: 'Patient Records', route: '/doctor/patients' },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(action.route)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group text-left"
                    >
                      <Icon className="w-5 h-5 text-teal-600" />
                      <span className="flex-1 text-sm font-medium text-gray-900">{action.label}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
