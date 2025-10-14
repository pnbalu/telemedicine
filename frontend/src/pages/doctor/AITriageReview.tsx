import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Brain,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Activity,
  FileText,
  Video,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { SymptomAnalysis } from '@/services/aiSymptomService';

interface PatientTriage {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  submittedAt: Date;
  status: 'pending' | 'reviewed' | 'scheduled' | 'resolved';
  analysis: SymptomAnalysis;
  symptoms: Array<{ name: string; severity: string; duration: string }>;
  vitalSigns?: {
    temperature?: number;
    heartRate?: number;
    bloodPressure?: string;
  };
  medicalHistory: string[];
  currentMedications: string[];
  doctorNotes?: string;
  reviewedBy?: string;
  reviewedAt?: Date;
}

export default function AITriageReview() {
  const navigate = useNavigate();
  const [triageRequests, setTriageRequests] = useState<PatientTriage[]>([
    {
      id: 'triage001',
      patientName: 'Sarah Mitchell',
      patientId: 'P12345',
      age: 42,
      gender: 'Female',
      submittedAt: new Date('2025-10-11T08:30:00'),
      status: 'pending',
      symptoms: [
        { name: 'Chest Pain', severity: 'severe', duration: '2 hours' },
        { name: 'Difficulty Breathing', severity: 'moderate', duration: '3 hours' }
      ],
      vitalSigns: {
        temperature: 98.9,
        heartRate: 110,
        bloodPressure: '145/95'
      },
      medicalHistory: ['Hypertension', 'High Cholesterol'],
      currentMedications: ['Lisinopril', 'Atorvastatin'],
      analysis: {
        triageLevel: 'emergency',
        urgencyScore: 92,
        aiConfidence: 88,
        possibleConditions: [
          {
            name: 'Cardiac Event (Requires Emergency Evaluation)',
            probability: 85,
            description: 'Possible heart-related condition requiring immediate assessment',
            recommendations: [
              'Call 911 immediately',
              'ECG and cardiac enzymes',
              'Chest X-Ray',
              'Continuous monitoring'
            ]
          }
        ],
        recommendedAction: '🚨 Seek Emergency Care Immediately - Call 911 or go to the nearest emergency room.',
        recommendedSpecialty: 'Cardiologist',
        warningFlags: ['Cardiac emergency possible - Seek immediate medical attention'],
        suggestedTests: ['ECG (Electrocardiogram)', 'Cardiac Enzymes Blood Test', 'Chest X-Ray'],
        timestamp: new Date('2025-10-11T08:30:00')
      }
    },
    {
      id: 'triage002',
      patientName: 'Michael Chen',
      patientId: 'P12346',
      age: 28,
      gender: 'Male',
      submittedAt: new Date('2025-10-11T09:15:00'),
      status: 'pending',
      symptoms: [
        { name: 'Fever', severity: 'moderate', duration: '3 days' },
        { name: 'Cough', severity: 'moderate', duration: '4 days' },
        { name: 'Fatigue', severity: 'mild', duration: '3 days' }
      ],
      vitalSigns: {
        temperature: 101.5,
        heartRate: 88,
        bloodPressure: '118/76'
      },
      medicalHistory: [],
      currentMedications: [],
      analysis: {
        triageLevel: 'urgent',
        urgencyScore: 58,
        aiConfidence: 82,
        possibleConditions: [
          {
            name: 'Upper Respiratory Infection',
            probability: 75,
            description: 'Common viral or bacterial infection affecting the respiratory system',
            recommendations: [
              'Rest and hydration',
              'Over-the-counter fever reducers',
              'Monitor symptoms for worsening',
              'Consult doctor if symptoms persist beyond 7 days'
            ]
          },
          {
            name: 'Influenza',
            probability: 60,
            description: 'Viral infection causing fever, body aches, and respiratory symptoms',
            recommendations: [
              'Antiviral medications if within 48 hours of symptom onset',
              'Rest and fluids',
              'Isolate from others',
              'Monitor for complications'
            ]
          }
        ],
        recommendedAction: '⚠️ Schedule Urgent Care Visit - Contact healthcare provider within 24 hours.',
        recommendedSpecialty: 'General Physician',
        warningFlags: [],
        suggestedTests: ['Rapid Flu Test', 'Complete Blood Count (CBC)', 'Chest X-Ray'],
        timestamp: new Date('2025-10-11T09:15:00')
      }
    },
    {
      id: 'triage003',
      patientName: 'Emily Rodriguez',
      patientId: 'P12347',
      age: 35,
      gender: 'Female',
      submittedAt: new Date('2025-10-10T14:20:00'),
      status: 'reviewed',
      symptoms: [
        { name: 'Headache', severity: 'moderate', duration: '2 days' },
        { name: 'Nausea', severity: 'mild', duration: '1 day' }
      ],
      vitalSigns: {
        temperature: 98.6,
        heartRate: 75,
        bloodPressure: '120/80'
      },
      medicalHistory: ['Migraines'],
      currentMedications: ['Sumatriptan'],
      analysis: {
        triageLevel: 'routine',
        urgencyScore: 35,
        aiConfidence: 85,
        possibleConditions: [
          {
            name: 'Tension Headache',
            probability: 70,
            description: 'Common headache often caused by stress or muscle tension',
            recommendations: [
              'Over-the-counter pain relievers',
              'Rest in quiet, dark room',
              'Stress management techniques',
              'Ensure adequate sleep and hydration'
            ]
          },
          {
            name: 'Migraine',
            probability: 45,
            description: 'Neurological condition causing severe headaches',
            recommendations: [
              'Prescription migraine medications',
              'Avoid triggers',
              'Rest in dark, quiet environment',
              'Consult neurologist for management plan'
            ]
          }
        ],
        recommendedAction: '📅 Schedule Regular Appointment - Book within 1-3 days.',
        recommendedSpecialty: 'Neurologist',
        warningFlags: [],
        suggestedTests: [],
        timestamp: new Date('2025-10-10T14:20:00')
      },
      doctorNotes: 'Reviewed patient history. Appears to be migraine related. Scheduled follow-up for medication adjustment.',
      reviewedBy: 'Dr. Sarah Johnson',
      reviewedAt: new Date('2025-10-10T15:00:00')
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [selectedTriage, setSelectedTriage] = useState<PatientTriage | null>(null);
  const [doctorNotes, setDoctorNotes] = useState('');

  const getTriageLevelColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'routine': return 'bg-blue-500';
      case 'self-care': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'reviewed': return 'secondary';
      case 'scheduled': return 'default';
      case 'resolved': return 'success';
      default: return 'secondary';
    }
  };

  const handleReview = (triageId: string, action: 'approve' | 'modify' | 'schedule') => {
    setTriageRequests(prev => prev.map(t => 
      t.id === triageId 
        ? { 
            ...t, 
            status: action === 'schedule' ? 'scheduled' : 'reviewed',
            doctorNotes,
            reviewedBy: 'Dr. Sarah Johnson',
            reviewedAt: new Date()
          }
        : t
    ));
    
    if (action === 'schedule') {
      alert('Redirecting to schedule appointment...');
      // navigate(`/doctor/calendar?patientId=${selectedTriage?.patientId}`);
    }
    
    setSelectedTriage(null);
    setDoctorNotes('');
  };

  const filteredTriageRequests = triageRequests.filter(t => {
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (filterLevel !== 'all' && t.analysis.triageLevel !== filterLevel) return false;
    return true;
  });

  const pendingCount = triageRequests.filter(t => t.status === 'pending').length;
  const emergencyCount = triageRequests.filter(t => t.analysis.triageLevel === 'emergency' && t.status === 'pending').length;

  return (
    <DesktopLayout 
      role="doctor" 
      userName="Dr. Sarah Johnson" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/doctor/dashboard' },
        { label: 'AI Triage Review' }
      ]}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Triage Review</h1>
            <p className="text-gray-600 mt-1">Review and manage AI-generated patient symptom assessments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Alert Banner for Emergency Cases */}
        {emergencyCount > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">
                  {emergencyCount} Emergency {emergencyCount === 1 ? 'Case' : 'Cases'} Requiring Immediate Attention
                </p>
                <p className="text-sm text-red-700">
                  These patients have been flagged by AI as requiring emergency care
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{pendingCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Emergency</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{emergencyCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reviewed Today</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {triageRequests.filter(t => t.status === 'reviewed').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Accuracy</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">92%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex gap-4 flex-1">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                >
                  <option value="all">All Urgency Levels</option>
                  <option value="emergency">Emergency</option>
                  <option value="urgent">Urgent</option>
                  <option value="routine">Routine</option>
                  <option value="self-care">Self-Care</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Triage List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTriageRequests.map((triage) => (
            <Card 
              key={triage.id} 
              className={`border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow ${
                triage.analysis.triageLevel === 'emergency' ? 'border-l-4 border-l-red-500' : ''
              }`}
              onClick={() => setSelectedTriage(triage)}
            >
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {triage.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{triage.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        ID: {triage.patientId} • {triage.age}y • {triage.gender} • Submitted {triage.submittedAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(triage.status)} className="capitalize">
                      {triage.status}
                    </Badge>
                    <div className={`px-4 py-2 rounded-lg ${getTriageLevelColor(triage.analysis.triageLevel)} text-white font-semibold capitalize`}>
                      {triage.analysis.triageLevel}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{triage.analysis.urgencyScore}</p>
                      <p className="text-xs text-gray-600">Urgency Score</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Symptoms</h4>
                    <ul className="space-y-1">
                      {triage.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          <Badge variant="outline" className="mr-2 capitalize text-xs">
                            {symptom.severity}
                          </Badge>
                          {symptom.name} ({symptom.duration})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vital Signs</h4>
                    {triage.vitalSigns && (
                      <div className="space-y-1 text-sm">
                        {triage.vitalSigns.temperature && (
                          <p className="text-gray-700">
                            <span className="font-medium">Temp:</span> {triage.vitalSigns.temperature}°F
                          </p>
                        )}
                        {triage.vitalSigns.heartRate && (
                          <p className="text-gray-700">
                            <span className="font-medium">HR:</span> {triage.vitalSigns.heartRate} bpm
                          </p>
                        )}
                        {triage.vitalSigns.bloodPressure && (
                          <p className="text-gray-700">
                            <span className="font-medium">BP:</span> {triage.vitalSigns.bloodPressure}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI Assessment</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Confidence:</span> {triage.analysis.aiConfidence}%
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Specialty:</span> {triage.analysis.recommendedSpecialty}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Top Condition:</span> {triage.analysis.possibleConditions[0]?.name.substring(0, 40)}...
                      </p>
                    </div>
                  </div>
                </div>

                {triage.analysis.warningFlags.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-sm font-medium text-red-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {triage.analysis.warningFlags[0]}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Patient Record
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Review Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedTriage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTriage.patientName}</h2>
                    <p className="text-gray-600">Complete AI Triage Assessment</p>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedTriage(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Full AI Analysis */}
                <div className={`p-6 rounded-xl ${getTriageLevelColor(selectedTriage.analysis.triageLevel)} text-white`}>
                  <h3 className="text-xl font-bold mb-2 capitalize">
                    {selectedTriage.analysis.triageLevel} - Urgency Score: {selectedTriage.analysis.urgencyScore}/100
                  </h3>
                  <p className="mb-4">{selectedTriage.analysis.recommendedAction}</p>
                  <div className="flex gap-4">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-xs opacity-80">AI Confidence</p>
                      <p className="text-lg font-bold">{selectedTriage.analysis.aiConfidence}%</p>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-xs opacity-80">Recommended Specialist</p>
                      <p className="text-lg font-bold">{selectedTriage.analysis.recommendedSpecialty}</p>
                    </div>
                  </div>
                </div>

                {/* Possible Conditions */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Possible Conditions</h3>
                  <div className="space-y-3">
                    {selectedTriage.analysis.possibleConditions.map((condition, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                          <Badge>{condition.probability}% Match</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{condition.description}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Recommendations:</p>
                          <ul className="mt-1 space-y-1">
                            {condition.recommendations.map((rec, ridx) => (
                              <li key={ridx} className="text-sm text-gray-600 ml-4">• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Tests */}
                {selectedTriage.analysis.suggestedTests && selectedTriage.analysis.suggestedTests.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Suggested Diagnostic Tests</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedTriage.analysis.suggestedTests.map((test, idx) => (
                        <div key={idx} className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                          <p className="text-sm font-medium text-teal-900">{test}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Doctor Notes */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Doctor's Assessment</h3>
                  <Textarea
                    placeholder="Add your notes and assessment..."
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    rows={4}
                    className="mb-3"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleReview(selectedTriage.id, 'approve')}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Approve AI Assessment
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleReview(selectedTriage.id, 'modify')}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Modify Assessment
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={() => handleReview(selectedTriage.id, 'schedule')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => navigate('/video-call')}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}

