import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  User, 
  FileText, 
  Activity, 
  AlertCircle, 
  Video, 
  Edit, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Thermometer, 
  Weight, 
  Droplets, 
  Eye, 
  Brain, 
  Pill, 
  Stethoscope, 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Plus,
  CheckCircle,
  Shield,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PatientRecord() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddVitalModal, setShowAddVitalModal] = useState(false);
  const [selectedVital, setSelectedVital] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const patient = {
    id: patientId || '1',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'A+',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    dateOfBirth: '1978-05-15',
    occupation: 'Software Engineer',
    insurance: 'Blue Cross Blue Shield',
    insuranceId: 'BCBS123456789',
    primaryCarePhysician: 'Dr. Emily Chen',
    lastVisit: '2025-10-05',
    nextAppointment: '2025-11-05',
    patientSince: '2020-03-15',
    avatar: '👨',
    status: 'active'
  };

  const medicalHistory = {
    conditions: [
      { name: 'Hypertension', status: 'controlled', diagnosisDate: '2020-06-15', severity: 'moderate' },
      { name: 'Type 2 Diabetes', status: 'controlled', diagnosisDate: '2021-03-20', severity: 'mild' }
    ],
    allergies: [
      { allergen: 'Penicillin', severity: 'severe', reaction: 'Rash, difficulty breathing' },
      { allergen: 'Peanuts', severity: 'moderate', reaction: 'Hives, stomach upset' }
    ],
    surgeries: [
      { procedure: 'Appendectomy', date: '2018-08-15', surgeon: 'Dr. Michael Smith', outcome: 'Successful' }
    ],
    familyHistory: [
      { relation: 'Father', condition: 'Heart Disease', age: '65', status: 'deceased' },
      { relation: 'Mother', condition: 'Diabetes', age: '58', status: 'alive' }
    ],
    immunizations: [
      { vaccine: 'COVID-19', date: '2021-03-15', dose: '2', status: 'completed' },
      { vaccine: 'Flu Shot', date: '2024-10-01', dose: '1', status: 'completed' }
    ]
  };

  const vitals = [
    { 
      id: 1,
      date: '2025-10-05', 
      bp: { systolic: 120, diastolic: 80 }, 
      hr: 72, 
      temp: 98.6, 
      weight: 165, 
      glucose: 105,
      oxygen: 98,
      notes: 'Patient reports feeling well',
      takenBy: 'Dr. Sarah Johnson'
    },
    { 
      id: 2,
      date: '2025-09-15', 
      bp: { systolic: 125, diastolic: 82 }, 
      hr: 74, 
      temp: 98.5, 
      weight: 166, 
      glucose: 110,
      oxygen: 97,
      notes: 'Slight elevation in blood pressure',
      takenBy: 'Dr. Sarah Johnson'
    },
    { 
      id: 3,
      date: '2025-08-20', 
      bp: { systolic: 118, diastolic: 78 }, 
      hr: 70, 
      temp: 98.4, 
      weight: 167, 
      glucose: 108,
      oxygen: 99,
      notes: 'All values within normal range',
      takenBy: 'Dr. Sarah Johnson'
    }
  ];

  const consultations = [
    { 
      id: 1,
      date: '2025-10-05', 
      type: 'Follow-up', 
      diagnosis: 'Hypertension management', 
      notes: 'BP stable, continue current medication',
      duration: 30,
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      followUp: '2025-11-05',
      symptoms: ['Headache', 'Dizziness'],
      treatment: 'Medication adjustment',
      recommendations: 'Continue current medication, lifestyle modifications'
    },
    { 
      id: 2,
      date: '2025-09-15', 
      type: 'Routine Check-up', 
      diagnosis: 'General wellness', 
      notes: 'All parameters normal',
      duration: 45,
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      followUp: '2025-10-15',
      symptoms: [],
      treatment: 'Monitoring',
      recommendations: 'Annual physical examination'
    },
  ];

  const prescriptions = [
    { 
      id: 1,
      date: '2025-10-05', 
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: '1 daily', duration: '30 days', instructions: 'Take with food' },
        { name: 'Metformin', dosage: '500mg', frequency: '2 daily', duration: '30 days', instructions: 'Take with meals' },
        { name: 'Aspirin', dosage: '81mg', frequency: '1 daily', duration: 'ongoing', instructions: 'Take in morning' }
      ],
      notes: 'Continue for 30 days, monitor blood pressure',
      prescribedBy: 'Dr. Sarah Johnson',
      status: 'active',
      refills: 3
    },
  ];

  const labResults = [
    {
      id: 1,
      date: '2025-10-03',
      type: 'Blood Work',
      tests: [
        { name: 'Hemoglobin A1C', value: '6.2%', normal: '4.0-5.6%', status: 'elevated' },
        { name: 'Total Cholesterol', value: '185 mg/dL', normal: '<200 mg/dL', status: 'normal' },
        { name: 'LDL Cholesterol', value: '110 mg/dL', normal: '<100 mg/dL', status: 'elevated' },
        { name: 'HDL Cholesterol', value: '45 mg/dL', normal: '>40 mg/dL', status: 'normal' }
      ],
      status: 'completed',
      orderedBy: 'Dr. Sarah Johnson'
    }
  ];

  // Utility functions

  const getVitalIcon = (status: string) => {
    switch (status) {
      case 'high': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'low': return <TrendingDown className="w-4 h-4 text-blue-500" />;
      default: return <Minus className="w-4 h-4 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'mild': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Patient Header */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {patient.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
                  <Badge variant="outline" className="text-sm">
                    {patient.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{patient.age} years • {patient.gender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      <span>Blood Type: {patient.bloodType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>DOB: {patient.dateOfBirth}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/video-call')}>
                <Video className="w-4 h-4 mr-2" />
                Start Consultation
              </Button>
              <Button variant="outline" onClick={() => navigate('/doctor/write-prescription')}>
                <FileText className="w-4 h-4 mr-2" />
                Write Prescription
              </Button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Primary Care</span>
              </div>
              <p className="text-sm text-blue-600">{patient.primaryCarePhysician}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Last Visit</span>
              </div>
              <p className="text-sm text-green-600">{patient.lastVisit}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Next Appointment</span>
              </div>
              <p className="text-sm text-purple-600">{patient.nextAppointment}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Insurance</span>
              </div>
              <p className="text-sm text-orange-600">{patient.insurance}</p>
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
          <TabsTrigger active={activeTab === 'consultations'} onClick={() => setActiveTab('consultations')}>
            Consultations
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'prescriptions'} onClick={() => setActiveTab('prescriptions')}>
            Prescriptions
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'labs'} onClick={() => setActiveTab('labs')}>
            Lab Results
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Alerts & Warnings */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Alerts & Warnings
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {medicalHistory.allergies.map((allergy, idx) => (
                      <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between">
                          <Badge variant="destructive" className="text-xs">
                            Allergy
                          </Badge>
                          <Badge className={`text-xs ${getSeverityColor(allergy.severity)}`}>
                            {allergy.severity}
                          </Badge>
                        </div>
                        <p className="font-semibold text-red-800 mt-1">{allergy.allergen}</p>
                        <p className="text-xs text-red-600 mt-1">{allergy.reaction}</p>
                      </div>
                    ))}
                    {medicalHistory.conditions.map((condition, idx) => (
                      <div key={idx} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            Condition
                          </Badge>
                          <Badge className={`text-xs ${getSeverityColor(condition.severity)}`}>
                            {condition.severity}
                          </Badge>
                        </div>
                        <p className="font-semibold text-yellow-800 mt-1">{condition.name}</p>
                        <p className="text-xs text-yellow-600 mt-1">Status: {condition.status}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Latest Vitals */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Latest Vitals
                    </h2>
                    <Button size="sm" variant="outline" onClick={() => setShowAddVitalModal(true)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Blood Pressure</span>
                        </div>
                        {getVitalIcon('normal')}
                      </div>
                      <p className="font-semibold text-lg mt-1">{vitals[0].bp.systolic}/{vitals[0].bp.diastolic} mmHg</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-600">Heart Rate</span>
                        </div>
                        {getVitalIcon('normal')}
                      </div>
                      <p className="font-semibold text-lg mt-1">{vitals[0].hr} bpm</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-gray-600">Temperature</span>
                        </div>
                        {getVitalIcon('normal')}
                      </div>
                      <p className="font-semibold text-lg mt-1">{vitals[0].temp}°F</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">Blood Glucose</span>
                        </div>
                        {getVitalIcon('normal')}
                      </div>
                      <p className="font-semibold text-lg mt-1">{vitals[0].glucose} mg/dL</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Last updated: {vitals[0].date}</p>
                </CardContent>
              </Card>

              {/* Current Medications */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Pill className="w-5 h-5 text-purple-600" />
                    Current Medications
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {prescriptions[0].medications.map((med, idx) => (
                      <div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="font-semibold text-purple-800">{med.name}</p>
                        <p className="text-sm text-purple-600">{med.dosage} • {med.frequency}</p>
                        <p className="text-xs text-purple-500 mt-1">{med.instructions}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => navigate('/doctor/write-prescription')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Medication
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white mt-6">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Recent Activity
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {consultations.map((consultation, idx) => (
                    <div key={idx} className="border-l-4 border-teal-500 pl-4 py-3 hover:bg-gray-50 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{consultation.type}</p>
                            <Badge variant="outline" className="text-xs">
                              {consultation.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{consultation.diagnosis}</p>
                          <p className="text-sm text-gray-500">{consultation.notes}</p>
                          {consultation.symptoms.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {consultation.symptoms.map((symptom, sIdx) => (
                                <Badge key={sIdx} variant="secondary" className="text-xs">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{consultation.date}</span>
                          <p className="text-xs text-gray-400">{consultation.duration} min</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'vitals' && (
          <TabsContent value="vitals">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Vital Signs History</h2>
                  <Button onClick={() => setShowAddVitalModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Vitals
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-32">Date</TableHead>
                      <TableHead>Blood Pressure</TableHead>
                      <TableHead>Heart Rate</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Glucose</TableHead>
                      <TableHead>Oxygen</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vitals.map((vital) => (
                      <TableRow key={vital.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{vital.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{vital.bp.systolic}/{vital.bp.diastolic}</span>
                            <span className="text-xs text-gray-500">mmHg</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{vital.hr}</span>
                            <span className="text-xs text-gray-500">bpm</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{vital.temp}</span>
                            <span className="text-xs text-gray-500">°F</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{vital.weight}</span>
                            <span className="text-xs text-gray-500">lbs</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{vital.glucose}</span>
                            <span className="text-xs text-gray-500">mg/dL</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{vital.oxygen}</span>
                            <span className="text-xs text-gray-500">%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button size="sm" variant="ghost" onClick={() => setSelectedVital(vital)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'history' && (
          <TabsContent value="history">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Conditions */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Current Conditions
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {medicalHistory.conditions.map((condition, idx) => (
                      <div key={idx} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-orange-800">{condition.name}</h3>
                          <Badge className={`text-xs ${getSeverityColor(condition.severity)}`}>
                            {condition.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-orange-600 mb-1">Status: {condition.status}</p>
                        <p className="text-xs text-orange-500">Diagnosed: {condition.diagnosisDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Allergies */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Allergies
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {medicalHistory.allergies.map((allergy, idx) => (
                      <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-red-800">{allergy.allergen}</h3>
                          <Badge className={`text-xs ${getSeverityColor(allergy.severity)}`}>
                            {allergy.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-red-600">{allergy.reaction}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Past Surgeries */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Past Surgeries
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {medicalHistory.surgeries.map((surgery, idx) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-1">{surgery.procedure}</h3>
                        <p className="text-sm text-blue-600 mb-1">Date: {surgery.date}</p>
                        <p className="text-sm text-blue-600 mb-1">Surgeon: {surgery.surgeon}</p>
                        <p className="text-xs text-blue-500">Outcome: {surgery.outcome}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Family History */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Family History
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {medicalHistory.familyHistory.map((history, idx) => (
                      <div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-purple-800 mb-1">{history.relation}</h3>
                        <p className="text-sm text-purple-600 mb-1">Condition: {history.condition}</p>
                        <p className="text-sm text-purple-600 mb-1">Age: {history.age}</p>
                        <p className="text-xs text-purple-500">Status: {history.status}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Immunizations */}
              <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Immunizations
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {medicalHistory.immunizations.map((immunization, idx) => (
                      <div key={idx} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-800">{immunization.vaccine}</h3>
                          <Badge variant="outline" className="text-xs">
                            {immunization.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-green-600 mb-1">Date: {immunization.date}</p>
                        <p className="text-sm text-green-600">Dose: {immunization.dose}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Consultations Tab */}
        {activeTab === 'consultations' && (
          <TabsContent value="consultations">
            <div className="space-y-6">
              {/* Consultation History */}
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Consultation History
                  </h2>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/doctor/schedule')}>
                    <Plus className="w-4 h-4 mr-2" /> New Consultation
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {consultations.map((consultation, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{consultation.type}</h3>
                            <p className="text-sm text-gray-600">{consultation.date} • {consultation.time}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {consultation.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Primary Diagnosis</h4>
                            <p className="text-blue-600">{consultation.diagnosis}</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-2">Treatment Plan</h4>
                            <p className="text-green-600">{consultation.treatmentPlan || 'Follow-up required'}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Consultation Notes</h4>
                          <p className="text-gray-700 text-sm mb-3">{consultation.notes}</p>
                          
                          {consultation.symptoms.length > 0 && (
                            <div className="mb-3">
                              <h5 className="font-medium text-gray-800 mb-2">Reported Symptoms</h5>
                              <div className="flex flex-wrap gap-2">
                                {consultation.symptoms.map((symptom, symIdx) => (
                                  <Badge key={symIdx} variant="outline" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Duration: {consultation.duration || '30 minutes'}</span>
                            <span>Follow-up: {consultation.followUp || 'Not scheduled'}</span>
                            <span>Doctor: {consultation.doctor || 'Dr. Smith'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Consultations</p>
                        <p className="text-2xl font-bold text-blue-600">{consultations.length}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-green-600">
                          {consultations.filter(c => new Date(c.date).getMonth() === new Date().getMonth()).length}
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Follow-ups Due</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {consultations.filter(c => c.followUp && new Date(c.followUp) <= new Date()).length}
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        )}

        {activeTab === 'prescriptions' && (
          <TabsContent value="prescriptions">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-purple-600" />
                  Prescription History
                </h2>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/doctor/write-prescription')}>
                  <Plus className="w-4 h-4 mr-2" /> New Prescription
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{prescription.date}</h3>
                          <p className="text-sm text-gray-600">Prescribed by: {prescription.prescribedBy}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {prescription.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Full
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {prescription.medications.map((med, medIdx) => (
                          <div key={medIdx} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-purple-800">{med.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {med.duration}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <p className="text-purple-600"><span className="font-medium">Dosage:</span> {med.dosage}</p>
                              <p className="text-purple-600"><span className="font-medium">Frequency:</span> {med.frequency}</p>
                            </div>
                            <p className="text-xs text-purple-500 mt-2">{med.instructions}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{prescription.notes}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Refills: {prescription.refills}</span>
                          <span>Status: {prescription.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {activeTab === 'labs' && (
          <TabsContent value="labs">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Lab Results
                </h2>
                <Button variant="outline" onClick={() => navigate('/doctor/write-prescription')}>
                  <Plus className="w-4 h-4 mr-2" /> Order Labs
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {labResults.map((lab) => (
                    <div key={lab.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{lab.type}</h3>
                          <p className="text-sm text-gray-600">Date: {lab.date}</p>
                          <p className="text-sm text-gray-600">Ordered by: {lab.orderedBy}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {lab.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {lab.tests.map((test, testIdx) => (
                          <div key={testIdx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-blue-800">{test.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  className={`text-xs ${
                                    test.status === 'normal' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {test.status}
                                </Badge>
                                {test.status === 'elevated' && <TrendingUp className="w-4 h-4 text-red-500" />}
                                {test.status === 'normal' && <CheckCircle className="w-4 h-4 text-green-500" />}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <p className="text-blue-600"><span className="font-medium">Value:</span> {test.value}</p>
                              <p className="text-blue-600"><span className="font-medium">Normal Range:</span> {test.normal}</p>
                            </div>
                          </div>
                        ))}
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
