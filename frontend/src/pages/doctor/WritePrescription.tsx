import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Plus, 
  Trash2, 
  Save, 
  Send, 
  Search, 
  User, 
  Calendar, 
  Pill, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Shield,
  Download,
  Eye,
  Edit,
  X,
  Info
} from 'lucide-react';

export default function WritePrescription() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [medications, setMedications] = useState([
    { 
      id: 1, 
      name: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      instructions: '',
      quantity: '',
      refills: '0',
      generic: false,
      warnings: ''
    }
  ]);
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [prescriptionType, setPrescriptionType] = useState('regular');
  const [urgency, setUrgency] = useState('normal');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const patients = [
    { 
      id: 1, 
      name: 'John Doe', 
      age: 45, 
      lastVisit: '2025-10-05',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      allergies: ['Penicillin', 'Peanuts'],
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      insurance: 'Blue Cross Blue Shield',
      avatar: '👨'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      age: 32, 
      lastVisit: '2025-10-04',
      phone: '+1 (555) 234-5678',
      email: 'jane.smith@email.com',
      allergies: ['Sulfa'],
      conditions: ['Migraine'],
      insurance: 'Aetna',
      avatar: '👩'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      age: 58, 
      lastVisit: '2025-10-03',
      phone: '+1 (555) 345-6789',
      email: 'mike.johnson@email.com',
      allergies: [],
      conditions: ['High Blood Pressure', 'Arthritis'],
      insurance: 'UnitedHealth',
      avatar: '👨‍💼'
    },
  ];

  const commonMedications = [
    'Lisinopril', 'Metformin', 'Aspirin', 'Atorvastatin', 'Metoprolol',
    'Omeprazole', 'Amlodipine', 'Hydrochlorothiazide', 'Simvastatin',
    'Losartan', 'Gabapentin', 'Tramadol', 'Furosemide', 'Levothyroxine'
  ];

  const addMedication = () => {
    setMedications([...medications, { 
      id: Date.now(), 
      name: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      instructions: '',
      quantity: '',
      refills: '0',
      generic: false,
      warnings: ''
    }]);
  };

  const removeMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const updateMedication = (id: number, field: string, value: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleSaveDraft = () => {
    // Save prescription as draft
    const prescriptionData = {
      patient: selectedPatient,
      medications,
      diagnosis,
      notes,
      prescriptionType,
      urgency,
      date: new Date().toISOString(),
      status: 'draft'
    };
    console.log('Saving draft:', prescriptionData);
    alert('Prescription saved as draft');
  };

  const handleSubmit = () => {
    if (!selectedPatient) {
      alert('Please select a patient');
      return;
    }
    
    if (!diagnosis.trim()) {
      alert('Please enter a diagnosis');
      return;
    }
    
    if (medications.some(med => !med.name.trim() || !med.dosage.trim() || !med.frequency)) {
      alert('Please fill in all medication details');
      return;
    }
    
    const prescriptionData = {
      patient: selectedPatient,
      medications,
      diagnosis,
      notes,
      prescriptionType,
      urgency,
      date: new Date().toISOString(),
      status: 'sent'
    };
    
    console.log('Submitting prescription:', prescriptionData);
    alert('Prescription sent to patient');
    navigate('/doctor/dashboard');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrescriptionTypeColor = (type: string) => {
    switch (type) {
      case 'controlled': return 'bg-red-100 text-red-800 border-red-200';
      case 'antibiotic': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'regular': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Electronic Prescription</h1>
          <p className="text-gray-600 mt-1">Create and send prescriptions to patients</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Patient Information
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              {!selectedPatient ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search patient by name, phone, or email..."
                      value={patientSearch}
                      onChange={(e) => {
                        setPatientSearch(e.target.value);
                        setShowPatientSearch(true);
                      }}
                      className="pl-10"
                    />
                  </div>
                  {showPatientSearch && patientSearch && (
                    <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto bg-white shadow-lg">
                      {patients
                        .filter(p => 
                          p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                          p.phone.includes(patientSearch) ||
                          p.email.toLowerCase().includes(patientSearch.toLowerCase())
                        )
                        .map(patient => (
                          <div
                            key={patient.id}
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setPatientSearch('');
                              setShowPatientSearch(false);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{patient.avatar}</span>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{patient.name}</p>
                                <p className="text-sm text-gray-600">{patient.age} years • {patient.phone}</p>
                                <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-500">{patient.insurance}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{selectedPatient.avatar}</span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h3>
                        <p className="text-gray-600">{selectedPatient.age} years • {selectedPatient.phone}</p>
                        <p className="text-gray-500">{selectedPatient.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Last visit: {selectedPatient.lastVisit}
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            {selectedPatient.insurance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Patient Alerts */}
                  {(selectedPatient.allergies.length > 0 || selectedPatient.conditions.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      {selectedPatient.allergies.length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-red-800 mb-1">⚠️ Allergies:</p>
                          <div className="flex gap-1 flex-wrap">
                            {selectedPatient.allergies.map((allergy: string, idx: number) => (
                              <Badge key={idx} variant="destructive" className="text-xs">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPatient.conditions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-orange-800 mb-1">📋 Conditions:</p>
                          <div className="flex gap-1 flex-wrap">
                            {selectedPatient.conditions.map((condition: string, idx: number) => (
                              <Badge key={idx} className="text-xs bg-orange-100 text-orange-800">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Prescription Details */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Prescription Details
              </h2>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Diagnosis and Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis *</Label>
                  <Input
                    id="diagnosis"
                    placeholder="Enter primary diagnosis..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prescription Type</Label>
                  <Select value={prescriptionType} onChange={(e) => setPrescriptionType(e.target.value)}>
                    <option value="regular">Regular</option>
                    <option value="controlled">Controlled Substance</option>
                    <option value="antibiotic">Antibiotic</option>
                    <option value="refill">Refill Only</option>
                  </Select>
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <div className="flex gap-2">
                  {['normal', 'high', 'urgent'].map((level) => (
                    <Button
                      key={level}
                      variant={urgency === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setUrgency(level)}
                      className={urgency === level ? getUrgencyColor(level) : ''}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Pill className="w-5 h-5 text-purple-600" />
                  Medications
                </h2>
                <Button onClick={addMedication} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {medications.map((medication, index) => (
                <div key={medication.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Medication {index + 1}
                    </h3>
                    {medications.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(medication.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Medicine Name *</Label>
                      <div className="relative">
                        <Input
                          placeholder="e.g., Lisinopril"
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                          className="border-2"
                          list={`medications-${medication.id}`}
                        />
                        <datalist id={`medications-${medication.id}`}>
                          {commonMedications.map((med) => (
                            <option key={med} value={med} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Dosage *</Label>
                      <Input
                        placeholder="e.g., 10mg"
                        value={medication.dosage}
                        onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                        className="border-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Frequency *</Label>
                      <Select value={medication.frequency} onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}>
                        <option value="">Select frequency</option>
                        <option value="once-daily">Once daily</option>
                        <option value="twice-daily">Twice daily</option>
                        <option value="three-times-daily">Three times daily</option>
                        <option value="four-times-daily">Four times daily</option>
                        <option value="as-needed">As needed</option>
                        <option value="before-meals">Before meals</option>
                        <option value="after-meals">After meals</option>
                        <option value="at-bedtime">At bedtime</option>
                        <option value="every-4-hours">Every 4 hours</option>
                        <option value="every-6-hours">Every 6 hours</option>
                        <option value="every-8-hours">Every 8 hours</option>
                        <option value="every-12-hours">Every 12 hours</option>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        placeholder="e.g., 30 tablets"
                        value={medication.quantity}
                        onChange={(e) => updateMedication(medication.id, 'quantity', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Refills</Label>
                      <Select value={medication.refills} onChange={(e) => updateMedication(medication.id, 'refills', e.target.value)}>
                        <option value="0">No refills</option>
                        <option value="1">1 refill</option>
                        <option value="2">2 refills</option>
                        <option value="3">3 refills</option>
                        <option value="4">4 refills</option>
                        <option value="5">5 refills</option>
                      </Select>
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label>Duration</Label>
                      <Input
                        placeholder="e.g., 30 days"
                        value={medication.duration}
                        onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label>Instructions</Label>
                      <Textarea
                        placeholder="Additional instructions for this medication..."
                        value={medication.instructions}
                        onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <Label>Warnings & Precautions</Label>
                      <Textarea
                        placeholder="Special warnings or precautions..."
                        value={medication.warnings}
                        onChange={(e) => updateMedication(medication.id, 'warnings', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* General Notes */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Additional Notes & Instructions
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                placeholder="Enter any additional notes, warnings, or instructions for the patient..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="border-2"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSaveDraft} className="flex-1 h-12">
              <Save className="w-5 h-5 mr-2" /> Save as Draft
            </Button>
            <Button onClick={handleSubmit} className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Send className="w-5 h-5 mr-2" /> Send Prescription
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prescription Summary */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Prescription Summary
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Patient:</span>
                  <span className="text-sm font-medium">{selectedPatient ? selectedPatient.name : 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Medications:</span>
                  <span className="text-sm font-medium">{medications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <Badge className={`text-xs ${getPrescriptionTypeColor(prescriptionType)}`}>
                    {prescriptionType}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Urgency:</span>
                  <Badge className={`text-xs ${getUrgencyColor(urgency)}`}>
                    {urgency}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Quick Actions
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Load Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Recent Prescriptions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="w-4 h-4 mr-2" />
                Drug Interactions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Insurance Coverage
              </Button>
            </CardContent>
          </Card>

          {/* Drug Information */}
          {selectedPatient && selectedPatient.allergies.length > 0 && (
            <Card className="border-0 shadow-lg bg-red-50 border-red-200">
              <CardHeader className="border-b border-red-200">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  Allergy Alert
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-red-700 mb-2">Patient has known allergies:</p>
                <div className="space-y-1">
                  {selectedPatient.allergies.map((allergy: string, idx: number) => (
                    <Badge key={idx} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-red-600 mt-2">Please verify medications are safe for this patient.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
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
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Write Prescription' }]}>
      {content}
    </DesktopLayout>
  );
}
