import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  Droplets,
  MapPin,
  Target,
  Shield,
  Zap,
  Stethoscope,
  Microscope,
  User,
  Settings,
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { 
  aiSymptomService,
  Symptom,
  PatientContext,
  SymptomAnalysis,
  SymptomCategory,
  BodySystem,
  VitalSigns
} from '@/services/aiSymptomService';

export default function AISymptomChecker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    name: '',
    severity: 'moderate' as 'mild' | 'moderate' | 'severe',
    duration: '',
    description: '',
    bodyLocation: '',
    triggers: [] as string[],
    relievingFactors: [] as string[]
  });
  const [patientContext, setPatientContext] = useState<PatientContext>({
    age: 30,
    gender: 'male',
    medicalHistory: [],
    currentMedications: [],
    allergies: [],
    vitalSigns: {},
    lifestyle: {
      smoking: false,
      alcohol: 'none',
      exercise: 'moderate',
      diet: 'balanced'
    }
  });
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [symptomSuggestions, setSymptomSuggestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [selectedBodyLocation, setSelectedBodyLocation] = useState<string>('');

  const symptomCategories = aiSymptomService.getSymptomCategories();
  const bodySystems = aiSymptomService.getBodySystems();

  const steps = [
    { id: 1, title: 'Symptoms', icon: Stethoscope },
    { id: 2, title: 'Context', icon: User },
    { id: 3, title: 'Analysis', icon: Brain },
    { id: 4, title: 'Results', icon: FileText }
  ];

  useEffect(() => {
    if (currentSymptom.name.length > 2) {
      const suggestions = aiSymptomService.getSymptomSuggestions(currentSymptom.name);
      setSymptomSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [currentSymptom.name]);

  const addSymptom = () => {
    if (currentSymptom.name && currentSymptom.duration) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        ...currentSymptom,
        associatedSymptoms: []
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom({
        name: '',
        severity: 'moderate',
        duration: '',
        description: '',
        bodyLocation: '',
        triggers: [],
        relievingFactors: []
      });
      setShowSuggestions(false);
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const addToContext = (type: 'medicalHistory' | 'medications' | 'allergies', value: string) => {
    if (value.trim()) {
      setPatientContext(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }));
    }
  };

  const removeFromContext = (type: 'medicalHistory' | 'medications' | 'allergies', index: number) => {
    setPatientContext(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) return;
    
    setCurrentStep(3);
    setIsAnalyzing(true);
    
    try {
      const result = await aiSymptomService.analyzeSymptoms(symptoms, patientContext);
      setAnalysis(result);
      setCurrentStep(4);
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

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                isActive ? 'border-blue-600 bg-blue-600 text-white' :
                isCompleted ? 'border-green-600 bg-green-600 text-white' :
                'border-gray-300 bg-white text-gray-500'
              }`}>
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  isActive ? 'text-blue-600' : 
                  isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </p>
                <p className={`text-xs ${
                  isActive ? 'text-blue-600' : 
                  isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSymptomInput = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Symptom Analysis</h2>
            <p className="text-gray-600">
              Describe your symptoms in detail for comprehensive AI-powered analysis and triage recommendations.
              This tool provides guidance only - always consult with healthcare providers for medical advice.
            </p>
          </div>
        </div>
      </div>

      {/* Symptom Categories */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <h3 className="text-lg font-bold">Symptom Categories</h3>
          <p className="text-sm text-gray-600">Select a category to see common symptoms</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {symptomCategories.map((category) => (
              <div
                key={category.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedCategory && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Common {symptomCategories.find(c => c.id === selectedCategory)?.name} Symptoms:</h4>
              <div className="flex flex-wrap gap-2">
                {symptomCategories.find(c => c.id === selectedCategory)?.symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                    onClick={() => setCurrentSymptom(prev => ({ ...prev, name: symptom }))}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Symptom Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Add Your Symptoms</h3>
          <p className="text-sm text-gray-600 mt-1">Provide detailed information for accurate analysis</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="symptomName">Symptom Name *</Label>
              <div className="relative">
                <Input
                  id="symptomName"
                  placeholder="e.g., Fever, Headache, Chest Pain..."
                  value={currentSymptom.name}
                  onChange={(e) => {
                    setCurrentSymptom({ ...currentSymptom, name: e.target.value });
                  }}
                />
                {showSuggestions && symptomSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
                    {symptomSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => {
                          setCurrentSymptom({ ...currentSymptom, name: suggestion });
                          setShowSuggestions(false);
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                placeholder="e.g., 2 days, 1 week, 3 hours..."
                value={currentSymptom.duration}
                onChange={(e) => setCurrentSymptom({ ...currentSymptom, duration: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <select
                id="severity"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={currentSymptom.severity}
                onChange={(e) => setCurrentSymptom({ ...currentSymptom, severity: e.target.value as any })}
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyLocation">Body Location (Optional)</Label>
              <Input
                id="bodyLocation"
                placeholder="e.g., chest, head, abdomen..."
                value={currentSymptom.bodyLocation}
                onChange={(e) => setCurrentSymptom({ ...currentSymptom, bodyLocation: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your symptom in detail. Include any triggers, relieving factors, or associated symptoms..."
              value={currentSymptom.description}
              onChange={(e) => setCurrentSymptom({ ...currentSymptom, description: e.target.value })}
              rows={3}
            />
          </div>

          <Button onClick={addSymptom} className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Symptom
          </Button>
        </CardContent>
      </Card>

      {/* Current Symptoms */}
      {symptoms.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Current Symptoms ({symptoms.length})</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {symptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{symptom.name}</h4>
                      <Badge variant="outline" className="capitalize">{symptom.severity}</Badge>
                      <span className="text-sm text-gray-600">{symptom.duration}</span>
                    </div>
                    {symptom.description && (
                      <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                    )}
                    {symptom.bodyLocation && (
                      <p className="text-xs text-gray-500 mt-1">Location: {symptom.bodyLocation}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSymptom(symptom.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPatientContext = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Patient Context</h2>
            <p className="text-gray-600">
              Provide additional context about your health to improve the accuracy of the analysis.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h3 className="text-lg font-bold">Basic Information</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={patientContext.age}
                  onChange={(e) => setPatientContext(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={patientContext.gender}
                  onChange={(e) => setPatientContext(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="space-y-4">
              <h4 className="font-semibold">Lifestyle</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smoking">Smoking</Label>
                  <select
                    id="smoking"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={patientContext.lifestyle?.smoking ? 'yes' : 'no'}
                    onChange={(e) => setPatientContext(prev => ({ 
                      ...prev, 
                      lifestyle: { ...prev.lifestyle!, smoking: e.target.value === 'yes' }
                    }))}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="alcohol">Alcohol Use</Label>
                  <select
                    id="alcohol"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={patientContext.lifestyle?.alcohol}
                    onChange={(e) => setPatientContext(prev => ({ 
                      ...prev, 
                      lifestyle: { ...prev.lifestyle!, alcohol: e.target.value }
                    }))}
                  >
                    <option value="none">None</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h3 className="text-lg font-bold">Vital Signs (Optional)</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="temperature">Temperature (°F)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="98.6"
                  value={patientContext.vitalSigns?.temperature || ''}
                  onChange={(e) => setPatientContext(prev => ({
                    ...prev,
                    vitalSigns: { ...prev.vitalSigns!, temperature: parseFloat(e.target.value) || undefined }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="72"
                  value={patientContext.vitalSigns?.heartRate || ''}
                  onChange={(e) => setPatientContext(prev => ({
                    ...prev,
                    vitalSigns: { ...prev.vitalSigns!, heartRate: parseInt(e.target.value) || undefined }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="systolic">Systolic BP</Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={patientContext.vitalSigns?.bloodPressure?.systolic || ''}
                  onChange={(e) => setPatientContext(prev => ({
                    ...prev,
                    vitalSigns: { 
                      ...prev.vitalSigns!, 
                      bloodPressure: { 
                        ...prev.vitalSigns?.bloodPressure!,
                        systolic: parseInt(e.target.value) || 0 
                      }
                    }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="diastolic">Diastolic BP</Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={patientContext.vitalSigns?.bloodPressure?.diastolic || ''}
                  onChange={(e) => setPatientContext(prev => ({
                    ...prev,
                    vitalSigns: { 
                      ...prev.vitalSigns!, 
                      bloodPressure: { 
                        ...prev.vitalSigns?.bloodPressure!,
                        diastolic: parseInt(e.target.value) || 0 
                      }
                    }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                <Input
                  id="oxygenSaturation"
                  type="number"
                  placeholder="98"
                  value={patientContext.vitalSigns?.oxygenSaturation || ''}
                  onChange={(e) => setPatientContext(prev => ({
                    ...prev,
                    vitalSigns: { ...prev.vitalSigns!, oxygenSaturation: parseInt(e.target.value) || undefined }
                  }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h3 className="text-lg font-bold">Medical History</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="e.g., Diabetes, Hypertension..." />
              <Button size="sm" onClick={() => addToContext('medicalHistory', '')}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {patientContext.medicalHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{item}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromContext('medicalHistory', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h3 className="text-lg font-bold">Current Medications</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="e.g., Metformin, Lisinopril..." />
              <Button size="sm" onClick={() => addToContext('medications', '')}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {patientContext.currentMedications.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{item}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromContext('medications', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <h3 className="text-lg font-bold">Allergies</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="e.g., Penicillin, Shellfish..." />
              <Button size="sm" onClick={() => addToContext('allergies', '')}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {patientContext.allergies.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{item}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromContext('allergies', index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
        <Brain className="w-8 h-8 text-white animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis in Progress</h2>
      <p className="text-gray-600 mb-6">
        Our advanced AI is analyzing your symptoms and medical context...
      </p>
      <div className="flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    </div>
  );

  const renderResults = () => {
    if (!analysis) return null;

    const TriageIcon = getTriageLevelIcon(analysis.triageLevel);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <TriageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
              <p className="text-gray-600">
                Based on your symptoms and medical context, here are the AI-powered recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Triage Level */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Triage Assessment</h3>
              <Badge className={`${getTriageLevelColor(analysis.triageLevel)} text-white`}>
                <TriageIcon className="w-4 h-4 mr-1" />
                {analysis.triageLevel.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{analysis.urgencyScore}/100</div>
                <p className="text-sm text-gray-600">Urgency Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{analysis.aiConfidence}%</div>
                <p className="text-sm text-gray-600">AI Confidence</p>
              </div>
              <div className="text-center">
                <Badge className={`${getRiskLevelColor(analysis.riskAssessment.overallRisk)} text-sm`}>
                  {analysis.riskAssessment.overallRisk.toUpperCase()} RISK
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Overall Risk</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Recommended Action</h4>
              <p className="text-blue-800">{analysis.recommendedAction}</p>
              {analysis.recommendedSpecialty && (
                <p className="text-sm text-blue-600 mt-2">
                  Recommended Specialty: <strong>{analysis.recommendedSpecialty}</strong>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Possible Conditions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Possible Conditions</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {analysis.possibleConditions.slice(0, 3).map((condition, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                    <Badge variant="outline" className="capitalize">
                      {condition.probability}% probability
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{condition.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">Recommendations:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {condition.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Indicators */}
        {analysis.emergencyIndicators.length > 0 && (
          <Card className="border-0 shadow-lg border-red-200 bg-red-50">
            <CardHeader className="border-b border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Emergency Indicators</h3>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                {analysis.emergencyIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-4 h-4" />
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Risk Assessment */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Risk Assessment</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Risk Factors Identified:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.riskAssessment.riskFactors.map((factor, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mitigation Strategies:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {analysis.riskAssessment.mitigationStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Follow-up Recommendations */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Follow-up Recommendations</h3>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {analysis.followUpRecommendations.map((recommendation, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderSymptomInput();
      case 2: return renderPatientContext();
      case 3: return renderAnalysis();
      case 4: return renderResults();
      default: return renderSymptomInput();
    }
  };

  const content = (
    <div className="p-8">
      {renderStepIndicator()}
      {renderCurrentStep()}
      
      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/patient/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? 'Back to Dashboard' : 'Previous'}
        </Button>
        
        {currentStep < 3 && (
          <Button
            onClick={() => currentStep === 1 ? setCurrentStep(2) : analyzeSymptoms()}
            disabled={currentStep === 1 && symptoms.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === 1 ? 'Continue to Context' : 'Analyze Symptoms'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        
        {currentStep === 4 && (
          <Button
            onClick={() => {
              setCurrentStep(1);
              setSymptoms([]);
              setAnalysis(null);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            New Analysis
            <Brain className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );

  if (window.innerWidth < 1024) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')}>
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span className="font-semibold">AI Symptom Checker</span>
              </div>
            </div>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard', path: '/patient/dashboard' }, { label: 'AI Symptom Checker' }]}>
      {content}
    </DesktopLayout>
  );
}
