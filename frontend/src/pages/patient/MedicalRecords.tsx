import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  ArrowLeft,
  FileText,
  Activity,
  Heart,
  Droplet,
  TestTube,
  Calendar,
  User,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Clock,
  Shield,
  Stethoscope,
  Pill,
  Syringe,
  Scissors,
  BarChart3,
  FileDown,
  Share2,
  Printer,
  PlusCircle,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  medicalRecordsService,
  MedicalRecord,
  VitalSigns,
  LabResult,
  Consultation,
  MedicalCondition,
  Allergy,
  Immunization,
  Procedure,
  HealthTrend,
  LabGroup,
  LabGroupingOptions,
  Visit,
  DoctorResponse
} from '@/services/medicalRecordsService';

export default function MedicalRecords() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState('overview');
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddVitalSigns, setShowAddVitalSigns] = useState(false);
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  
  // Lab grouping state
  const [labGroups, setLabGroups] = useState<LabGroup[]>([]);
  const [groupingOptions, setGroupingOptions] = useState<LabGroupingOptions>({
    groupBy: 'category',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [showGroupingControls, setShowGroupingControls] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
  const [availableFacilities, setAvailableFacilities] = useState<string[]>([]);
  const [selectedTestForTrend, setSelectedTestForTrend] = useState<string | null>(null);
  const [trendAnalysis, setTrendAnalysis] = useState<any>(null);
  const [showTrendModal, setShowTrendModal] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());
  const [expandedVisits, setExpandedVisits] = useState<Set<string>>(new Set());
  const [expandedResponses, setExpandedResponses] = useState<Set<string>>(new Set());
  const [visits, setVisits] = useState<Visit[]>([]);
  const [doctorResponses, setDoctorResponses] = useState<DoctorResponse[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<DoctorResponse | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadMedicalRecord();
  }, []);

  useEffect(() => {
    if (medicalRecord && activeTab === 'labs') {
      loadGroupedLabResults();
      loadLabMetadata();
    }
  }, [medicalRecord, activeTab, groupingOptions]);

  useEffect(() => {
    if (medicalRecord) {
      loadVisits();
      loadDoctorResponses();
    }
  }, [medicalRecord]);

  const loadMedicalRecord = async () => {
    try {
      setLoading(true);
      const record = await medicalRecordsService.getMedicalRecord('patient-1');
      setMedicalRecord(record);
    } catch (error) {
      console.error('Error loading medical record:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportRecords = async (format: 'pdf' | 'csv' | 'json') => {
    try {
      const blob = await medicalRecordsService.exportMedicalRecords('patient-1', format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medical-records.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting records:', error);
    }
  };

  const loadGroupedLabResults = async () => {
    try {
      const groups = await medicalRecordsService.getGroupedLabResults('patient-1', groupingOptions);
      setLabGroups(groups);
    } catch (error) {
      console.error('Error loading grouped lab results:', error);
    }
  };

  const loadLabMetadata = async () => {
    try {
      const [categories, doctors, facilities] = await Promise.all([
        medicalRecordsService.getLabResultCategories('patient-1'),
        medicalRecordsService.getLabResultDoctors('patient-1'),
        medicalRecordsService.getLabResultFacilities('patient-1')
      ]);
      
      setAvailableCategories(categories);
      setAvailableDoctors(doctors);
      setAvailableFacilities(facilities);
    } catch (error) {
      console.error('Error loading lab metadata:', error);
    }
  };

  const updateGroupingOptions = (newOptions: Partial<LabGroupingOptions>) => {
    setGroupingOptions(prev => ({ ...prev, ...newOptions }));
  };

  const loadTrendAnalysis = async (testName: string) => {
    try {
      const analysis = await medicalRecordsService.getTrendAnalysis('patient-1', testName);
      setTrendAnalysis(analysis);
      setShowTrendModal(true);
    } catch (error) {
      console.error('Error loading trend analysis:', error);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable':
        return <TrendingUp className="w-4 h-4 text-blue-600 transform rotate-90" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const toggleGroup = (groupId: string) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupId)) {
      newExpandedGroups.delete(groupId);
    } else {
      newExpandedGroups.add(groupId);
    }
    setExpandedGroups(newExpandedGroups);
  };

  const toggleTest = (testId: string) => {
    const newExpandedTests = new Set(expandedTests);
    if (newExpandedTests.has(testId)) {
      newExpandedTests.delete(testId);
    } else {
      newExpandedTests.add(testId);
    }
    setExpandedTests(newExpandedTests);
  };

  const expandAllGroups = () => {
    const allGroupIds = labGroups.map(group => group.id);
    setExpandedGroups(new Set(allGroupIds));
  };

  const collapseAllGroups = () => {
    setExpandedGroups(new Set());
    setExpandedTests(new Set());
  };

  const loadVisits = async () => {
    try {
      const visitsData = await medicalRecordsService.getVisits('patient-1');
      setVisits(visitsData);
    } catch (error) {
      console.error('Error loading visits:', error);
    }
  };

  const loadDoctorResponses = async () => {
    try {
      const responses = await medicalRecordsService.getDoctorResponses('patient-1');
      setDoctorResponses(responses);
    } catch (error) {
      console.error('Error loading doctor responses:', error);
    }
  };

  const toggleVisit = (visitId: string) => {
    const newExpandedVisits = new Set(expandedVisits);
    if (newExpandedVisits.has(visitId)) {
      newExpandedVisits.delete(visitId);
    } else {
      newExpandedVisits.add(visitId);
    }
    setExpandedVisits(newExpandedVisits);
  };

  const toggleResponse = (responseId: string) => {
    const newExpandedResponses = new Set(expandedResponses);
    if (newExpandedResponses.has(responseId)) {
      newExpandedResponses.delete(responseId);
    } else {
      newExpandedResponses.add(responseId);
    }
    setExpandedResponses(newExpandedResponses);
  };

  const viewDoctorResponse = (response: DoctorResponse) => {
    setSelectedResponse(response);
    setShowResponseModal(true);
  };

  const expandAllVisits = () => {
    const allVisitIds = visits.map(visit => visit.id);
    setExpandedVisits(new Set(allVisitIds));
  };

  const collapseAllVisits = () => {
    setExpandedVisits(new Set());
    setExpandedResponses(new Set());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'abnormal': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'active': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-gray-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };


  const renderOverview = () => (
    <div className="space-y-6">
      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Conditions</p>
                <p className="text-2xl font-bold text-blue-900">
                  {medicalRecord?.conditions.filter(c => c.status === 'active').length || 0}
                </p>
              </div>
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Allergies</p>
                <p className="text-2xl font-bold text-red-900">
                  {medicalRecord?.allergies.filter(a => a.status === 'active').length || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Recent Visits</p>
                <p className="text-2xl font-bold text-green-900">
                  {medicalRecord?.consultations.filter(c => 
                    new Date(c.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length || 0}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Last Checkup</p>
                <p className="text-sm font-bold text-purple-900">
                  {medicalRecord?.consultations[0] ? 
                    medicalRecordsService.formatDate(medicalRecord.consultations[0].date) : 'N/A'
                  }
                </p>
              </div>
              <Stethoscope className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Conditions & Allergies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Current Conditions
              </h3>
              <Badge variant="outline" className="text-xs">
                {medicalRecord?.conditions.filter(c => c.status === 'active').length || 0} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {medicalRecord?.conditions.filter(c => c.status === 'active').map((condition) => (
                <div key={condition.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{condition.name}</h4>
                    <Badge className={medicalRecordsService.getSeverityColor(condition.severity)}>
                      {condition.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{condition.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Diagnosed: {medicalRecordsService.formatDate(condition.diagnosedDate)}</span>
                    <span>By: {condition.diagnosedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Allergies
              </h3>
              <Button size="sm" variant="outline" onClick={() => setShowAddAllergy(true)}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {medicalRecord?.allergies.filter(a => a.status === 'active').map((allergy) => (
                <div key={allergy.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-red-900">{allergy.allergen}</h4>
                    <p className="text-sm text-red-700">{allergy.reaction}</p>
                  </div>
                  <Badge className={medicalRecordsService.getSeverityColor(allergy.severity)}>
                    {allergy.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vital Signs */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Latest Vital Signs</h3>
            <Button size="sm" variant="outline" onClick={() => setShowAddVitalSigns(true)}>
              <Plus className="w-4 h-4 mr-1" /> Add Reading
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {medicalRecord?.vitalSigns[0] && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {medicalRecord.vitalSigns[0].bloodPressure.systolic}/{medicalRecord.vitalSigns[0].bloodPressure.diastolic}
                </p>
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-xs text-gray-500">mmHg</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{medicalRecord.vitalSigns[0].heartRate}</p>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-xs text-gray-500">bpm</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{medicalRecord.vitalSigns[0].temperature}°F</p>
                <p className="text-sm text-gray-600">Temperature</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{medicalRecord.vitalSigns[0].weight} lbs</p>
                <p className="text-sm text-gray-600">Weight</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderVitalSigns = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Vital Signs History</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAddVitalSigns(true)}>
                <Plus className="w-4 h-4 mr-1" /> Add Reading
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportRecords('csv')}>
                <Download className="w-4 h-4 mr-1" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Blood Pressure</TableHead>
                  <TableHead>Heart Rate</TableHead>
                  <TableHead>Temperature</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Oxygen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recorded By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalRecord?.vitalSigns.map((vital) => (
                  <TableRow key={vital.id}>
                    <TableCell>{medicalRecordsService.formatDate(vital.date)}</TableCell>
                    <TableCell>
                      {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                    </TableCell>
                    <TableCell>{vital.heartRate} bpm</TableCell>
                    <TableCell>{vital.temperature}°F</TableCell>
                    <TableCell>{vital.weight} lbs</TableCell>
                    <TableCell>{vital.oxygenSaturation}%</TableCell>
                    <TableCell>
                      <Badge className={medicalRecordsService.getStatusColor(vital.status)}>
                        {vital.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vital.recordedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVisits = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Medical Visits & Doctor Responses</h3>
            <div className="flex gap-2">
              {visits.length > 0 && (
                <>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={expandAllVisits}
                  >
                    <ChevronDown className="w-4 h-4 mr-1" /> Expand All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={collapseAllVisits}
                  >
                    <ChevronUp className="w-4 h-4 mr-1" /> Collapse All
                  </Button>
                </>
              )}
              <Button size="sm" variant="outline" onClick={() => exportRecords('pdf')}>
                <Download className="w-4 h-4 mr-1" /> Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {visits.length > 0 ? (
            <div className="space-y-4">
              {visits.map((visit) => {
                const isVisitExpanded = expandedVisits.has(visit.id);
                return (
                  <div key={visit.id} className="border border-gray-200 rounded-lg">
                    {/* Visit Header - Clickable */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleVisit(visit.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {isVisitExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                            <div>
                              <h4 className="text-lg font-semibold">{visit.visitType.replace('_', ' ').toUpperCase()}</h4>
                              <p className="text-sm text-gray-600">{medicalRecordsService.formatDate(visit.date)}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {visit.doctorName}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={
                              visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                              visit.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }
                          >
                            {visit.status}
                          </Badge>
                          {visit.followUpRequired && (
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                              Follow-up Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 ml-8">
                        <p className="text-sm text-gray-700"><strong>Reason:</strong> {visit.reason}</p>
                        {visit.diagnosis && (
                          <p className="text-sm text-gray-700"><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Visit Content - Collapsible */}
                    {isVisitExpanded && (
                      <div className="border-t border-gray-100 p-4 space-y-4">
                        {/* Visit Notes */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold mb-2">Visit Notes</h5>
                          <p className="text-sm text-gray-700">{visit.notes}</p>
                        </div>

                        {/* Doctor Response */}
                        {visit.doctorResponse && (
                          <div className="border border-blue-200 rounded-lg bg-blue-50">
                            <div 
                              className="p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                              onClick={() => viewDoctorResponse(visit.doctorResponse!)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-blue-600" />
                                    <h5 className="font-semibold text-blue-900">Doctor Response</h5>
                                  </div>
                                  <Badge 
                                    className={
                                      visit.doctorResponse.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                      visit.doctorResponse.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                      visit.doctorResponse.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-green-100 text-green-800'
                                    }
                                  >
                                    {visit.doctorResponse.priority} priority
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    className={
                                      visit.doctorResponse.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                                      visit.doctorResponse.status === 'action_required' ? 'bg-red-100 text-red-800' :
                                      visit.doctorResponse.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                                      'bg-yellow-100 text-yellow-800'
                                    }
                                  >
                                    {visit.doctorResponse.status}
                                  </Badge>
                                  <Button size="sm" variant="outline" className="text-xs">
                                    View Full Response
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-blue-700 mt-2">{visit.doctorResponse.title}</p>
                            </div>
                          </div>
                        )}

                        {/* Follow-up Information */}
                        {visit.followUpRequired && visit.followUpDate && (
                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <h5 className="font-semibold text-orange-900 mb-2">Follow-up Required</h5>
                            <p className="text-sm text-orange-700">
                              <strong>Follow-up Date:</strong> {medicalRecordsService.formatDate(visit.followUpDate)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No visits found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderLabResults = () => (
    <div className="space-y-6">
      {/* Grouping Controls */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Laboratory Results</h3>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowGroupingControls(!showGroupingControls)}
              >
                <Filter className="w-4 h-4 mr-1" /> Group & Filter
              </Button>
              {labGroups.length > 0 && (
                <>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={expandAllGroups}
                  >
                    <ChevronDown className="w-4 h-4 mr-1" /> Expand All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={collapseAllGroups}
                  >
                    <ChevronUp className="w-4 h-4 mr-1" /> Collapse All
                  </Button>
                </>
              )}
              <Button size="sm" variant="outline" onClick={() => exportRecords('pdf')}>
                <Download className="w-4 h-4 mr-1" /> Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {showGroupingControls && (
          <CardContent className="p-6 border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="groupBy">Group By</Label>
                <select
                  id="groupBy"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={groupingOptions.groupBy}
                  onChange={(e) => updateGroupingOptions({ groupBy: e.target.value as any })}
                >
                  <option value="category">Category</option>
                  <option value="subcategory">Subcategory</option>
                  <option value="visit">Visit</option>
                  <option value="date">Date</option>
                  <option value="doctor">Doctor</option>
                  <option value="facility">Facility</option>
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="sortBy">Sort By</Label>
                <select
                  id="sortBy"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={groupingOptions.sortBy}
                  onChange={(e) => updateGroupingOptions({ sortBy: e.target.value as any })}
                >
                  <option value="date">Date</option>
                  <option value="status">Status</option>
                  <option value="testName">Test Name</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="sortOrder">Order</Label>
                <select
                  id="sortOrder"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={groupingOptions.sortOrder}
                  onChange={(e) => updateGroupingOptions({ sortOrder: e.target.value as any })}
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="dateRange">Date Range</Label>
                <select
                  id="dateRange"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    const now = new Date();
                    let startDate = '';
                    
                    switch (e.target.value) {
                      case 'week':
                        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
                        break;
                      case 'month':
                        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
                        break;
                      case '3months':
                        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
                        break;
                      case '6months':
                        startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString();
                        break;
                      case 'year':
                        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
                        break;
                      default:
                        return;
                    }
                    
                    updateGroupingOptions({
                      dateRange: {
                        start: startDate,
                        end: now.toISOString()
                      }
                    });
                  }}
                >
                  <option value="">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
          </CardContent>
        )}
        
        <CardContent className="p-6">
          {labGroups.length > 0 ? (
            <div className="space-y-4">
              {labGroups.map((group) => {
                const isGroupExpanded = expandedGroups.has(group.id);
                return (
                  <div key={group.id} className="border border-gray-200 rounded-lg">
                    {/* Group Header - Clickable */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleGroup(group.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {isGroupExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                            <h4 className="text-lg font-semibold">{group.name}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {group.results.length} test{group.results.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {group.trend && getTrendIcon(group.trend)}
                          <Badge className={medicalRecordsService.getStatusColor(group.status)}>
                            {getStatusIcon(group.status)}
                            <span className="ml-1">{group.status}</span>
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 ml-8">
                        {medicalRecordsService.formatDate(group.dateRange.start)} - {medicalRecordsService.formatDate(group.dateRange.end)}
                      </p>
                    </div>
                    
                    {/* Group Content - Collapsible */}
                    {isGroupExpanded && (
                      <div className="border-t border-gray-100 p-4">
                        <div className="space-y-4">
                  
                          {group.results.map((lab) => {
                            const isTestExpanded = expandedTests.has(lab.id);
                            return (
                              <div key={lab.id} className="border border-gray-100 rounded-lg bg-gray-50">
                                {/* Test Header - Clickable */}
                                <div 
                                  className="p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                  onClick={() => toggleTest(lab.id)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-2">
                                        {isTestExpanded ? (
                                          <ChevronUp className="w-4 h-4 text-gray-500" />
                                        ) : (
                                          <ChevronDown className="w-4 h-4 text-gray-500" />
                                        )}
                                        <div className="flex items-center gap-2">
                                          <h5 className="font-semibold">{lab.testName}</h5>
                                          {lab.trendDirection && getTrendIcon(lab.trendDirection)}
                                          {lab.isBaseline && (
                                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                              Baseline
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <Badge variant="outline" className="text-xs">
                                          {lab.category}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                          {lab.subcategory}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                          {lab.priority}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-xs h-6 px-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          loadTrendAnalysis(lab.testName);
                                        }}
                                      >
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        Trends
                                      </Button>
                                      <Badge className={medicalRecordsService.getStatusColor(lab.status)}>
                                        {getStatusIcon(lab.status)}
                                        <span className="ml-1">{lab.status}</span>
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-2 ml-6">
                                    {medicalRecordsService.formatDate(lab.date)} • {lab.doctor} • {lab.facility}
                                  </p>
                                </div>
                                
                                {/* Test Content - Collapsible */}
                                {isTestExpanded && (
                                  <div className="border-t border-gray-200 p-4">
                        
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {lab.results.map((result, idx) => (
                                        <div key={idx} className="p-3 bg-white rounded-lg border">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-sm">{result.name}</span>
                                            <Badge 
                                              variant="outline" 
                                              className={`text-xs ${medicalRecordsService.getStatusColor(result.status)}`}
                                            >
                                              {result.status}
                                            </Badge>
                                          </div>
                                          <p className="text-lg font-bold">{result.value} {result.unit}</p>
                                          <p className="text-xs text-gray-500">Range: {result.referenceRange}</p>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    {lab.notes && (
                                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-800">{lab.notes}</p>
                                      </div>
                                    )}
                                    
                                    {lab.followUpRequired && (
                                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                                        <p className="text-sm text-yellow-800 flex items-center gap-2">
                                          <AlertTriangle className="w-4 h-4" />
                                          Follow-up required
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <TestTube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No lab results found with current filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderConsultations = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-semibold">Consultation History</h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {medicalRecord?.consultations.map((consultation) => (
              <div key={consultation.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{consultation.diagnosis}</h4>
                    <p className="text-sm text-gray-600">
                      {medicalRecordsService.formatDate(consultation.date)} • {consultation.doctor}
                    </p>
                    <p className="text-sm text-gray-500">{consultation.specialty}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" /> View Details
                  </Button>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium mb-2">Notes:</h5>
                  <p className="text-sm text-gray-700">{consultation.notes}</p>
                </div>
                
                {consultation.prescriptions && consultation.prescriptions.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">Prescriptions:</h5>
                    <div className="flex flex-wrap gap-2">
                      {consultation.prescriptions.map((prescription, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 text-green-800">
                          <Pill className="w-3 h-3 mr-1" />
                          {prescription}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {consultation.followUpDate && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Calendar className="w-4 h-4" />
                    <span>Follow-up: {medicalRecordsService.formatDate(consultation.followUpDate)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderImmunizations = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-semibold">Immunization Records</h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Administered By</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalRecord?.immunizations.map((immunization) => (
                  <TableRow key={immunization.id}>
                    <TableCell className="font-medium">{immunization.vaccine}</TableCell>
                    <TableCell>{medicalRecordsService.formatDate(immunization.date)}</TableCell>
                    <TableCell>{immunization.administeredBy}</TableCell>
                    <TableCell>{immunization.location}</TableCell>
                    <TableCell>
                      {immunization.nextDue ? medicalRecordsService.formatDate(immunization.nextDue) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge className={medicalRecordsService.getStatusColor(immunization.status)}>
                        {immunization.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProcedures = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-semibold">Medical Procedures</h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {medicalRecord?.procedures.map((procedure) => (
              <div key={procedure.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold">{procedure.name}</h4>
                    <p className="text-sm text-gray-600">
                      {medicalRecordsService.formatDate(procedure.date)} • {procedure.performedBy}
                    </p>
                    <p className="text-sm text-gray-500">{procedure.facility}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {procedure.type}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium mb-2">Notes:</h5>
                  <p className="text-sm text-gray-700">{procedure.notes}</p>
                </div>
                
                {procedure.recoveryTime && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    <span>Recovery Time: {procedure.recoveryTime}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'vitals': return renderVitalSigns();
      case 'labs': return renderLabResults();
      case 'visits': return renderVisits();
      case 'consultations': return renderConsultations();
      case 'immunizations': return renderImmunizations();
      case 'procedures': return renderProcedures();
      default: return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading medical records...</p>
        </div>
      </div>
    );
  }

  const content = (
    <div className={isDesktop ? "p-8" : "p-6"}>
      {!isDesktop && (
        <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')} className="mb-4 -ml-2">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </Button>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="w-8 h-8 text-teal-600" />
          Medical Records
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportRecords('pdf')}>
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} className="space-y-4">
        <TabsList className="w-full justify-start bg-white border border-gray-200 shadow-sm">
          <TabsTrigger value="overview" onClick={() => setActiveTab('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="vitals" onClick={() => setActiveTab('vitals')}>
            Vital Signs
          </TabsTrigger>
          <TabsTrigger value="labs" onClick={() => setActiveTab('labs')}>
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="visits" onClick={() => setActiveTab('visits')}>
            Visits
          </TabsTrigger>
          <TabsTrigger value="consultations" onClick={() => setActiveTab('consultations')}>
            Consultations
          </TabsTrigger>
          <TabsTrigger value="immunizations" onClick={() => setActiveTab('immunizations')}>
            Immunizations
          </TabsTrigger>
          <TabsTrigger value="procedures" onClick={() => setActiveTab('procedures')}>
            Procedures
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {renderCurrentTab()}
        </TabsContent>
      </Tabs>
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
                <Activity className="w-5 h-5" />
                <span className="font-semibold">Medical Records</span>
              </div>
            </div>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard', path: '/patient/dashboard' }, { label: 'Medical Records' }]}>
      {content}
      
      {/* Trend Analysis Modal */}
      {showTrendModal && trendAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Trend Analysis: {trendAnalysis.testName}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTrendModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Trend Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">Current Trend</h4>
                  {getTrendIcon(trendAnalysis.trend)}
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Direction:</strong> {trendAnalysis.trendDetails.direction}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Significance:</strong> {trendAnalysis.trendDetails.significance}
                </p>
                {trendAnalysis.trendDetails.recommendation && (
                  <p className="text-sm text-blue-600 mt-2">
                    <strong>Recommendation:</strong> {trendAnalysis.trendDetails.recommendation}
                  </p>
                )}
              </div>

              {/* Current Result */}
              {trendAnalysis.currentResult && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Current Result</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trendAnalysis.currentResult.results.map((result: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{result.name}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${medicalRecordsService.getStatusColor(result.status)}`}
                          >
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-lg font-bold">{result.value} {result.unit}</p>
                        <p className="text-xs text-gray-500">Range: {result.referenceRange}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous Results */}
              {trendAnalysis.previousResults.length > 0 && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Previous Results</h4>
                  <div className="space-y-3">
                    {trendAnalysis.previousResults.map((prevResult: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{medicalRecordsService.formatDate(prevResult.date)}</span>
                          <Badge className={medicalRecordsService.getStatusColor(prevResult.status)}>
                            {getStatusIcon(prevResult.status)}
                            <span className="ml-1">{prevResult.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {prevResult.results.map((result: any, resultIdx: number) => (
                            <div key={resultIdx} className="text-sm">
                              <span className="font-medium">{result.name}:</span> {result.value} {result.unit}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {trendAnalysis.previousResults.length === 0 && (
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-gray-600">No previous results available for comparison.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Doctor Response Modal */}
      {showResponseModal && selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Doctor Response: {selectedResponse.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowResponseModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Response Header */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Doctor</p>
                    <p className="text-sm text-gray-900">{selectedResponse.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Date</p>
                    <p className="text-sm text-gray-900">{medicalRecordsService.formatDate(selectedResponse.responseDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Type</p>
                    <p className="text-sm text-gray-900">{selectedResponse.responseType.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge 
                    className={
                      selectedResponse.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      selectedResponse.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      selectedResponse.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }
                  >
                    {selectedResponse.priority} priority
                  </Badge>
                  <Badge 
                    className={
                      selectedResponse.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                      selectedResponse.status === 'action_required' ? 'bg-red-100 text-red-800' :
                      selectedResponse.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {selectedResponse.status}
                  </Badge>
                </div>
              </div>

              {/* Response Content */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Response Content</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedResponse.content}</p>
              </div>

              {/* Recommendations */}
              {selectedResponse.recommendations && selectedResponse.recommendations.length > 0 && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-2 text-blue-900">Recommendations</h4>
                  <ul className="space-y-1">
                    {selectedResponse.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lifestyle Advice */}
              {selectedResponse.lifestyleAdvice && selectedResponse.lifestyleAdvice.length > 0 && (
                <div className="p-4 border rounded-lg bg-green-50">
                  <h4 className="font-semibold mb-2 text-green-900">Lifestyle Advice</h4>
                  <ul className="space-y-1">
                    {selectedResponse.lifestyleAdvice.map((advice, idx) => (
                      <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Follow-up Information */}
              {selectedResponse.followUpDate && (
                <div className="p-4 border rounded-lg bg-orange-50">
                  <h4 className="font-semibold mb-2 text-orange-900">Follow-up</h4>
                  <p className="text-sm text-orange-800">
                    <strong>Follow-up Date:</strong> {medicalRecordsService.formatDate(selectedResponse.followUpDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}
