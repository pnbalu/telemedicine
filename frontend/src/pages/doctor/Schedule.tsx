import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Schedule() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock appointments data
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
      avatar: '👨'
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
      avatar: '👩'
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
      avatar: '👨‍💼'
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
      avatar: '👩‍💼'
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
      avatar: '👨‍🦳'
    },
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

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule & Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your appointments and availability</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Block Time
          </Button>
        </div>
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
                              className="p-2 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 border-l-4 border-teal-500 cursor-pointer hover:shadow-md transition-all"
                              onClick={() => navigate(`/doctor/patient-record/${appointment.id}`)}
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-lg">{appointment.avatar}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-gray-900 truncate">{appointment.patient}</p>
                                  <p className="text-xs text-gray-600">{appointment.type}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{appointment.duration}m</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge 
                                  variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
                                  className="text-xs"
                                >
                                  {appointment.status}
                                </Badge>
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
                <h3 className="text-lg font-bold">Monday, October 13, 2025</h3>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-24">Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.filter(apt => apt.day === 'Monday').map((appointment) => (
                      <TableRow key={appointment.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{appointment.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{appointment.avatar}</span>
                            <div>
                              <p className="font-semibold">{appointment.patient}</p>
                              <p className="text-xs text-gray-500">{appointment.age} years</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>{appointment.duration} min</TableCell>
                        <TableCell>
                          <Badge variant={appointment.status === 'confirmed' ? 'success' : 'warning'}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => navigate(`/doctor/patient-record/${appointment.id}`)}>
                              <User className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/video-call')}>
                              <Video className="w-4 h-4 mr-1" />
                              Start
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-lg font-bold">Statistics</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Appointments</p>
                  <p className="text-3xl font-bold text-blue-600">3</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">2</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">1</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Available Slots</p>
                  <p className="text-3xl font-bold text-gray-600">14</p>
                </div>
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
    </DesktopLayout>
  );
}

