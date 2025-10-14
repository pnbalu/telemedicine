import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  FileText,
  Pill,
  Calendar,
  Loader2,
  ChevronRight,
  ThermometerSun,
  Heart,
  Droplets
} from 'lucide-react';
import { 
  aiSymptomService, 
  Symptom, 
  PatientContext,
  SymptomAnalysis 
} from '@/services/aiSymptomService';

export default function AISymptomChecker() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'input' | 'context' | 'analysis' | 'results'>('input');
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    name: '',
    severity: 'moderate' as 'mild' | 'moderate' | 'severe',
    duration: '',
    description: ''
  });
  const [patientContext, setPatientContext] = useState<PatientContext>({
    age: 30,
    gender: 'male',
    medicalHistory: [],
    currentMedications: [],
    allergies: [],
    vitalSigns: {}
  });
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const commonSymptoms = aiSymptomService.getCommonSymptoms();

  const addSymptom = () => {
    if (currentSymptom.name && currentSymptom.duration) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        ...currentSymptom
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom({
        name: '',
        severity: 'moderate',
        duration: '',
        description: ''
      });
      setShowSuggestions(false);
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) return;
    
    setStep('analysis');
    setIsAnalyzing(true);
    
    try {
      const result = await aiSymptomService.analyzeSymptoms(symptoms, patientContext);
      setAnalysis(result);
      setStep('results');
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getTriageLevelColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'routine': return 'bg-blue-500';
      case 'self-care': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTriageLevelIcon = (level: string) => {
    switch (level) {
      case 'emergency': return AlertCircle;
      case 'urgent': return Clock;
      case 'routine': return Calendar;
      case 'self-care': return CheckCircle;
      default: return Activity;
    }
  };

  // Step 1: Symptom Input
  const renderSymptomInput = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Symptom Analysis</h2>
            <p className="text-gray-600">
              Describe your symptoms and our AI will provide instant triage recommendations and possible conditions.
              This is not a diagnosis - always consult with a healthcare provider for medical advice.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Add Your Symptoms</h3>
          <p className="text-sm text-gray-600 mt-1">Provide as much detail as possible for accurate analysis</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptomName">Symptom Name *</Label>
            <div className="relative">
              <Input
                id="symptomName"
                placeholder="e.g., Fever, Headache, Cough..."
                value={currentSymptom.name}
                onChange={(e) => {
                  setCurrentSymptom({ ...currentSymptom, name: e.target.value });
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(currentSymptom.name.length > 0)}
              />
              {showSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {commonSymptoms
                    .filter(s => s.toLowerCase().includes(currentSymptom.name.toLowerCase()))
                    .slice(0, 8)
                    .map((symptom, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => {
                          setCurrentSymptom({ ...currentSymptom, name: symptom });
                          setShowSuggestions(false);
                        }}
                      >
                        {symptom}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <select
                id="severity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={currentSymptom.severity}
                onChange={(e) => setCurrentSymptom({ 
                  ...currentSymptom, 
                  severity: e.target.value as 'mild' | 'moderate' | 'severe'
                })}
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                placeholder="e.g., 3 days, 2 weeks"
                value={currentSymptom.duration}
                onChange={(e) => setCurrentSymptom({ ...currentSymptom, duration: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              id="description"
              placeholder="Describe when it occurs, what makes it better/worse, any other relevant information..."
              value={currentSymptom.description}
              onChange={(e) => setCurrentSymptom({ ...currentSymptom, description: e.target.value })}
              rows={3}
            />
          </div>

          <Button 
            onClick={addSymptom}
            disabled={!currentSymptom.name || !currentSymptom.duration}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Symptom
          </Button>
        </CardContent>
      </Card>

      {symptoms.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Current Symptoms ({symptoms.length})</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {symptoms.map((symptom) => (
                <div 
                  key={symptom.id}
                  className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{symptom.name}</h4>
                      <Badge 
                        variant={symptom.severity === 'severe' ? 'destructive' : symptom.severity === 'moderate' ? 'warning' : 'secondary'}
                        className="text-xs capitalize"
                      >
                        {symptom.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Duration: {symptom.duration}</p>
                    {symptom.description && (
                      <p className="text-sm text-gray-500 mt-1">{symptom.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeSymptom(symptom.id)}
                    className="p-1 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button 
                onClick={() => setStep('context')}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Continue to Health Context
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Step 2: Patient Context
  const renderPatientContext = () => (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => setStep('input')} className="mb-4">
        ← Back to Symptoms
      </Button>

      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Health Context</h3>
          <p className="text-sm text-gray-600 mt-1">
            Optional information to improve accuracy of AI analysis
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={patientContext.age}
                onChange={(e) => setPatientContext({ 
                  ...patientContext, 
                  age: parseInt(e.target.value) || 0 
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={patientContext.gender}
                onChange={(e) => setPatientContext({ ...patientContext, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 text-orange-600" />
              <Label className="text-base font-semibold">Current Vital Signs</Label>
            </div>

            <div className="grid grid-cols-2 gap-4 pl-7">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm">Temperature (°F)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="98.6"
                  value={patientContext.vitalSigns?.temperature || ''}
                  onChange={(e) => setPatientContext({
                    ...patientContext,
                    vitalSigns: {
                      ...patientContext.vitalSigns,
                      temperature: parseFloat(e.target.value) || undefined
                    }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heartRate" className="text-sm">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="72"
                  value={patientContext.vitalSigns?.heartRate || ''}
                  onChange={(e) => setPatientContext({
                    ...patientContext,
                    vitalSigns: {
                      ...patientContext.vitalSigns,
                      heartRate: parseInt(e.target.value) || undefined
                    }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodPressure" className="text-sm">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  placeholder="120/80"
                  value={patientContext.vitalSigns?.bloodPressure || ''}
                  onChange={(e) => setPatientContext({
                    ...patientContext,
                    vitalSigns: {
                      ...patientContext.vitalSigns,
                      bloodPressure: e.target.value
                    }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oxygenSaturation" className="text-sm">Oxygen Saturation (%)</Label>
                <Input
                  id="oxygenSaturation"
                  type="number"
                  placeholder="98"
                  value={patientContext.vitalSigns?.oxygenSaturation || ''}
                  onChange={(e) => setPatientContext({
                    ...patientContext,
                    vitalSigns: {
                      ...patientContext.vitalSigns,
                      oxygenSaturation: parseInt(e.target.value) || undefined
                    }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <Label htmlFor="medicalHistory" className="text-base font-semibold">Medical History</Label>
            </div>
            <Textarea
              id="medicalHistory"
              placeholder="e.g., Diabetes, Hypertension, Asthma (comma separated)"
              value={patientContext.medicalHistory.join(', ')}
              onChange={(e) => setPatientContext({
                ...patientContext,
                medicalHistory: e.target.value.split(',').map(s => s.trim()).filter(s => s)
              })}
              rows={2}
              className="ml-7"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-purple-600" />
              <Label htmlFor="currentMedications" className="text-base font-semibold">Current Medications</Label>
            </div>
            <Textarea
              id="currentMedications"
              placeholder="e.g., Lisinopril, Metformin (comma separated)"
              value={patientContext.currentMedications.join(', ')}
              onChange={(e) => setPatientContext({
                ...patientContext,
                currentMedications: e.target.value.split(',').map(s => s.trim()).filter(s => s)
              })}
              rows={2}
              className="ml-7"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <Label htmlFor="allergies" className="text-base font-semibold">Allergies</Label>
            </div>
            <Textarea
              id="allergies"
              placeholder="e.g., Penicillin, Peanuts (comma separated)"
              value={patientContext.allergies.join(', ')}
              onChange={(e) => setPatientContext({
                ...patientContext,
                allergies: e.target.value.split(',').map(s => s.trim()).filter(s => s)
              })}
              rows={2}
              className="ml-7"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline"
              onClick={() => setStep('input')}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={analyzeSymptoms}
              disabled={symptoms.length === 0}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Brain className="w-4 h-4 mr-2" />
              Analyze with AI
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 3: Analysis in Progress
  const renderAnalysis = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Analyzing Your Symptoms...</h3>
        <p className="text-gray-600 max-w-md">
          Our AI is processing your symptoms and health context to provide personalized recommendations.
        </p>
      </div>
    </div>
  );

  // Step 4: Results
  const renderResults = () => {
    if (!analysis) return null;

    const TriageIcon = getTriageLevelIcon(analysis.triageLevel);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => { setStep('input'); setAnalysis(null); }}>
            ← Start New Analysis
          </Button>
          <Badge variant="secondary" className="text-sm">
            AI Confidence: {analysis.aiConfidence}%
          </Badge>
        </div>

        {/* Triage Level Card */}
        <Card className={`border-0 shadow-lg ${getTriageLevelColor(analysis.triageLevel)} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <TriageIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 capitalize">{analysis.triageLevel} Care Needed</h3>
                <p className="text-white/90 text-lg">{analysis.recommendedAction}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <p className="text-xs opacity-80">Urgency Score</p>
                    <p className="text-2xl font-bold">{analysis.urgencyScore}/100</p>
                  </div>
                  {analysis.recommendedSpecialty && (
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-xs opacity-80">Recommended Specialist</p>
                      <p className="text-lg font-semibold">{analysis.recommendedSpecialty}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Flags */}
        {analysis.warningFlags.length > 0 && (
          <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
            <CardHeader className="bg-red-50 border-b border-red-100">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Important Warnings</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-2">
                {analysis.warningFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Possible Conditions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Possible Conditions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Based on AI analysis - Always consult a healthcare provider for proper diagnosis
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {analysis.possibleConditions.map((condition, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-lg">{condition.name}</h4>
                  <Badge variant={condition.probability > 70 ? 'default' : 'secondary'}>
                    {condition.probability}% Match
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{condition.description}</p>
                <div className="space-y-2">
                  <p className="font-medium text-sm text-gray-700">Recommendations:</p>
                  <ul className="space-y-1 ml-4">
                    {condition.recommendations.map((rec, ridx) => (
                      <li key={ridx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggested Tests */}
        {analysis.suggestedTests && analysis.suggestedTests.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-teal-600" />
                <h3 className="text-lg font-bold text-gray-900">Suggested Diagnostic Tests</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {analysis.suggestedTests.map((test, idx) => (
                  <div key={idx} className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                    <p className="text-sm font-medium text-teal-900">{test}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
          <CardHeader className="border-b border-indigo-100">
            <h3 className="text-lg font-bold text-gray-900">Next Steps</h3>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <Button 
              className="w-full justify-between bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
              onClick={() => navigate('/patient/book-appointment')}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Book Appointment with {analysis.recommendedSpecialty}
              </span>
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-between"
              onClick={() => window.print()}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Save Analysis Report
              </span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and does not constitute medical advice. 
            Always consult with qualified healthcare professionals for proper diagnosis and treatment.
            Analysis generated on {analysis.timestamp.toLocaleString()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <DesktopLayout 
      role="patient" 
      userName="John Doe" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/patient/dashboard' },
        { label: 'AI Symptom Checker' }
      ]}
    >
      <div className="p-8 max-w-5xl mx-auto">
        {step === 'input' && renderSymptomInput()}
        {step === 'context' && renderPatientContext()}
        {step === 'analysis' && renderAnalysis()}
        {step === 'results' && renderResults()}
      </div>
    </DesktopLayout>
  );
}

