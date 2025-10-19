import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Save,
  Plus,
  Clock,
  User
} from 'lucide-react';

export default function Vitals() {
  const navigate = useNavigate();
  const location = useLocation();
  const [vitals, setVitals] = useState({
    patientId: '',
    patientName: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    notes: ''
  });

  // Handle patient context from navigation
  useEffect(() => {
    if (location.state) {
      const { patientId, patientName, room } = location.state;
      setVitals(prev => ({
        ...prev,
        patientId: patientId || '',
        patientName: patientName || '',
        notes: room ? `Room ${room} - ` : ''
      }));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle vital signs submission
    console.log('Vitals submitted:', vitals);
    // Reset form
    setVitals({
      patientId: '',
      patientName: '',
      systolicBP: '',
      diastolicBP: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
      respiratoryRate: '',
      weight: '',
      height: '',
      notes: ''
    });
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/nurse/dashboard' },
    { label: 'Vital Signs', href: '/nurse/vitals' }
  ];

  return (
    <DesktopLayout 
      role="nurse" 
      userName="Nurse Sarah Johnson" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Record Vital Signs</h1>
            <p className="text-gray-600 mt-1">Record and monitor patient vital signs</p>
            {location.state && (
              <div className="mt-2 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                <p className="text-sm text-pink-800">
                  <strong>Recording vitals for:</strong> {location.state.patientName} - Room {location.state.room}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Vital Signs Form */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-pink-600" />
              Vital Signs Recording
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientId" className="text-sm font-medium">
                    Patient ID
                  </Label>
                  <Input
                    id="patientId"
                    value={vitals.patientId}
                    onChange={(e) => setVitals({ ...vitals, patientId: e.target.value })}
                    placeholder="Enter patient ID"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-sm font-medium">
                    Patient Name
                  </Label>
                  <Input
                    id="patientName"
                    value={vitals.patientName}
                    onChange={(e) => setVitals({ ...vitals, patientName: e.target.value })}
                    placeholder="Enter patient name"
                    required
                  />
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systolicBP" className="text-sm font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Systolic BP (mmHg)
                  </Label>
                  <Input
                    id="systolicBP"
                    type="number"
                    value={vitals.systolicBP}
                    onChange={(e) => setVitals({ ...vitals, systolicBP: e.target.value })}
                    placeholder="120"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolicBP" className="text-sm font-medium">
                    Diastolic BP (mmHg)
                  </Label>
                  <Input
                    id="diastolicBP"
                    type="number"
                    value={vitals.diastolicBP}
                    onChange={(e) => setVitals({ ...vitals, diastolicBP: e.target.value })}
                    placeholder="80"
                    required
                  />
                </div>
              </div>

              {/* Heart Rate and Temperature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heartRate" className="text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    Heart Rate (bpm)
                  </Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                    placeholder="72"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="text-sm font-medium flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    Temperature (°F)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                    placeholder="98.6"
                    required
                  />
                </div>
              </div>

              {/* Oxygen and Respiratory Rate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oxygenSaturation" className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-500" />
                    Oxygen Saturation (%)
                  </Label>
                  <Input
                    id="oxygenSaturation"
                    type="number"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => setVitals({ ...vitals, oxygenSaturation: e.target.value })}
                    placeholder="98"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respiratoryRate" className="text-sm font-medium">
                    Respiratory Rate (breaths/min)
                  </Label>
                  <Input
                    id="respiratoryRate"
                    type="number"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals({ ...vitals, respiratoryRate: e.target.value })}
                    placeholder="16"
                    required
                  />
                </div>
              </div>

              {/* Weight and Height */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium">
                    Weight (lbs)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={vitals.weight}
                    onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                    placeholder="150"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium">
                    Height (inches)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={vitals.height}
                    onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                    placeholder="68"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </Label>
                <textarea
                  id="notes"
                  rows={3}
                  value={vitals.notes}
                  onChange={(e) => setVitals({ ...vitals, notes: e.target.value })}
                  placeholder="Additional notes about the patient's condition..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Vital Signs
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/nurse/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}
