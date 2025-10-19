import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  FileText, 
  Clock,
  Search
} from 'lucide-react';

export default function Notes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(5);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      room: '201A',
      note: 'Patient experiencing mild pain post-surgery. Pain level 6/10. Administered pain medication as prescribed.',
      category: 'pain_management',
      timestamp: '2024-01-15 10:30 AM',
      nurse: 'Sarah Johnson'
    },
    {
      id: 2,
      patientName: 'Mary Johnson',
      room: '203B',
      note: 'Blood sugar levels monitored. Patient educated on diabetes management and diet.',
      category: 'education',
      timestamp: '2024-01-15 09:15 AM',
      nurse: 'Sarah Johnson'
    },
    {
      id: 3,
      patientName: 'Robert Davis',
      room: '205A',
      note: 'Vital signs stable. Patient resting comfortably. Family updated on condition.',
      category: 'general',
      timestamp: '2024-01-15 08:45 AM',
      nurse: 'Sarah Johnson'
    },
    {
      id: 4,
      patientName: 'Lisa Wilson',
      room: '207B',
      note: 'Patient showing good recovery progress. Wound healing well. Encouraged mobility exercises.',
      category: 'assessment',
      timestamp: '2024-01-15 07:30 AM',
      nurse: 'Sarah Johnson'
    },
    {
      id: 5,
      patientName: 'John Smith',
      room: '201A',
      note: 'Follow-up on pain management. Patient reported improvement. Reduced pain medication dosage.',
      category: 'medication',
      timestamp: '2024-01-15 06:15 AM',
      nurse: 'Sarah Johnson'
    },
    {
      id: 6,
      patientName: 'Mary Johnson',
      room: '203B',
      note: 'Blood sugar levels within normal range. Patient following dietary recommendations well.',
      category: 'general',
      timestamp: '2024-01-14 11:45 PM',
      nurse: 'Sarah Johnson'
    },
    {
      id: 7,
      patientName: 'Robert Davis',
      room: '205A',
      note: 'Cardiac monitoring continued. No arrhythmias detected. Patient stable and comfortable.',
      category: 'assessment',
      timestamp: '2024-01-14 10:20 PM',
      nurse: 'Sarah Johnson'
    }
  ]);

  // Filter notes based on search term
  const filteredNotes = notes.filter(note =>
    note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  const breadcrumbs = [
    { label: 'Dashboard', href: '/nurse/dashboard' },
    { label: 'Nursing Notes', href: '/nurse/notes' }
  ];

  return (
    <DesktopLayout 
      role="nurse" 
      userName="Nurse Sarah Johnson" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6 m-2.5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nursing Notes</h1>
            <p className="text-gray-600 mt-1">Document patient care and observations</p>
            <div className="mt-2 flex items-center gap-4">
              <p className="text-sm text-gray-500">Total Notes: <span className="font-semibold">{notes.length}</span></p>
              <p className="text-sm text-gray-500">Filtered: <span className="font-semibold">{filteredNotes.length}</span></p>
            </div>
          </div>
        </div>

        {/* Notes List */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-600" />
                All Nursing Notes
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {currentNotes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{note.patientName}</h3>
                      <p className="text-sm text-gray-600">Room {note.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {note.timestamp}
                      </p>
                      <p className="text-xs text-gray-400">by {note.nurse}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{note.note}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">
                      {note.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
              
              {currentNotes.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No notes found</p>
                  <p className="text-sm mt-2">
                    {searchTerm ? 'Try adjusting your search terms' : 'Add notes from the patient management screen'}
                  </p>
                </div>
              )}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstNote + 1} to {Math.min(indexOfLastNote, filteredNotes.length)} of {filteredNotes.length} notes
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}
