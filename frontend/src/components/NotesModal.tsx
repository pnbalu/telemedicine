import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  Save,
  X,
  Plus
} from 'lucide-react';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: {
    id: number;
    name: string;
    room: string;
  } | null;
  onNoteAdded?: (note: any) => void;
}

export default function NotesModal({ isOpen, onClose, patient, onNoteAdded }: NotesModalProps) {
  const [newNote, setNewNote] = useState({
    patientId: '',
    patientName: '',
    note: '',
    category: 'general'
  });

  // Handle patient context
  useEffect(() => {
    if (patient) {
      setNewNote(prev => ({
        ...prev,
        patientId: patient.id.toString(),
        patientName: patient.name,
        note: `Room ${patient.room} - `
      }));
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const noteData = {
      id: Date.now(), // Simple ID generation
      patientName: newNote.patientName,
      room: patient?.room || '',
      note: newNote.note,
      category: newNote.category,
      timestamp: new Date().toLocaleString(),
      nurse: 'Sarah Johnson'
    };

    console.log('Note submitted:', noteData);
    
    // Call the callback to add note to the list
    if (onNoteAdded) {
      onNoteAdded(noteData);
    }

    // Reset form
    setNewNote({
      patientId: '',
      patientName: '',
      note: '',
      category: 'general'
    });
    
    onClose();
  };

  const handleClose = () => {
    // Reset form when closing
    setNewNote({
      patientId: '',
      patientName: '',
      note: '',
      category: 'general'
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
              <FileText className="w-5 h-5 text-pink-600" />
              Add Nursing Note
            </h2>
            {patient && (
              <p className="text-sm text-gray-600 mt-1">
                Adding note for: <strong>{patient.name}</strong> - Room {patient.room}
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
                  value={newNote.patientId}
                  onChange={(e) => setNewNote({ ...newNote, patientId: e.target.value })}
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
                  value={newNote.patientName}
                  onChange={(e) => setNewNote({ ...newNote, patientName: e.target.value })}
                  placeholder="Enter patient name"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <select
                id="category"
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="pain_management">Pain Management</option>
                <option value="medication">Medication</option>
                <option value="education">Patient Education</option>
                <option value="assessment">Assessment</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm font-medium">
                Note
              </Label>
              <textarea
                id="note"
                rows={6}
                value={newNote.note}
                onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
                placeholder="Enter your nursing note..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Note
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
