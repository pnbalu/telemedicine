import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Search, FileText, Plus, Download, Edit, Eye, Pill } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Prescriptions() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prescriptions = [
    {
      id: 1,
      patient: 'John Doe',
      patientId: 1,
      date: '2025-10-05',
      diagnosis: 'Hypertension',
      medications: 3,
      status: 'Active',
      followUp: '2025-11-05',
      avatar: '👨'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      patientId: 2,
      date: '2025-10-04',
      diagnosis: 'Diabetes Management',
      medications: 2,
      status: 'Active',
      followUp: '2025-11-04',
      avatar: '👩'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      patientId: 3,
      date: '2025-10-03',
      diagnosis: 'Common Cold',
      medications: 2,
      status: 'Completed',
      followUp: 'None',
      avatar: '👨‍💼'
    },
    {
      id: 4,
      patient: 'Sarah Williams',
      patientId: 4,
      date: '2025-09-28',
      diagnosis: 'Allergic Rhinitis',
      medications: 1,
      status: 'Active',
      followUp: '2025-10-28',
      avatar: '👩‍💼'
    },
    {
      id: 5,
      patient: 'David Brown',
      patientId: 5,
      date: '2025-09-25',
      diagnosis: 'Heart Disease Follow-up',
      medications: 5,
      status: 'Active',
      followUp: '2025-10-25',
      avatar: '👨‍🦳'
    },
  ];

  const filteredPrescriptions = prescriptions.filter(rx =>
    rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage and track patient prescriptions</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
          onClick={() => navigate('/doctor/write-prescription')}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Prescription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Prescriptions</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">124</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">28</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
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
                placeholder="Search by patient name or diagnosis..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Table */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold">Prescription History</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Patient</TableHead>
                  <TableHead>Date Issued</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Medications</TableHead>
                  <TableHead>Follow-up</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-xl">
                          {prescription.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{prescription.patient}</p>
                          <p className="text-sm text-gray-500">ID: {prescription.patientId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{prescription.date}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{prescription.diagnosis}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold">{prescription.medications} medications</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{prescription.followUp}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={prescription.status === 'Active' ? 'success' : 'secondary'}>
                        {prescription.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
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
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Prescriptions' }]}>
      {content}
    </DesktopLayout>
  );
}

