import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin,
  Plus,
  Eye
} from 'lucide-react';

export default function Schedule() {
  const navigate = useNavigate();

  const schedule = [
    {
      id: 1,
      time: '08:00 AM',
      patient: 'Robert Davis',
      room: '205A',
      task: 'Medication Administration',
      priority: 'high',
      duration: '15 min',
      status: 'completed'
    },
    {
      id: 2,
      time: '09:00 AM',
      patient: 'John Smith',
      room: '201A',
      task: 'Vital Signs Check',
      priority: 'high',
      duration: '20 min',
      status: 'in_progress'
    },
    {
      id: 3,
      time: '10:00 AM',
      patient: 'Mary Johnson',
      room: '203B',
      task: 'Blood Sugar Monitoring',
      priority: 'medium',
      duration: '10 min',
      status: 'scheduled'
    },
    {
      id: 4,
      time: '11:00 AM',
      patient: 'Lisa Wilson',
      room: '207B',
      task: 'Patient Assessment',
      priority: 'low',
      duration: '30 min',
      status: 'scheduled'
    },
    {
      id: 5,
      time: '02:00 PM',
      patient: 'John Smith',
      room: '201A',
      task: 'Dressing Change',
      priority: 'medium',
      duration: '25 min',
      status: 'scheduled'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/nurse/dashboard' },
    { label: 'Schedule', href: '/nurse/schedule' }
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
            <h1 className="text-3xl font-bold text-gray-900">Nursing Schedule</h1>
            <p className="text-gray-600 mt-1">Manage your daily tasks and patient care schedule</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {schedule.map((task) => (
            <Card key={task.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{task.task}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {task.patient}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Room {task.room}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.time}
                      </p>
                      <p className="text-sm text-gray-600">Duration: {task.duration}</p>
                    </div>
                    
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                    
                    <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                    
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DesktopLayout>
  );
}
