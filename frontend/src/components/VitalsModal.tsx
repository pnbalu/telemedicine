import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Save,
  X,
  User
} from 'lucide-react';

interface VitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: {
    id: number;
    name: string;
    room: string;
  } | null;
}

export default function VitalsModal({ isOpen, onClose, patient }: VitalsModalProps) {
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

  // Handle patient context
  useEffect(() => {
    if (patient) {
      setVitals(prev => ({
        ...prev,
        patientId: patient.id.toString(),
        patientName: patient.name,
        notes: `Room ${patient.room} - `
      }));
    }
  }, [patient]);

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
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-pink-600" />
              Record Vital Signs
            </h2>
            {patient && (
              <p className="text-sm text-gray-600 mt-1">
                Recording vitals for: <strong>{patient.name}</strong> - Room {patient.room}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Vital Signs
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
