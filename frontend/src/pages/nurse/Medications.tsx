import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Pill, 
  Search, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Plus,
  Eye,
  User,
  Calendar,
  Filter,
  SortAsc,
  TrendingUp,
  Activity,
  Bell,
  Shield,
  Info,
  Zap,
  XCircle,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Heart
} from 'lucide-react';

export default function Medications() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [patientContext, setPatientContext] = useState(null);
  const [selectedTab, setSelectedTab] = useState('scheduled');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nextDose');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [medicationsPerPage] = useState(10);

  // Handle patient context from navigation
  useEffect(() => {
    if (location.state) {
      setPatientContext(location.state);
    }
  }, [location.state]);

  const medications = [
    {
      id: 1,
      patientId: 'P001',
      patientName: 'John Smith',
      room: '201A',
      medication: 'Morphine',
      dosage: '5mg',
      frequency: 'Every 4 hours',
      route: 'IV',
      nextDose: '10:30 AM',
      status: 'scheduled',
      priority: 'high',
      prescribedBy: 'Dr. Alice Smith',
      prescribedDate: '2024-01-15',
      lastAdministered: '2024-01-15 06:30 AM',
      remainingDoses: 12,
      allergies: ['Codeine'],
      interactions: ['Sedatives', 'Alcohol'],
      notes: 'Monitor respiratory rate closely',
      category: 'Analgesic',
      sideEffects: ['Drowsiness', 'Nausea'],
      contraindications: ['Respiratory depression']
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Mary Johnson',
      room: '203B',
      medication: 'Insulin Regular',
      dosage: '10 units',
      frequency: 'Before meals',
      route: 'Subcutaneous',
      nextDose: '12:00 PM',
      status: 'scheduled',
      priority: 'high',
      prescribedBy: 'Dr. Bob Wilson',
      prescribedDate: '2024-01-14',
      lastAdministered: '2024-01-15 08:00 AM',
      remainingDoses: 8,
      allergies: [],
      interactions: ['Beta-blockers'],
      notes: 'Check blood glucose before administration',
      category: 'Antidiabetic',
      sideEffects: ['Hypoglycemia'],
      contraindications: ['Hypoglycemia']
    },
    {
      id: 3,
      patientId: 'P003',
      patientName: 'Robert Davis',
      room: '205A',
      medication: 'Digoxin',
      dosage: '0.25mg',
      frequency: 'Once daily',
      route: 'Oral',
      nextDose: '8:00 AM',
      status: 'completed',
      priority: 'high',
      prescribedBy: 'Dr. Carol Brown',
      prescribedDate: '2024-01-13',
      lastAdministered: '2024-01-15 08:00 AM',
      remainingDoses: 28,
      allergies: [],
      interactions: ['Diuretics', 'Calcium'],
      notes: 'Monitor heart rate and rhythm',
      category: 'Cardiac glycoside',
      sideEffects: ['Nausea', 'Visual disturbances'],
      contraindications: ['Ventricular fibrillation']
    },
    {
      id: 4,
      patientId: 'P004',
      patientName: 'Lisa Wilson',
      room: '207B',
      medication: 'Acetaminophen',
      dosage: '500mg',
      frequency: 'As needed',
      route: 'Oral',
      nextDose: 'N/A',
      status: 'available',
      priority: 'low',
      prescribedBy: 'Dr. David Lee',
      prescribedDate: '2024-01-12',
      lastAdministered: '2024-01-15 14:00 PM',
      remainingDoses: 24,
      allergies: [],
      interactions: ['Warfarin'],
      notes: 'Maximum 4g per day',
      category: 'Analgesic/Antipyretic',
      sideEffects: ['Rare: Liver toxicity'],
      contraindications: ['Severe liver disease']
    },
    {
      id: 5,
      patientId: 'P005',
      patientName: 'Michael Chen',
      room: '209A',
      medication: 'Warfarin',
      dosage: '5mg',
      frequency: 'Once daily',
      route: 'Oral',
      nextDose: '8:00 PM',
      status: 'scheduled',
      priority: 'high',
      prescribedBy: 'Dr. Emma Taylor',
      prescribedDate: '2024-01-10',
      lastAdministered: '2024-01-15 20:00 PM',
      remainingDoses: 30,
      allergies: [],
      interactions: ['Acetaminophen', 'NSAIDs'],
      notes: 'Monitor INR regularly',
      category: 'Anticoagulant',
      sideEffects: ['Bleeding risk'],
      contraindications: ['Active bleeding']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'available': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Analgesic': return <Pill className="w-5 h-5 text-red-600" />;
      case 'Antidiabetic': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'Cardiac glycoside': return <Heart className="w-5 h-5 text-green-600" />;
      case 'Anticoagulant': return <Shield className="w-5 h-5 text-purple-600" />;
      default: return <Pill className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleAdminister = (medication: any) => {
    // Update medication status to completed
    console.log('Administering medication:', medication);
    // In real app, this would update the database
  };

  const handleSkip = (medication: any) => {
    console.log('Skipping medication:', medication);
    // In real app, this would update the database
  };

  const handleViewDetails = (medication: any) => {
    setSelectedMedication(medication);
    setShowDetailsModal(true);
  };

  const filteredMedications = medications.filter(med => {
    const matchesSearch = 
      med.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || med.status === selectedTab;
    const matchesFilter = selectedFilter === 'all' || med.priority === selectedFilter;
    
    return matchesSearch && matchesTab && matchesFilter;
  });

  const sortedMedications = [...filteredMedications].sort((a, b) => {
    switch (sortBy) {
      case 'nextDose':
        return new Date(a.nextDose).getTime() - new Date(b.nextDose).getTime();
      case 'patientName':
        return a.patientName.localeCompare(b.patientName);
      case 'medication':
        return a.medication.localeCompare(b.medication);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  const indexOfLastMedication = currentPage * medicationsPerPage;
  const indexOfFirstMedication = indexOfLastMedication - medicationsPerPage;
  const currentMedications = sortedMedications.slice(indexOfFirstMedication, indexOfLastMedication);
  const totalPages = Math.ceil(sortedMedications.length / medicationsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const stats = {
    total: medications.length,
    scheduled: medications.filter(m => m.status === 'scheduled').length,
    completed: medications.filter(m => m.status === 'completed').length,
    overdue: medications.filter(m => m.status === 'overdue').length,
    highPriority: medications.filter(m => m.priority === 'high').length
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/nurse/dashboard' },
    { label: 'Medications', href: '/nurse/medications' }
  ];

  return (
    <DesktopLayout 
      role="nurse" 
      userName="Nurse Sarah Johnson" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6 m-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medication Management</h1>
            <p className="text-gray-600 mt-1">Track and administer patient medications</p>
            {patientContext && (
              <div className="mt-2 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                <p className="text-sm text-pink-800">
                  <strong>Viewing medications for:</strong> {patientContext.patientName} - Room {patientContext.room}
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.highPriority}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border-0 shadow-lg bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search medications by patient, medication, room, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All', count: medications.length },
                  { key: 'scheduled', label: 'Scheduled', count: stats.scheduled },
                  { key: 'completed', label: 'Completed', count: stats.completed },
                  { key: 'overdue', label: 'Overdue', count: stats.overdue }
                ].map((tab) => (
                  <Button
                    key={tab.key}
                    variant={selectedTab === tab.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTab(tab.key)}
                    className="flex items-center gap-2"
                  >
                    {tab.label}
                    <Badge variant="secondary" className="text-xs">
                      {tab.count}
                    </Badge>
                  </Button>
                ))}
              </div>
              
              {/* Filters */}
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="nextDose">Sort by Time</option>
                  <option value="patientName">Sort by Patient</option>
                  <option value="medication">Sort by Medication</option>
                  <option value="priority">Sort by Priority</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medications List */}
        <div className="space-y-4">
          {currentMedications.map((med) => (
            <Card key={med.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                      {getCategoryIcon(med.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{med.medication}</h3>
                        <Badge className={`text-xs ${getStatusColor(med.status)}`}>
                          {med.status}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(med.priority)}`}>
                          {med.priority} priority
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Patient</p>
                          <p className="font-medium">{med.patientName} - Room {med.room}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Dosage & Route</p>
                          <p className="font-medium">{med.dosage} • {med.route}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Frequency</p>
                          <p className="font-medium">{med.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Dose</p>
                          <p className="font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {med.nextDose}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                        <span>Prescribed by: {med.prescribedBy}</span>
                        <span>Remaining: {med.remainingDoses} doses</span>
                        {med.allergies.length > 0 && (
                          <span className="text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {med.allergies.length} allergy(ies)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(med)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    {med.status === 'scheduled' && (
                      <>
                        <Button 
                          size="sm"
                          onClick={() => handleAdminister(med)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Administer
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSkip(med)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Skip
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {currentMedications.length === 0 && (
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-12 text-center">
                <Pill className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No medications found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'Try adjusting your search criteria' : 'No medications match your current filters'}
                </p>
                {searchTerm && (
                  <Button variant="outline" onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstMedication + 1} to {Math.min(indexOfLastMedication, sortedMedications.length)} of {sortedMedications.length} medications
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
            </CardContent>
          </Card>
        )}
      </div>
    </DesktopLayout>
  );
}
