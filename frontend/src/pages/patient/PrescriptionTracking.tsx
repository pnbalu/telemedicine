import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Pill,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  Bell,
  Package,
  Activity,
  Brain,
  ChevronRight,
  RefreshCcw,
  Eye,
  Download,
  BarChart3,
  Shield,
  Loader2
} from 'lucide-react';
import {
  prescriptionTrackingService,
  Prescription,
  MedicationReminder,
  PrescriptionAnalytics
} from '@/services/prescriptionTrackingService';

export default function PrescriptionTracking() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [reminders, setReminders] = useState<MedicationReminder[]>([]);
  const [analytics, setAnalytics] = useState<PrescriptionAnalytics | null>(null);
  const [aiInsights, setAiInsights] = useState<{
    insights: string[];
    warnings: string[];
    optimizations: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'medications' | 'reminders' | 'analytics'>('overview');
  const [expandedPrescription, setExpandedPrescription] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [rxData, reminderData, analyticsData, insightsData] = await Promise.all([
        prescriptionTrackingService.getActivePrescriptions('patient001'),
        prescriptionTrackingService.getMedicationReminders('patient001'),
        prescriptionTrackingService.getPrescriptionAnalytics('patient001'),
        prescriptionTrackingService.getAIPrescriptionInsights('patient001')
      ]);
      
      setPrescriptions(rxData);
      setReminders(reminderData);
      setAnalytics(analyticsData);
      setAiInsights(insightsData);
    } catch (error) {
      console.error('Error loading prescription data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMedicationTaken = async (medicationId: string) => {
    await prescriptionTrackingService.recordMedicationTaken(medicationId, true);
    // Refresh data
    loadData();
  };

  const handleRequestRefill = async (medicationId: string) => {
    const result = await prescriptionTrackingService.requestRefill(medicationId, 'pharmacy001');
    if (result.success) {
      alert(`Refill requested successfully! ID: ${result.refillId}\nEstimated ready time: ${result.estimatedReadyTime?.toLocaleString()}`);
    }
  };

  const renderOverview = () => {
    if (!analytics || !aiInsights) return null;

    return (
      <div className="space-y-6">
        {/* AI Insights Banner */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
                <div className="space-y-2">
                  {aiInsights.insights.map((insight, idx) => (
                    <p key={idx} className="text-white/90">{insight}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Active Medications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.activeMedications}</p>
              <p className="text-xs text-gray-500 mt-1">{analytics.totalPrescriptions} total prescriptions</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Adherence Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.overallAdherence}%</p>
              <p className="text-xs text-green-600 mt-1">
                {analytics.overallAdherence >= 90 ? 'Excellent!' : analytics.overallAdherence >= 80 ? 'Good' : 'Needs improvement'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Missed Doses</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.missedDoses}</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">Upcoming Refills</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.upcomingRefills.length}</p>
              <p className="text-xs text-gray-500 mt-1">Next 14 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Warnings */}
        {aiInsights.warnings.length > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
            <CardHeader className="bg-orange-50 border-b border-orange-100">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-bold text-orange-900">Attention Required</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2">
                {aiInsights.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-orange-800">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Drug Interactions */}
        {analytics.interactions.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-gray-900">Drug Interactions Detected</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {analytics.interactions.map((interaction, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    interaction.severity === 'severe' ? 'bg-red-50 border-red-200' :
                    interaction.severity === 'moderate' ? 'bg-orange-50 border-orange-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {interaction.medication1} + {interaction.medication2}
                      </p>
                    </div>
                    <Badge 
                      variant={interaction.severity === 'severe' ? 'destructive' : 'warning'}
                      className="capitalize"
                    >
                      {interaction.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{interaction.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* AI Optimizations */}
        {aiInsights.optimizations.length > 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="border-b border-indigo-100">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">AI Optimization Suggestions</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {aiInsights.optimizations.map((opt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700">{opt}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Refills */}
        {analytics.upcomingRefills.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Refills</h3>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/patient/pharmacy')}
                >
                  Go to Pharmacy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {analytics.upcomingRefills.map((refill, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div>
                    <p className="font-semibold text-gray-900">{refill.medicationName}</p>
                    <p className="text-sm text-gray-600">
                      {refill.daysRemaining} days remaining • {refill.pharmacy}
                    </p>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => handleRequestRefill('med-' + idx)}
                  >
                    <RefreshCcw className="w-4 h-4 mr-1" />
                    Request Refill
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderMedications = () => {
    return (
      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{prescription.doctorName}</h3>
                  <p className="text-sm text-gray-600">{prescription.doctorSpecialty} • Prescribed {new Date(prescription.prescribedDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-700 mt-1"><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                </div>
                <Badge 
                  variant={prescription.status === 'active' ? 'success' : 'secondary'}
                  className="capitalize"
                >
                  {prescription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {prescription.medications.map((medication) => (
                  <div 
                    key={medication.id}
                    className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Pill className="w-5 h-5 text-indigo-600" />
                          <h4 className="font-bold text-gray-900 text-lg">{medication.name}</h4>
                          <Badge variant="outline" className="capitalize text-xs">
                            {medication.route}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Dosage</p>
                            <p className="font-semibold text-gray-900">{medication.dosage}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Frequency</p>
                            <p className="font-semibold text-gray-900">{medication.frequency}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-semibold text-gray-900">{medication.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Refills Remaining</p>
                            <p className="font-semibold text-gray-900">{medication.refillsRemaining}</p>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleMedicationTaken(medication.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Taken
                      </Button>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-blue-900 mb-1">Instructions</p>
                      <p className="text-sm text-blue-800">{medication.instructions}</p>
                    </div>

                    {medication.sideEffects && medication.sideEffects.length > 0 && (
                      <div className="mt-3">
                        <button
                          onClick={() => setExpandedPrescription(expandedPrescription === medication.id ? null : medication.id)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                          <Eye className="w-4 h-4" />
                          {expandedPrescription === medication.id ? 'Hide' : 'Show'} Side Effects & Interactions
                          <ChevronRight className={`w-4 h-4 transition-transform ${expandedPrescription === medication.id ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {expandedPrescription === medication.id && (
                          <div className="mt-3 space-y-2">
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                              <p className="text-sm font-medium text-orange-900 mb-1">Possible Side Effects</p>
                              <ul className="text-sm text-orange-800 space-y-1">
                                {medication.sideEffects.map((effect, idx) => (
                                  <li key={idx}>• {effect}</li>
                                ))}
                              </ul>
                            </div>
                            
                            {medication.interactions && medication.interactions.length > 0 && (
                              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                <p className="text-sm font-medium text-red-900 mb-1">Drug Interactions</p>
                                <ul className="text-sm text-red-800 space-y-1">
                                  {medication.interactions.map((interaction, idx) => (
                                    <li key={idx}>• {interaction}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {prescription.notes && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-sm font-medium text-indigo-900 mb-1">Doctor's Notes</p>
                  <p className="text-sm text-indigo-800">{prescription.notes}</p>
                </div>
              )}

              {prescription.followUpDate && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">
                    Follow-up scheduled for <strong>{new Date(prescription.followUpDate).toLocaleDateString()}</strong>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderReminders = () => {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Medication Reminders</h3>
                <p className="text-gray-600">
                  Set up automatic reminders to never miss a dose. Enable notifications in your browser for real-time alerts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Active Reminders</h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {reminders.map((reminder) => (
              <div 
                key={reminder.id}
                className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-xl border border-purple-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${
                    reminder.enabled ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-300'
                  } flex items-center justify-center`}>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{reminder.medicationName}</h4>
                    <p className="text-sm text-gray-600">
                      Daily at {reminder.time}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">
                          {reminder.adherenceRate}% adherence
                        </span>
                      </div>
                      {reminder.lastTaken && (
                        <span className="text-xs text-gray-500">
                          Last taken: {new Date(reminder.lastTaken).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      prescriptionTrackingService.updateReminder(reminder.id, {
                        enabled: !reminder.enabled
                      });
                      loadData();
                    }}
                  >
                    {reminder.enabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnalytics = () => {
    if (!analytics) return null;

    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">Adherence Analytics</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Overall Adherence</span>
                  <span className="text-2xl font-bold text-gray-900">{analytics.overallAdherence}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      analytics.overallAdherence >= 90 ? 'bg-green-500' :
                      analytics.overallAdherence >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${analytics.overallAdherence}%` }}
                  />
                </div>
              </div>

              {reminders.map((reminder) => (
                <div key={reminder.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{reminder.medicationName}</span>
                    <span className="text-lg font-bold text-gray-900">{reminder.adherenceRate}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        reminder.adherenceRate >= 90 ? 'bg-green-500' :
                        reminder.adherenceRate >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${reminder.adherenceRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-teal-600" />
              <h3 className="text-lg font-bold text-gray-900">Recommendations</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {analytics.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (isLoading) {
    return (
      <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Prescription Tracking' }]}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading prescription data...</p>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout 
      role="patient" 
      userName="John Doe" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/patient/dashboard' },
        { label: 'Prescription Tracking' }
      ]}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prescription Tracking</h1>
            <p className="text-gray-600 mt-1">AI-powered medication management and adherence monitoring</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={loadData}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'medications', label: 'Medications', icon: Pill },
            { id: 'reminders', label: 'Reminders', icon: Bell },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                  selectedTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'medications' && renderMedications()}
        {selectedTab === 'reminders' && renderReminders()}
        {selectedTab === 'analytics' && renderAnalytics()}
      </div>
    </DesktopLayout>
  );
}

