import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Search, Video, Clock, FileText, Calendar, User, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Consultations() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const consultations = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 1,
      date: '2025-10-05',
      time: '09:00 AM',
      duration: '32 min',
      type: 'Video Call',
      diagnosis: 'Hypertension Follow-up',
      status: 'Completed',
      notes: 'Patient showing improvement. BP stable at 120/80. Continue current medication.',
      prescriptionIssued: true,
      avatar: '👨'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 2,
      date: '2025-10-04',
      time: '10:00 AM',
      duration: '45 min',
      type: 'Video Call',
      diagnosis: 'Initial Diabetes Consultation',
      status: 'Completed',
      notes: 'New patient. Discussed diet, exercise, and medication plan. Blood glucose monitoring required.',
      prescriptionIssued: true,
      avatar: '👩'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      patientId: 3,
      date: '2025-10-03',
      time: '11:30 AM',
      duration: '25 min',
      type: 'Video Call',
      diagnosis: 'Common Cold',
      status: 'Completed',
      notes: 'Viral infection. Prescribed symptom relief medications. Follow-up if no improvement in 7 days.',
      prescriptionIssued: true,
      avatar: '👨‍💼'
    },
    {
      id: 4,
      patient: 'Sarah Williams',
      patientId: 4,
      date: '2025-09-28',
      time: '02:00 PM',
      duration: '28 min',
      type: 'Video Call',
      diagnosis: 'Allergic Rhinitis',
      status: 'Completed',
      notes: 'Seasonal allergies. Antihistamine prescribed. Advised to avoid allergen triggers.',
      prescriptionIssued: true,
      avatar: '👩‍💼'
    },
    {
      id: 5,
      patient: 'David Brown',
      patientId: 5,
      date: '2025-09-25',
      time: '03:30 PM',
      duration: '50 min',
      type: 'Video Call',
      diagnosis: 'Heart Disease Management',
      status: 'Completed',
      notes: 'Reviewed ECG and blood work. Adjusted cardiac medication dosages. Schedule follow-up in 4 weeks.',
      prescriptionIssued: true,
      avatar: '👨‍🦳'
    },
  ];

  const filteredConsultations = consultations.filter(cons =>
    cons.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cons.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Consultation History</h1>
          <p className="text-gray-600 mt-1">Review past video consultations and notes</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Consultations</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">1,245</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">32</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">24m</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">4.9</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search consultations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultations Table */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold">Recent Consultations</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultations.map((consultation) => (
                  <TableRow key={consultation.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-xl">
                          {consultation.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{consultation.patient}</p>
                          <p className="text-sm text-gray-500">{consultation.type}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{consultation.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{consultation.time}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{consultation.duration}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{consultation.diagnosis}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="success">{consultation.status}</Badge>
                        {consultation.prescriptionIssued && (
                          <Badge variant="secondary" className="text-xs ml-1">Rx Issued</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/doctor/patient-record/${consultation.patientId}`)}
                        >
                          <User className="w-4 h-4 mr-1" />
                          View Patient
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View Section */}
      {filteredConsultations.length > 0 && (
        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold">Consultation Details - {filteredConsultations[0].patient}</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Diagnosis</p>
                  <p className="text-gray-900 mt-1">{filteredConsultations[0].diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Notes</p>
                  <p className="text-gray-900 mt-1">{filteredConsultations[0].notes}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Consultation Type</p>
                  <p className="text-gray-900 mt-1">{filteredConsultations[0].type}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Duration</p>
                  <p className="text-gray-900 mt-1">{filteredConsultations[0].duration}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Prescription</p>
                  <p className="text-gray-900 mt-1">{filteredConsultations[0].prescriptionIssued ? 'Issued' : 'Not Issued'}</p>
                </div>
              </div>
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
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Consultations' }]}>
      {content}
    </DesktopLayout>
  );
}

