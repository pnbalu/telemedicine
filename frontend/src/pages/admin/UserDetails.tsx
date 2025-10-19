import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Camera,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react';

interface UserDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
  specialization: string;
  licenseNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
  photo: string;
  joined: string;
  lastLogin: string;
  familyMembers: any[];
  documents: {
    idDocument: string;
    addressProofDocument: string;
    insuranceCardFront: string;
    insuranceCardBack: string;
    insurancePolicyDocument: string;
    insuranceAuthorization: string;
    degreeCertificate: string;
    licenseCertificate: string;
    experienceLetter: string;
    additionalCertifications: string;
  };
}

export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [lastActivity, setLastActivity] = useState('2 hours ago');
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [selectedDocumentForViewer, setSelectedDocumentForViewer] = useState<string | null>(null);
  const [selectedDocumentTitle, setSelectedDocumentTitle] = useState('');

  useEffect(() => {
    // Get user data from location state or fetch from API
    if (location.state?.user) {
      const userData = location.state.user;
      // Ensure documents object exists
      if (!userData.documents) {
        userData.documents = {
          idDocument: '',
          addressProofDocument: '',
          insuranceCardFront: '',
          insuranceCardBack: '',
          insurancePolicyDocument: '',
          insuranceAuthorization: '',
          degreeCertificate: '',
          licenseCertificate: '',
          experienceLetter: '',
          additionalCertifications: ''
        };
      }
      // Ensure familyMembers array exists
      if (!userData.familyMembers) {
        userData.familyMembers = [];
      }
      setUser(userData);
    } else {
      // Mock user data for demonstration
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Patient',
        status: 'Active',
        dateOfBirth: '1985-03-15',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        department: '',
        specialization: '',
        licenseNumber: '',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+1 (555) 987-6543',
        notes: 'Patient prefers morning appointments',
        photo: '',
        joined: '2024-01-15',
        lastLogin: '2 hours ago',
        familyMembers: [
          { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', relationship: 'spouse' },
          { id: 3, name: 'Johnny Doe', email: 'johnny.doe@example.com', relationship: 'child' }
        ],
        documents: {
          idDocument: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJagramma==',
          addressProofDocument: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJagramma==',
          insuranceCardFront: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJagramma==',
          insuranceCardBack: '',
          insurancePolicyDocument: '',
          insuranceAuthorization: '',
          degreeCertificate: '',
          licenseCertificate: '',
          experienceLetter: '',
          additionalCertifications: ''
        }
      });
    }
  }, [location.state]);

  const handleBack = () => {
    navigate('/admin/users');
  };

  const handleDocumentClick = (documentUrl: string, type: string) => {
    if (documentUrl) {
      setSelectedDocument(documentUrl);
      setDocumentType(type);
      setShowDocumentViewer(true);
      setZoomLevel(1);
      setRotation(0);
    }
  };

  const closeDocumentViewer = () => {
    setShowDocumentViewer(false);
    setSelectedDocument(null);
    setDocumentType('');
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleCloseDocumentViewer = () => {
    setShowDocumentViewer(false);
    setSelectedDocument(null);
    setDocumentType('');
    setZoomLevel(1);
    setRotation(0);
  };

  const handleDocumentView = (documentUrl: string, title: string) => {
    setSelectedDocumentForViewer(documentUrl);
    setSelectedDocumentTitle(title);
    setShowRightSidebar(true);
  };

  const handleCloseRightSidebar = () => {
    setShowRightSidebar(false);
    setSelectedDocumentForViewer(null);
    setSelectedDocumentTitle('');
  };

  const handleVerifyDocument = (documentType: string) => {
    // Handle document verification logic
    console.log(`Verifying ${documentType}`);
    // You can implement actual verification logic here
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      case 'nurse': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <DesktopLayout role="admin" userName="Admin User">
        <div className="flex-1 py-6 px-4 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user details...</p>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout role="admin" userName="Admin User">
      <div className="flex-1 py-6 px-4 bg-gray-50 overflow-y-auto">
        <div className="w-full">
          {/* Enhanced Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Users
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg font-bold">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">{user.email} • {user.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(user.status)} px-3 py-1`}>
                    {user.status}
                  </Badge>
                  <Badge className={`${getRoleColor(user.role)} px-3 py-1`}>
                    {user.role}
                  </Badge>
                </div>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowNotesModal(true)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
            
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.joined ? new Date(user.joined).toLocaleDateString() : 'N/A'}</div>
                <div className="text-sm text-gray-500">Joined Date</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{lastActivity}</div>
                <div className="text-sm text-gray-500">Last Activity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{user.documents ? Object.values(user.documents).filter(doc => doc).length : 0}</div>
                <div className="text-sm text-gray-500">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{user.familyMembers ? user.familyMembers.length : 0}</div>
                <div className="text-sm text-gray-500">Family Members</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full ${user.role === 'Patient' ? 'grid-cols-4' : 'grid-cols-3'}`}>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                {user.role === 'Patient' && <TabsTrigger value="family">Family</TabsTrigger>}
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{user.dateOfBirth}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Address Information</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="font-medium">{user.address}</p>
                        <p className="text-gray-600">{user.city}, {user.state} {user.zipCode}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {user.role.toLowerCase() === 'doctor' && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Professional Information</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Department</p>
                          <p className="font-medium">{user.department || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Specialization</p>
                          <p className="font-medium">{user.specialization || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">License Number</p>
                          <p className="font-medium">{user.licenseNumber || 'Not specified'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Emergency Contact</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Contact Name</p>
                        <p className="font-medium">{user.emergencyContact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact Phone</p>
                        <p className="font-medium">{user.emergencyPhone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {user.notes && (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Notes</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{user.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ID Documents */}
                  <Card>
                    <CardHeader>
                      <h4 className="font-medium">ID Documents</h4>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div 
                        className={`p-4 border rounded-lg transition-colors ${
                          user.documents?.idDocument 
                            ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium">ID Document</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {user.documents?.idDocument ? (
                              <>
                                <Badge variant="secondary" className="text-xs">Uploaded</Badge>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleVerifyDocument('ID Document')}
                                  className="text-xs px-2 py-1"
                                >
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verify
                                </Button>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">Not uploaded</span>
                            )}
                          </div>
                        </div>
                        {user.documents?.idDocument && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentView(user.documents.idDocument, 'ID Document')}
                              className="text-xs px-3 py-1"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Document
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentClick(user.documents.idDocument, 'ID Document')}
                              className="text-xs px-3 py-1"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                      <div 
                        className={`p-4 border rounded-lg transition-colors ${
                          user.documents?.addressProofDocument 
                            ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm font-medium">Address Proof</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {user.documents?.addressProofDocument ? (
                              <>
                                <Badge variant="secondary" className="text-xs">Uploaded</Badge>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleVerifyDocument('Address Proof')}
                                  className="text-xs px-2 py-1"
                                >
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verify
                                </Button>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">Not uploaded</span>
                            )}
                          </div>
                        </div>
                        {user.documents?.addressProofDocument && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentView(user.documents.addressProofDocument, 'Address Proof')}
                              className="text-xs px-3 py-1"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Document
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDocumentClick(user.documents.addressProofDocument, 'Address Proof')}
                              className="text-xs px-3 py-1"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insurance Documents */}
                  {user.role.toLowerCase() === 'patient' && (
                    <Card>
                      <CardHeader>
                        <h4 className="font-medium">Insurance Documents</h4>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            user.documents?.insuranceCardFront 
                              ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          onClick={() => user.documents?.insuranceCardFront && handleDocumentClick(user.documents.insuranceCardFront, 'Insurance Card Front')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">Insurance Card Front</span>
                            </div>
                            {user.documents?.insuranceCardFront ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <span className="text-xs text-gray-500">Not uploaded</span>
                            )}
                          </div>
                        </div>
                        <div 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            user.documents?.insuranceCardBack 
                              ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          onClick={() => user.documents?.insuranceCardBack && handleDocumentClick(user.documents.insuranceCardBack, 'Insurance Card Back')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">Insurance Card Back</span>
                            </div>
                            {user.documents?.insuranceCardBack ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <span className="text-xs text-gray-500">Not uploaded</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Professional Documents */}
                  {user.role.toLowerCase() === 'doctor' && (
                    <Card>
                      <CardHeader>
                        <h4 className="font-medium">Professional Documents</h4>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            user.documents?.degreeCertificate 
                              ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          onClick={() => user.documents?.degreeCertificate && handleDocumentClick(user.documents.degreeCertificate, 'Degree Certificate')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">Degree Certificate</span>
                            </div>
                            {user.documents?.degreeCertificate ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <span className="text-xs text-gray-500">Not uploaded</span>
                            )}
                          </div>
                        </div>
                        <div 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            user.documents?.licenseCertificate 
                              ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                          onClick={() => user.documents?.licenseCertificate && handleDocumentClick(user.documents.licenseCertificate, 'License Certificate')}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">License Certificate</span>
                            </div>
                            {user.documents?.licenseCertificate ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <span className="text-xs text-gray-500">Not uploaded</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Family Tab */}
              {user.role === 'Patient' && (
                <TabsContent value="family" className="space-y-6">
                {user.familyMembers && user.familyMembers.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Family Members</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {user.familyMembers && user.familyMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.email} • {member.relationship}</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent>
                      <div className="text-center py-8">
                        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Family Members</h3>
                        <p className="text-gray-500">This user has no linked family members.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                </TabsContent>
              )}

              {/* Enhanced Activity Tab */}
              <TabsContent value="activity" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Account Activity Timeline</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Account Created</p>
                            <span className="text-xs text-gray-500">{user.joined}</span>
                          </div>
                          <p className="text-sm text-gray-600">User account was successfully created and activated</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Last Login</p>
                            <span className="text-xs text-gray-500">{user.lastLogin}</span>
                          </div>
                          <p className="text-sm text-gray-600">User logged in from Chrome on Windows</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Profile Updated</p>
                            <span className="text-xs text-gray-500">1 day ago</span>
                          </div>
                          <p className="text-sm text-gray-600">User updated their profile information</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Document Uploaded</p>
                            <span className="text-xs text-gray-500">3 days ago</span>
                          </div>
                          <p className="text-sm text-gray-600">User uploaded ID document for verification</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Email Verified</p>
                            <span className="text-xs text-gray-500">5 days ago</span>
                          </div>
                          <p className="text-sm text-gray-600">User verified their email address</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Recent Actions</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Message Sent</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">Completed</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Appointment Scheduled</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Document Reviewed</p>
                            <p className="text-xs text-gray-500">2 days ago</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">Approved</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Profile Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {user.photo ? (
                      <img 
                        src={user.photo} 
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <h4 className="font-semibold text-lg">{user.name}</h4>
                  <p className="text-gray-500">{user.email}</p>
                  <div className="mt-3 space-y-2">
                    <Badge className={`${getStatusColor(user.status)} px-3 py-1`}>
                      {user.status}
                    </Badge>
                    <Badge className={`${getRoleColor(user.role)} px-3 py-1`}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">{user.joined}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Login</span>
                    <span className="font-medium">{user.lastLogin}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium">{user.city}, {user.state}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Patient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">User Metrics</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Profile Completion</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Documents Verified</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Activity Score</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Document Viewer Modal */}
      {showDocumentViewer && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            {/* Document Viewer Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{documentType}</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleCloseDocumentViewer}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Document Viewer Content */}
            <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
              <div 
                className="max-w-full max-h-full overflow-auto"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <img 
                  src={selectedDocument} 
                  alt={documentType}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Document Viewer Footer */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Full Screen
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Use mouse wheel to zoom, drag to pan
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Sidebar Document Viewer */}
      {showRightSidebar && selectedDocumentForViewer && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl border-l z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{selectedDocumentTitle}</h3>
            <Button variant="ghost" size="sm" onClick={handleCloseRightSidebar}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4">
            <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
              {selectedDocumentForViewer.startsWith('data:image') || 
               selectedDocumentForViewer.endsWith('.png') || 
               selectedDocumentForViewer.endsWith('.jpg') || 
               selectedDocumentForViewer.endsWith('.jpeg') ? (
                <img
                  src={selectedDocumentForViewer}
                  alt={selectedDocumentTitle}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <iframe
                  src={selectedDocumentForViewer}
                  title={selectedDocumentTitle}
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="flex-1"
              >
                <ZoomOut className="w-4 h-4 mr-2" />
                Zoom Out
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="flex-1"
              >
                <ZoomIn className="w-4 h-4 mr-2" />
                Zoom In
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRotate}
                className="flex-1"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Rotate
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectedDocumentForViewer && handleDocumentClick(selectedDocumentForViewer, selectedDocumentTitle)}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Document
            </Button>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
}
