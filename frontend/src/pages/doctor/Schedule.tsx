import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  User,
  Search,
  Bell,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Phone,
  MessageSquare,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Users,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Schedule() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showBlockTimeModal, setShowBlockTimeModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced appointments data
  const appointments = [
    { 
      id: 1, 
      patient: 'John Doe', 
      age: 45, 
      time: '09:00 AM', 
      duration: 30, 
      type: 'Follow-up', 
      status: 'confirmed',
      day: 'Monday',
      date: '2025-10-13',
      avatar: '👨',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      reason: 'Diabetes management follow-up',
      priority: 'normal',
      notes: 'Patient responding well to medication',
      insurance: 'Blue Cross Blue Shield',
      lastVisit: '2025-09-13',
      nextFollowUp: '2025-11-13'
    },
    { 
      id: 2, 
      patient: 'Jane Smith', 
      age: 32, 
      time: '10:00 AM', 
      duration: 45, 
      type: 'New Consultation', 
      status: 'confirmed',
      day: 'Monday',
      date: '2025-10-13',
      avatar: '👩',
      phone: '+1 (555) 234-5678',
      email: 'jane.smith@email.com',
      reason: 'Annual physical examination',
      priority: 'normal',
      notes: 'First time patient',
      insurance: 'Aetna',
      lastVisit: null,
      nextFollowUp: null
    },
    { 
      id: 3, 
      patient: 'Mike Johnson', 
      age: 58, 
      time: '11:30 AM', 
      duration: 30, 
      type: 'Check-up', 
      status: 'pending',
      day: 'Monday',
      date: '2025-10-13',
      avatar: '👨‍💼',
      phone: '+1 (555) 345-6789',
      email: 'mike.johnson@email.com',
      reason: 'Blood pressure monitoring',
      priority: 'high',
      notes: 'Patient needs to confirm appointment',
      insurance: 'UnitedHealth',
      lastVisit: '2025-09-20',
      nextFollowUp: '2025-10-27'
    },
    { 
      id: 4, 
      patient: 'Sarah Williams', 
      age: 28, 
      time: '02:00 PM', 
      duration: 30, 
      type: 'Follow-up', 
      status: 'confirmed',
      day: 'Tuesday',
      date: '2025-10-14',
      avatar: '👩‍💼',
      phone: '+1 (555) 456-7890',
      email: 'sarah.williams@email.com',
      reason: 'Pregnancy follow-up',
      priority: 'normal',
      notes: 'Regular check-up, no concerns',
      insurance: 'Cigna',
      lastVisit: '2025-09-14',
      nextFollowUp: '2025-11-14'
    },
    { 
      id: 5, 
      patient: 'David Brown', 
      age: 65, 
      time: '03:30 PM', 
      duration: 45, 
      type: 'Consultation', 
      status: 'confirmed',
      day: 'Wednesday',
      date: '2025-10-15',
      avatar: '👨‍🦳',
      phone: '+1 (555) 567-8901',
      email: 'david.brown@email.com',
      reason: 'Cardiology consultation',
      priority: 'urgent',
      notes: 'Patient experiencing chest pain',
      insurance: 'Medicare',
      lastVisit: '2025-10-01',
      nextFollowUp: '2025-10-22'
    },
    { 
      id: 6, 
      patient: 'Emily Davis', 
      age: 35, 
      time: '09:30 AM', 
      duration: 30, 
      type: 'Follow-up', 
      status: 'cancelled',
      day: 'Thursday',
      date: '2025-10-16',
      avatar: '👩‍⚕️',
      phone: '+1 (555) 678-9012',
      email: 'emily.davis@email.com',
      reason: 'Thyroid function test results',
      priority: 'normal',
      notes: 'Patient cancelled due to emergency',
      insurance: 'Kaiser Permanente',
      lastVisit: '2025-09-16',
      nextFollowUp: '2025-11-16'
    }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const getAppointmentForSlot = (day: string, time: string) => {
    return appointments.find(apt => apt.day === day && apt.time === time);
  };

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchQuery === '' || 
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesType = typeFilter === 'all' || appointment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get appointment statistics
  const getAppointmentStats = () => {
    const total = appointments.length;
    const confirmed = appointments.filter(apt => apt.status === 'confirmed').length;
    const pending = appointments.filter(apt => apt.status === 'pending').length;
    const cancelled = appointments.filter(apt => apt.status === 'cancelled').length;
    const urgent = appointments.filter(apt => apt.priority === 'urgent').length;
    
    return { total, confirmed, pending, cancelled, urgent };
  };

  const stats = getAppointmentStats();

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  // Get priority badge variant
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'normal': return 'secondary';
      default: return 'outline';
    }
  };

  // Handle appointment actions
  const handleAppointmentAction = (appointment: any, action: string) => {
    setSelectedAppointment(appointment);
    switch (action) {
      case 'view':
        setShowAppointmentModal(true);
        break;
      case 'edit':
        // Handle edit appointment
        break;
      case 'cancel':
        // Handle cancel appointment
        break;
      case 'start':
        navigate('/video-call');
        break;
    }
  };

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule & Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your appointments and availability</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Block Time
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search patients, appointments, or reasons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {showFilters && (
              <div className="flex gap-3">
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
                <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-48">
                  <option value="all">All Types</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="New Consultation">New Consultation</option>
                  <option value="Check-up">Check-up</option>
                  <option value="Consultation">Consultation</option>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            <p className="text-sm text-blue-600">Total Appointments</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">{stats.confirmed}</p>
            <p className="text-sm text-green-600">Confirmed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            <p className="text-sm text-yellow-600">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
            <p className="text-sm text-red-600">Cancelled</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-700">{stats.urgent}</p>
            <p className="text-sm text-orange-600">Urgent</p>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <p className="text-lg font-semibold">October 13-19, 2025</p>
                <p className="text-sm text-gray-600">Week 42</p>
              </div>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button 
                size="sm" 
                variant={viewMode === 'day' ? 'default' : 'ghost'}
                onClick={() => setViewMode('day')}
                className={viewMode === 'day' ? 'bg-white shadow-sm' : ''}
              >
                Day
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? 'bg-white shadow-sm' : ''}
              >
                Week
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                onClick={() => setViewMode('month')}
                className={viewMode === 'month' ? 'bg-white shadow-sm' : ''}
              >
                Month
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {viewMode === 'week' && (
        <Card className="border-0 shadow-lg bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Header */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 bg-gray-50 border-r border-gray-200">
                  <p className="text-sm font-semibold text-gray-600">Time</p>
                </div>
                {weekDays.map((day, idx) => (
                  <div key={day} className="p-4 bg-gray-50 border-r border-gray-200 last:border-r-0">
                    <p className="text-sm font-semibold text-gray-900">{day}</p>
                    <p className="text-xs text-gray-500">Oct {13 + idx}</p>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50">
                    <div className="p-3 border-r border-gray-200 bg-gray-50">
                      <p className="text-xs font-medium text-gray-600">{time}</p>
                    </div>
                    {weekDays.map((day) => {
                      const appointment = getAppointmentForSlot(day, time);
                      return (
                        <div key={`${day}-${time}`} className="p-2 border-r border-gray-100 last:border-r-0 relative">
                          {appointment && (
                            <div 
                              className={`p-2 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all ${
                                appointment.priority === 'urgent' 
                                  ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-500'
                                  : appointment.priority === 'high'
                                  ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-500'
                                  : 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-500'
                              }`}
                              onClick={() => handleAppointmentAction(appointment, 'view')}
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-lg">{appointment.avatar}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-gray-900 truncate">{appointment.patient}</p>
                                  <p className="text-xs text-gray-600">{appointment.type}</p>
                                  <p className="text-xs text-gray-500 truncate">{appointment.reason}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{appointment.duration}m</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <Badge 
                                  variant={getStatusBadge(appointment.status)}
                                  className="text-xs"
                                >
                                  {appointment.status}
                                </Badge>
                                {appointment.priority !== 'normal' && (
                                  <Badge 
                                    variant={getPriorityBadge(appointment.priority)}
                                    className="text-xs"
                                  >
                                    {appointment.priority}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Day View */}
      {viewMode === 'day' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Monday, October 13, 2025</h3>
                  <Badge variant="outline" className="text-sm">
                    {appointments.filter(apt => apt.day === 'Monday').length} appointments
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-24">Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.filter(apt => apt.day === 'Monday').map((appointment) => (
                      <TableRow key={appointment.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{appointment.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{appointment.avatar}</span>
                            <div>
                              <p className="font-semibold">{appointment.patient}</p>
                              <p className="text-xs text-gray-500">{appointment.age} years • {appointment.duration} min</p>
                              <p className="text-xs text-gray-400 truncate max-w-32">{appointment.reason}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{appointment.type}</p>
                            <p className="text-xs text-gray-500">{appointment.insurance}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityBadge(appointment.priority)} className="text-xs">
                            {appointment.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(appointment.status)} className="text-xs">
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button size="sm" variant="ghost" onClick={() => handleAppointmentAction(appointment, 'view')}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleAppointmentAction(appointment, 'edit')}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/doctor/patient-record/${appointment.id}`)}>
                              <User className="w-4 h-4" />
                            </Button>
                            {appointment.status === 'confirmed' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAppointmentAction(appointment, 'start')}>
                                <Video className="w-4 h-4" />
                              </Button>
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

          <div className="space-y-6">
            {/* Today's Statistics */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-lg font-bold">Today's Statistics</h3>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">{appointments.filter(apt => apt.day === 'Monday').length}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{appointments.filter(apt => apt.day === 'Monday' && apt.status === 'confirmed').length}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{appointments.filter(apt => apt.day === 'Monday' && apt.status === 'pending').length}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Urgent</p>
                  <p className="text-2xl font-bold text-red-600">{appointments.filter(apt => apt.day === 'Monday' && apt.priority === 'urgent').length}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-lg font-bold">Quick Actions</h3>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Block Time
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-lg font-bold">Upcoming</h3>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-2xl">{appointment.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">{appointment.time} • {appointment.type}</p>
                    </div>
                    <Badge variant={getStatusBadge(appointment.status)} className="text-xs">
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center p-2 font-semibold text-gray-600 text-sm">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 2; // October 2025 starts on Wednesday (index 3)
                const hasAppointments = dayNum > 0 && dayNum <= 31 && dayNum % 7 === 0;
                return (
                  <div 
                    key={i} 
                    className={`min-h-[80px] p-2 border rounded-lg ${
                      dayNum > 0 && dayNum <= 31 
                        ? 'bg-white hover:bg-gray-50 cursor-pointer' 
                        : 'bg-gray-50'
                    }`}
                  >
                    {dayNum > 0 && dayNum <= 31 && (
                      <>
                        <p className="text-sm font-semibold text-gray-900">{dayNum}</p>
                        {hasAppointments && (
                          <div className="mt-1">
                            <div className="text-xs bg-teal-100 text-teal-700 rounded px-2 py-1">
                              3 appointments
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-teal-700">TeleMedX Doctor</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Schedule' }]}>
      {content}
      
      {/* Appointment Details Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Appointment Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAppointmentModal(false)}>
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-4xl">{selectedAppointment.avatar}</span>
                <div>
                  <h4 className="text-lg font-semibold">{selectedAppointment.patient}</h4>
                  <p className="text-gray-600">{selectedAppointment.age} years old</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={getStatusBadge(selectedAppointment.status)}>
                      {selectedAppointment.status}
                    </Badge>
                    <Badge variant={getPriorityBadge(selectedAppointment.priority)}>
                      {selectedAppointment.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Date & Time</Label>
                  <p className="text-sm">{selectedAppointment.day}, {selectedAppointment.date}</p>
                  <p className="text-sm">{selectedAppointment.time} ({selectedAppointment.duration} min)</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Type</Label>
                  <p className="text-sm">{selectedAppointment.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Reason</Label>
                  <p className="text-sm">{selectedAppointment.reason}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Insurance</Label>
                  <p className="text-sm">{selectedAppointment.insurance}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Contact Information</h5>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{selectedAppointment.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{selectedAppointment.email}</span>
                </div>
              </div>

              {/* Notes */}
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Notes</h5>
                <p className="text-sm text-gray-600">{selectedAppointment.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={() => handleAppointmentAction(selectedAppointment, 'edit')}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Appointment
                </Button>
                <Button variant="outline" onClick={() => navigate(`/doctor/patient-record/${selectedAppointment.id}`)}>
                  <User className="w-4 h-4 mr-2" />
                  View Patient Record
                </Button>
                {selectedAppointment.status === 'confirmed' && (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleAppointmentAction(selectedAppointment, 'start')}>
                    <Video className="w-4 h-4 mr-2" />
                    Start Consultation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}


