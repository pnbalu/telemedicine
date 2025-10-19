import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';
import VitalsModal from '@/components/VitalsModal';
import NotesModal from '@/components/NotesModal';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets,
  Plus,
  MapPin,
  Clock,
  AlertTriangle,
  FileText,
  Pill
} from 'lucide-react';

export default function Patients() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [vitalsModal, setVitalsModal] = useState({
    isOpen: false,
    patient: null
  });
  const [notesModal, setNotesModal] = useState({
    isOpen: false,
    patient: null
  });

  const patients = [
    {
      id: 1,
      name: 'John Smith',
      room: '201A',
      age: 45,
      condition: 'Post-operative',
      priority: 'high',
      lastCheck: '2 hours ago',
      vitals: {
        bp: '120/80',
        hr: 72,
        temp: 98.6,
        oxygen: 98
      },
      medications: ['Morphine', 'Antibiotics'],
      alerts: ['Pain level high']
    },
    {
      id: 2,
      name: 'Mary Johnson',
      room: '203B',
      age: 67,
      condition: 'Diabetes Management',
      priority: 'medium',
      lastCheck: '1 hour ago',
      vitals: {
        bp: '135/85',
        hr: 85,
        temp: 98.2,
        oxygen: 97
      },
      medications: ['Insulin', 'Metformin'],
      alerts: ['Blood sugar elevated']
    },
    {
      id: 3,
      name: 'Robert Davis',
      room: '205A',
      age: 72,
      condition: 'Cardiac Monitoring',
      priority: 'critical',
      lastCheck: '30 minutes ago',
      vitals: {
        bp: '95/60',
        hr: 110,
        temp: 99.1,
        oxygen: 94
      },
      medications: ['Digoxin', 'Furosemide'],
      alerts: ['Low blood pressure', 'High heart rate']
    },
    {
      id: 4,
      name: 'Lisa Wilson',
      room: '207B',
      age: 34,
      condition: 'Recovery',
      priority: 'low',
      lastCheck: '3 hours ago',
      vitals: {
        bp: '110/70',
        hr: 68,
        temp: 98.4,
        oxygen: 99
      },
      medications: ['Pain medication'],
      alerts: []
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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbs = [
    { label: 'Dashboard', href: '/nurse/dashboard' },
    { label: 'Patients', href: '/nurse/patients' }
  ];

  return (
    <DesktopLayout 
      role="nurse" 
      userName="Nurse Sarah Johnson" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6 m-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage all your patients</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search patients by name, room, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">Age {patient.age} • Room {patient.room}</p>
                  </div>
                  <Badge className={`text-xs ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Condition */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{patient.condition}</span>
                  </div>

                  {/* Vitals */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-gray-700">{patient.vitals.bp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="w-3 h-3 text-blue-500" />
                      <span className="text-gray-700">{patient.vitals.hr} bpm</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer className="w-3 h-3 text-orange-500" />
                      <span className="text-gray-700">{patient.vitals.temp}°F</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="w-3 h-3 text-cyan-500" />
                      <span className="text-gray-700">{patient.vitals.oxygen}%</span>
                    </div>
                  </div>

                  {/* Medications */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Current Medications</p>
                    <div className="flex flex-wrap gap-1">
                      {patient.medications.map((med, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Alerts */}
                  {patient.alerts.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">Active Alerts</p>
                      <div className="space-y-1">
                        {patient.alerts.map((alert, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-red-700 bg-red-50 p-2 rounded">
                            <AlertTriangle className="w-3 h-3" />
                            {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Last Check */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Last check: {patient.lastCheck}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setVitalsModal({
                        isOpen: true,
                        patient: {
                          id: patient.id,
                          name: patient.name,
                          room: patient.room
                        }
                      })}
                    >
                      <Activity className="w-4 h-4 mr-1" />
                      Record Vitals
                    </Button>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setNotesModal({
                        isOpen: true,
                        patient: {
                          id: patient.id,
                          name: patient.name,
                          room: patient.room
                        }
                      })}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Nursing Notes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate('/nurse/medications', { state: { patientId: patient.id, patientName: patient.name, room: patient.room } })}
                    >
                      <Pill className="w-4 h-4 mr-1" />
                      Medications
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vitals Modal */}
        <VitalsModal
          isOpen={vitalsModal.isOpen}
          onClose={() => setVitalsModal({ isOpen: false, patient: null })}
          patient={vitalsModal.patient}
        />

        {/* Notes Modal */}
        <NotesModal
          isOpen={notesModal.isOpen}
          onClose={() => setNotesModal({ isOpen: false, patient: null })}
          patient={notesModal.patient}
        />
      </div>
    </DesktopLayout>
  );
}
