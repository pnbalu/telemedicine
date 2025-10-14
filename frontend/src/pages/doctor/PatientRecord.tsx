import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { User, FileText, Activity, AlertCircle, Video, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PatientRecord() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const patient = {
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'A+',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543'
  };

  const medicalHistory = {
    conditions: ['Hypertension', 'Type 2 Diabetes (controlled)'],
    allergies: ['Penicillin', 'Peanuts'],
    surgeries: ['Appendectomy (2018)'],
    familyHistory: ['Father: Heart Disease', 'Mother: Diabetes']
  };

  const vitals = [
    { date: '2025-10-05', bp: '120/80', hr: 72, temp: 98.6, weight: 165, glucose: 105 },
    { date: '2025-09-15', bp: '125/82', hr: 74, temp: 98.5, weight: 166, glucose: 110 },
  ];

  const consultations = [
    { date: '2025-10-05', type: 'Follow-up', diagnosis: 'Hypertension management', notes: 'BP stable, continue current medication' },
    { date: '2025-09-15', type: 'Routine Check-up', diagnosis: 'General wellness', notes: 'All parameters normal' },
  ];

  const prescriptions = [
    { 
      date: '2025-10-05', 
      medications: ['Lisinopril 10mg - 1 daily', 'Metformin 500mg - 2 daily', 'Aspirin 81mg - 1 daily'],
      notes: 'Continue for 30 days'
    },
  ];

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Patient Header */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{patient.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>{patient.age} years • {patient.gender}</span>
                  <span>Blood Type: {patient.bloodType}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">📞 {patient.phone}</span>
                  <span className="text-sm text-gray-600">✉️ {patient.email}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/video-call')}>
                <Video className="w-4 h-4 mr-2" /> Start Consultation
              </Button>
              <Button variant="outline" onClick={() => navigate('/doctor/write-prescription')}>
                <FileText className="w-4 h-4 mr-2" /> Write Prescription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab}>
        <TabsList className="w-full justify-start mb-6 bg-white border border-gray-200 shadow-sm">
          <TabsTrigger active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'vitals'} onClick={() => setActiveTab('vitals')}>
            Vital Signs
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
            Medical History
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'prescriptions'} onClick={() => setActiveTab('prescriptions')}>
            Prescriptions
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'consultations'} onClick={() => setActiveTab('consultations')}>
            Consultations
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Alerts & Warnings
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {medicalHistory.allergies.map((allergy, idx) => (
                      <Badge key={idx} variant="destructive" className="mr-2">
                        Allergy: {allergy}
                      </Badge>
                    ))}
                    {medicalHistory.conditions.map((condition, idx) => (
                      <Badge key={idx} variant="warning" className="mr-2">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Latest Vitals
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm text-gray-600">BP</p>
                      <p className="font-semibold">{vitals[0].bp}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm text-gray-600">Heart Rate</p>
                      <p className="font-semibold">{vitals[0].hr} bpm</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="font-semibold">{vitals[0].temp}°F</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm text-gray-600">Glucose</p>
                      <p className="font-semibold">{vitals[0].glucose} mg/dL</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Recent Consultations</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {consultations.map((consultation, idx) => (
                      <div key={idx} className="border-l-4 border-teal-600 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{consultation.type}</p>
                            <p className="text-sm text-gray-600">{consultation.diagnosis}</p>
                            <p className="text-sm text-gray-500 mt-1">{consultation.notes}</p>
                          </div>
                          <span className="text-sm text-gray-500">{consultation.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {activeTab === 'vitals' && (
          <TabsContent value="vitals">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-lg font-semibold">Vital Signs History</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">BP</th>
                        <th className="text-left p-3">Heart Rate</th>
                        <th className="text-left p-3">Temp</th>
                        <th className="text-left p-3">Weight</th>
                        <th className="text-left p-3">Glucose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitals.map((vital, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-3">{vital.date}</td>
                          <td className="p-3">{vital.bp}</td>
                          <td className="p-3">{vital.hr} bpm</td>
                          <td className="p-3">{vital.temp}°F</td>
                          <td className="p-3">{vital.weight} lbs</td>
                          <td className="p-3">{vital.glucose} mg/dL</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'history' && (
          <TabsContent value="history">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Current Conditions</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="list-disc list-inside space-y-1">
                    {medicalHistory.conditions.map((condition, idx) => (
                      <li key={idx} className="text-sm">{condition}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Allergies</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="list-disc list-inside space-y-1">
                    {medicalHistory.allergies.map((allergy, idx) => (
                      <li key={idx} className="text-sm text-red-600 font-semibold">{allergy}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Past Surgeries</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="list-disc list-inside space-y-1">
                    {medicalHistory.surgeries.map((surgery, idx) => (
                      <li key={idx} className="text-sm">{surgery}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Family History</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="list-disc list-inside space-y-1">
                    {medicalHistory.familyHistory.map((history, idx) => (
                      <li key={idx} className="text-sm">{history}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {activeTab === 'prescriptions' && (
          <TabsContent value="prescriptions">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-semibold">Prescription History</h2>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => navigate('/doctor/write-prescription')}>
                  <Edit className="w-4 h-4 mr-2" /> New Prescription
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {prescriptions.map((prescription, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <p className="font-semibold">{prescription.date}</p>
                        <Button variant="outline" size="sm">View Full</Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded space-y-1">
                        {prescription.medications.map((med, medIdx) => (
                          <p key={medIdx} className="text-sm">• {med}</p>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{prescription.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
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
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Patient Record' }]}>
      {content}
    </DesktopLayout>
  );
}
