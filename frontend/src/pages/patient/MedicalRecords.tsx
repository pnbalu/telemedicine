import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { ArrowLeft, FileText, Activity, Heart, Droplet, TestTube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MedicalRecords() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const vitalSigns = [
    { date: '2025-10-05', bp: '120/80', heartRate: 72, temp: 98.6, weight: 165 },
    { date: '2025-09-28', bp: '118/78', heartRate: 70, temp: 98.4, weight: 166 },
    { date: '2025-09-15', bp: '122/82', heartRate: 74, temp: 98.5, weight: 164 },
  ];

  const labResults = [
    { date: '2025-09-20', test: 'Complete Blood Count', status: 'Normal', doctor: 'Dr. Sarah Johnson' },
    { date: '2025-08-15', test: 'Lipid Panel', status: 'Borderline High', doctor: 'Dr. Sarah Johnson' },
    { date: '2025-07-10', test: 'Blood Glucose', status: 'Normal', doctor: 'Dr. Emily Davis' },
  ];

  const consultations = [
    { date: '2025-10-05', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', diagnosis: 'Hypertension management', notes: 'BP stable, continue current medication' },
    { date: '2025-09-28', doctor: 'Dr. Emily Davis', specialty: 'General Physician', diagnosis: 'Common Cold', notes: 'Viral infection' },
  ];

  const allergies = ['Penicillin', 'Peanuts'];
  const conditions = ['Hypertension', 'Type 2 Diabetes (controlled)'];

  const content = (
    <div className={isDesktop ? "p-8" : "p-6"}>
      {!isDesktop && (
        <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')} className="mb-4 -ml-2">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </Button>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="w-8 h-8 text-teal-600" />
          Medical Records
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Export Records
        </Button>
      </div>

      <Tabs value={activeTab} className="space-y-4">
        <TabsList className="w-full justify-start bg-white border border-gray-200 shadow-sm">
          <TabsTrigger active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'vitals'} onClick={() => setActiveTab('vitals')}>
            Vital Signs
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'labs'} onClick={() => setActiveTab('labs')}>
            Lab Results
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'consultations'} onClick={() => setActiveTab('consultations')}>
            Consultations
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Current Conditions
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {conditions.map((condition, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-orange-600" />
                    Allergies
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {allergies.map((allergy, idx) => (
                      <Badge key={idx} variant="destructive" className="mr-2 mb-2">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Recent Vital Signs</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{vitalSigns[0].bp}</p>
                      <p className="text-sm text-gray-600">Blood Pressure</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{vitalSigns[0].heartRate}</p>
                      <p className="text-sm text-gray-600">Heart Rate</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{vitalSigns[0].temp}°F</p>
                      <p className="text-sm text-gray-600">Temperature</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{vitalSigns[0].weight} lbs</p>
                      <p className="text-sm text-gray-600">Weight</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Vital Signs Tab */}
        {activeTab === 'vitals' && (
          <TabsContent value="vitals">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-lg font-semibold">Vital Signs History</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Blood Pressure</th>
                        <th className="text-left p-3">Heart Rate</th>
                        <th className="text-left p-3">Temperature</th>
                        <th className="text-left p-3">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vitalSigns.map((vital, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-3">{vital.date}</td>
                          <td className="p-3">{vital.bp} mmHg</td>
                          <td className="p-3">{vital.heartRate} bpm</td>
                          <td className="p-3">{vital.temp}°F</td>
                          <td className="p-3">{vital.weight} lbs</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'labs' && (
          <TabsContent value="labs">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  Laboratory Test Results
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {labResults.map((lab, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{lab.test}</h3>
                          <p className="text-sm text-gray-600">Ordered by: {lab.doctor}</p>
                          <p className="text-sm text-gray-500">{lab.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={lab.status === 'Normal' ? 'success' : 'warning'}>
                            {lab.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <TabsContent value="consultations">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-lg font-semibold">Consultation History</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {consultations.map((consultation, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{consultation.doctor}</h3>
                          <p className="text-sm text-gray-600">{consultation.specialty}</p>
                          <p className="text-sm text-gray-500">{consultation.date}</p>
                          <div className="mt-2">
                            <p className="text-sm"><span className="font-semibold">Diagnosis:</span> {consultation.diagnosis}</p>
                            <p className="text-sm"><span className="font-semibold">Notes:</span> {consultation.notes}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Full Record
                        </Button>
                      </div>
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-teal-700">TeleMedX</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Medical Records' }]}>
      {content}
    </DesktopLayout>
  );
}
