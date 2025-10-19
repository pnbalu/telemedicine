import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Users, 
  Activity, 
  Clock, 
  AlertTriangle, 
  Heart, 
  Thermometer, 
  Droplets, 
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  Bell,
  TrendingUp,
  Stethoscope,
  Pill,
  FileText,
  UserCheck,
  ArrowRight
} from 'lucide-react';

export default function NurseDashboard() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data for nurse dashboard
  const stats = {
    totalPatients: 24,
    activePatients: 18,
    pendingTasks: 7,
    criticalAlerts: 3
  };

  const recentPatients = [
    {
      id: 1,
      name: 'John Smith',
      room: '201A',
      condition: 'Post-operative',
      priority: 'high',
      lastCheck: '2 hours ago',
      vitals: {
        bp: '120/80',
        hr: 72,
        temp: 98.6,
        oxygen: 98
      }
    },
    {
      id: 2,
      name: 'Mary Johnson',
      room: '203B',
      condition: 'Diabetes Management',
      priority: 'medium',
      lastCheck: '1 hour ago',
      vitals: {
        bp: '135/85',
        hr: 85,
        temp: 98.2,
        oxygen: 97
      }
    },
    {
      id: 3,
      name: 'Robert Davis',
      room: '205A',
      condition: 'Cardiac Monitoring',
      priority: 'critical',
      lastCheck: '30 minutes ago',
      vitals: {
        bp: '95/60',
        hr: 110,
        temp: 99.1,
        oxygen: 94
      }
    },
    {
      id: 4,
      name: 'Lisa Wilson',
      room: '207B',
      condition: 'Recovery',
      priority: 'low',
      lastCheck: '3 hours ago',
      vitals: {
        bp: '110/70',
        hr: 68,
        temp: 98.4,
        oxygen: 99
      }
    }
  ];

  const pendingTasks = [
    {
      id: 1,
      task: 'Medication Administration',
      patient: 'John Smith',
      room: '201A',
      time: '09:30 AM',
      priority: 'high',
      type: 'medication'
    },
    {
      id: 2,
      task: 'Vital Signs Check',
      patient: 'Mary Johnson',
      room: '203B',
      time: '10:00 AM',
      priority: 'medium',
      type: 'vitals'
    },
    {
      id: 3,
      task: 'Dressing Change',
      patient: 'Robert Davis',
      room: '205A',
      time: '10:15 AM',
      priority: 'high',
      type: 'procedure'
    },
    {
      id: 4,
      task: 'Patient Assessment',
      patient: 'Lisa Wilson',
      room: '207B',
      time: '11:00 AM',
      priority: 'low',
      type: 'assessment'
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      patient: 'Robert Davis',
      room: '205A',
      alert: 'Low Blood Pressure',
      time: '9:45 AM',
      severity: 'critical'
    },
    {
      id: 2,
      patient: 'John Smith',
      room: '201A',
      alert: 'High Heart Rate',
      time: '9:30 AM',
      severity: 'high'
    },
    {
      id: 3,
      patient: 'Mary Johnson',
      room: '203B',
      alert: 'Blood Sugar High',
      time: '9:15 AM',
      severity: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'vitals': return <Activity className="w-4 h-4" />;
      case 'procedure': return <Stethoscope className="w-4 h-4" />;
      case 'assessment': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/nurse/dashboard' }
  ];

  return (
    <DesktopLayout 
      role="nurse" 
      userName="Nurse Sarah Johnson" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nurse Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Sarah! Here's your overview for today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/nurse/patients')}>
              <Users className="w-4 h-4 mr-2" />
              View All Patients
            </Button>
            <Button onClick={() => navigate('/nurse/vitals')}>
              <Plus className="w-4 h-4 mr-2" />
              Record Vitals
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalPatients}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activePatients}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingTasks}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalAlerts}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Patients */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Recent Patients
                </h2>
                <Button variant="outline" size="sm" onClick={() => navigate('/nurse/patients')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">Room {patient.room}</p>
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(patient.priority)}`}>
                        {patient.priority}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{patient.vitals.bp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="w-3 h-3 text-blue-500" />
                        <span>{patient.vitals.hr} bpm</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Thermometer className="w-3 h-3 text-orange-500" />
                        <span>{patient.vitals.temp}°F</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Droplets className="w-3 h-3 text-cyan-500" />
                        <span>{patient.vitals.oxygen}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Last check: {patient.lastCheck}</p>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Pending Tasks
                </h2>
                <Button variant="outline" size="sm" onClick={() => navigate('/nurse/tasks')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          {getTaskIcon(task.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{task.task}</h3>
                          <p className="text-sm text-gray-600">{task.patient} - Room {task.room}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Due: {task.time}</p>
                      <Button variant="outline" size="sm">
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Critical Alerts
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="border border-red-200 rounded-lg p-4 bg-red-50 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-900">{alert.alert}</h3>
                        <p className="text-sm text-red-700">{alert.patient} - Room {alert.room}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                      <p className="text-sm text-red-600">{alert.time}</p>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-100">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/nurse/vitals')}
              >
                <Activity className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">Record Vitals</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/nurse/medications')}
              >
                <Pill className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">Medications</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/nurse/notes')}
              >
                <FileText className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium">Nursing Notes</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/nurse/schedule')}
              >
                <Calendar className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium">Schedule</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}
