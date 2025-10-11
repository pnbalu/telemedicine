import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Plus, Trash2, Save, Send } from 'lucide-react';

export default function WritePrescription() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [medications, setMedications] = useState([
    { id: 1, name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const patients = [
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2025-10-05' },
    { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2025-10-04' },
    { id: 3, name: 'Mike Johnson', age: 58, lastVisit: '2025-10-03' },
  ];

  const addMedication = () => {
    setMedications([...medications, { 
      id: Date.now(), 
      name: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      instructions: '' 
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
    alert('Prescription saved as draft');
  };

  const handleSubmit = () => {
    if (!selectedPatient) {
      alert('Please select a patient');
      return;
    }
    alert('Prescription sent to patient');
    navigate('/doctor/dashboard');
  };

  const content = (
    <div className={isDesktop ? "p-8" : "p-6"}>
      <Card className="border-0 shadow-md bg-white max-w-4xl mx-auto">
        <CardHeader className="border-b border-gray-100">
          <h1 className="text-2xl font-bold">Write Electronic Prescription</h1>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label>Select Patient</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Search patient by name..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">Search</Button>
            </div>
            {!selectedPatient && patientSearch && (
              <div className="border rounded-lg max-h-48 overflow-y-auto">
                {patients
                  .filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()))
                  .map(patient => (
                    <div
                      key={patient.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setPatientSearch('');
                      }}
                    >
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.age} years • Last visit: {patient.lastVisit}</p>
                    </div>
                  ))}
              </div>
            )}
            {selectedPatient && (
              <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold">{selectedPatient.name}</p>
                  <p className="text-sm text-gray-600">{selectedPatient.age} years • Last visit: {selectedPatient.lastVisit}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                  Change
                </Button>
              </div>
            )}
          </div>

          {/* Diagnosis */}
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Input
              id="diagnosis"
              placeholder="Enter diagnosis..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          {/* Medications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg">Medications</Label>
              <Button onClick={addMedication} size="sm" className="bg-teal-600 hover:bg-teal-700">
                <Plus className="w-4 h-4 mr-1" /> Add Medication
              </Button>
            </div>

            {medications.map((medication, index) => (
              <Card key={medication.id} className="bg-gray-50">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">Medication {index + 1}</h3>
                    {medications.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(medication.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Medicine Name</Label>
                      <Input
                        placeholder="e.g., Lisinopril 10mg"
                        value={medication.name}
                        onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Dosage</Label>
                      <Input
                        placeholder="e.g., 10mg"
                        value={medication.dosage}
                        onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select
                        value={medication.frequency}
                        onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                      >
                        <option value="">Select frequency</option>
                        <option value="once-daily">Once daily</option>
                        <option value="twice-daily">Twice daily</option>
                        <option value="three-times-daily">Three times daily</option>
                        <option value="four-times-daily">Four times daily</option>
                        <option value="as-needed">As needed</option>
                        <option value="before-meals">Before meals</option>
                        <option value="after-meals">After meals</option>
                        <option value="at-bedtime">At bedtime</option>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* General Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">General Notes & Instructions</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes, warnings, or instructions for the patient..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
              <Save className="w-4 h-4 mr-2" /> Save as Draft
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-teal-600 hover:bg-teal-700">
              <Send className="w-4 h-4 mr-2" /> Send to Patient
            </Button>
          </div>
        </CardContent>
      </Card>
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
