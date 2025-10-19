import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Search, 
  Users as UsersIcon, 
  Eye, 
  Edit, 
  Ban, 
  Plus,
  Filter,
  Download,
  UserPlus,
  UserCheck,
  UserX,
  X,
  Save,
  Mail,
  Phone,
  Calendar,
  Shield,
  Send,
  UserCheck2,
  Copy,
  CheckCircle,
  Camera,
  Upload,
  User,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Users() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDocumentScanner, setShowDocumentScanner] = useState(false);
  const [scannerDocumentType, setScannerDocumentType] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('photo');
  
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [scannerStream, setScannerStream] = useState<MediaStream | null>(null);
  const [scannerVideoRef, setScannerVideoRef] = useState<HTMLVideoElement | null>(null);
  const [scannerCanvasRef, setScannerCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(new Set());
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

  const tabs = [
    { id: 'photo', label: 'Photo', icon: Camera },
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'professional', label: 'Professional', icon: Shield },
    { id: 'personal', label: 'Personal', icon: Phone },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'family', label: 'Family', icon: User },
    { id: 'emergency', label: 'Emergency', icon: Phone },
    { id: 'notes', label: 'Notes', icon: FileText }
  ];
  
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'patient',
    firstName: '',
    lastName: '',
    message: 'Welcome to TeleMedX! Please complete your registration using the link below.'
  });
  const [copiedLink, setCopiedLink] = useState('');
  
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'patient',
    status: 'active',
    department: '',
    specialization: '',
    licenseNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: '',
    photo: '',
    familyMembers: [],
    linkedPatientId: '',
    relationshipType: ''
  });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@example.com', role: 'Doctor', status: 'Active', joined: '2025-10-01', patients: 45, lastLogin: '2 hours ago' },
    { id: 2, name: 'John Doe', email: 'john.d@example.com', role: 'Patient', status: 'Active', joined: '2025-10-02', appointments: 3, lastLogin: '1 day ago' },
    { id: 3, name: 'Dr. Michael Chen', email: 'michael.c@example.com', role: 'Doctor', status: 'Pending', joined: '2025-10-03', patients: 0, lastLogin: 'Never' },
    { id: 4, name: 'Jane Smith', email: 'jane.s@example.com', role: 'Patient', status: 'Active', joined: '2025-10-04', appointments: 5, lastLogin: '3 hours ago' },
    { id: 5, name: 'Dr. Emily Davis', email: 'emily.d@example.com', role: 'Doctor', status: 'Active', joined: '2025-09-28', patients: 62, lastLogin: '30 min ago' },
    { id: 6, name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Patient', status: 'Active', joined: '2025-09-25', appointments: 2, lastLogin: '2 days ago' },
    { id: 7, name: 'Dr. James Wilson', email: 'james.w@example.com', role: 'Doctor', status: 'Suspended', joined: '2025-09-20', patients: 23, lastLogin: '1 week ago' },
    { id: 8, name: 'Emma Davis', email: 'emma.d@example.com', role: 'Patient', status: 'Active', joined: '2025-09-15', appointments: 8, lastLogin: '5 hours ago' },
  ]);

  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      alert('Please fill in all required fields');
      return;
    }

    const user = {
      id: users.length + 1,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
      status: newUser.status.charAt(0).toUpperCase() + newUser.status.slice(1),
      joined: new Date().toISOString().split('T')[0],
      patients: newUser.role === 'doctor' ? 0 : undefined,
      appointments: newUser.role === 'patient' ? 0 : undefined,
      lastLogin: 'Never',
      photo: newUser.photo
    };

    setUsers([...users, user]);
    
    // Reset form
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'patient',
      status: 'active',
      department: '',
      specialization: '',
      licenseNumber: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      emergencyContact: '',
      emergencyPhone: '',
      notes: '',
      photo: ''
    });
    setUserPhoto('');
    setActiveTab('photo');
    
    setShowAddUserModal(false);
    alert('User added successfully!');
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  const handleSuspendUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Suspended' ? 'Active' : 'Suspended' }
        : user
    ));
  };

  const generateInviteLink = (email: string, role: string) => {
    const baseUrl = window.location.origin;
    const token = btoa(`${email}:${role}:${Date.now()}`);
    return `${baseUrl}/register?invite=${token}&email=${encodeURIComponent(email)}&role=${role}`;
  };

  const handleSendInvite = () => {
    if (!inviteData.email || !inviteData.firstName || !inviteData.lastName) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email.toLowerCase() === inviteData.email.toLowerCase());
    
    if (existingUser) {
      // User already exists, enable them
      setUsers(users.map(user => 
        user.id === existingUser.id 
          ? { ...user, status: 'Active' }
          : user
      ));
      alert(`User ${existingUser.name} already exists and has been activated!`);
    } else {
      // Generate invite link
      const inviteLink = generateInviteLink(inviteData.email, inviteData.role);
      
      // In a real application, you would send this via email service
      // For now, we'll show the link and allow copying
      setCopiedLink(inviteLink);
      
      alert('Invite link generated! You can copy it from the modal or send it manually.');
    }
    
    // Reset form
    setInviteData({
      email: '',
      role: 'patient',
      firstName: '',
      lastName: '',
      message: 'Welcome to TeleMedX! Please complete your registration using the link below.'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleEnableUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'Active' }
        : user
    ));
    alert('User has been enabled successfully!');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUserPhoto(result);
        setNewUser({ ...newUser, photo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 } 
        } 
      });
      setCameraStream(stream);
      setShowCameraModal(true);
      
      if (videoRef) {
        videoRef.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCameraModal(false);
  };

  const capturePhoto = () => {
    if (videoRef && canvasRef) {
      const canvas = canvasRef;
      const video = videoRef;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const photoDataUrl = canvas.toDataURL('image/png');
        setUserPhoto(photoDataUrl);
        setNewUser({ ...newUser, photo: photoDataUrl });
        
        stopCamera();
        alert('Photo captured successfully!');
      }
    }
  };

  const removePhoto = () => {
    setUserPhoto('');
    setNewUser({ ...newUser, photo: '' });
  };

  const startDocumentScanner = async (documentType: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      });
      setScannerStream(stream);
      setScannerDocumentType(documentType);
      setShowDocumentScanner(true);
      
      if (scannerVideoRef) {
        scannerVideoRef.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera for document scanning:', error);
      alert('Could not access camera for document scanning. Please check permissions.');
    }
  };

  const stopDocumentScanner = () => {
    if (scannerStream) {
      scannerStream.getTracks().forEach(track => track.stop());
      setScannerStream(null);
    }
    setShowDocumentScanner(false);
    setScannerDocumentType('');
  };

  const scanDocument = () => {
    if (scannerVideoRef && scannerCanvasRef) {
      const canvas = scannerCanvasRef;
      const video = scannerVideoRef;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const scannedImageDataUrl = canvas.toDataURL('image/png');
        
        // Auto-upload the scanned document based on document type
        handleScannedDocument(scannedImageDataUrl, scannerDocumentType);
        
        stopDocumentScanner();
        alert('Document scanned and uploaded successfully!');
      }
    }
  };

  const handleScannedDocument = (imageDataUrl: string, documentType: string) => {
    switch (documentType) {
      case 'idDocument':
        setNewUser({ ...newUser, idDocument: imageDataUrl });
        break;
      case 'addressProofDocument':
        setNewUser({ ...newUser, addressProofDocument: imageDataUrl });
        break;
      case 'degreeCertificate':
        setNewUser({ ...newUser, degreeCertificate: imageDataUrl });
        break;
      case 'licenseCertificate':
        setNewUser({ ...newUser, licenseCertificate: imageDataUrl });
        break;
      case 'experienceLetter':
        setNewUser({ ...newUser, experienceLetter: imageDataUrl });
        break;
      case 'insuranceCardFront':
        setNewUser({ ...newUser, insuranceCardFront: imageDataUrl });
        break;
      case 'insuranceCardBack':
        setNewUser({ ...newUser, insuranceCardBack: imageDataUrl });
        break;
      case 'insurancePolicyDocument':
        setNewUser({ ...newUser, insurancePolicyDocument: imageDataUrl });
        break;
      case 'insuranceAuthorization':
        setNewUser({ ...newUser, insuranceAuthorization: imageDataUrl });
        break;
      default:
        console.log('Unknown document type:', documentType);
    }
  };

  const toggleDocumentAccordion = (documentType: string) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(documentType)) {
      newExpanded.delete(documentType);
    } else {
      newExpanded.add(documentType);
    }
    setExpandedDocuments(newExpanded);
  };

  // Patient search functionality
  useEffect(() => {
    if (patientSearchQuery.length > 1) {
      const filtered = users
        .filter(user => user.role.toLowerCase() === 'patient')
        .filter(user => 
          user.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(patientSearchQuery.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 results
      setFilteredPatients(filtered);
      setShowPatientDropdown(true);
    } else {
      setFilteredPatients([]);
      setShowPatientDropdown(false);
    }
  }, [patientSearchQuery, users]);

  const selectPatient = (patient: any) => {
    setNewUser({ ...newUser, linkedPatientId: patient.id.toString() });
    setPatientSearchQuery(patient.name);
    setShowPatientDropdown(false);
  };

  const addFamilyMember = () => {
    if (newUser.linkedPatientId && newUser.relationshipType) {
      const selectedPatient = users.find(user => user.id.toString() === newUser.linkedPatientId);
      if (selectedPatient && !newUser.familyMembers.some((member: any) => member.id === selectedPatient.id)) {
        const newFamilyMember = {
          id: selectedPatient.id,
          name: selectedPatient.name,
          email: selectedPatient.email,
          relationship: newUser.relationshipType
        };
        setNewUser({
          ...newUser,
          familyMembers: [...newUser.familyMembers, newFamilyMember],
          linkedPatientId: '',
          relationshipType: ''
        });
        setPatientSearchQuery('');
      }
    }
  };

  const removeFamilyMember = (memberId: number) => {
    setNewUser({
      ...newUser,
      familyMembers: newUser.familyMembers.filter((member: any) => member.id !== memberId)
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewUser = (user: any) => {
    navigate('/admin/user-details', { state: { user } });
  };

  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: UsersIcon, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Users', value: '1,160', change: '+8%', icon: UserCheck, color: 'from-green-500 to-emerald-500' },
    { label: 'New This Month', value: '87', change: '+22%', icon: UserPlus, color: 'from-purple-500 to-pink-500' },
    { label: 'Suspended', value: '15', change: '-3', icon: UserX, color: 'from-red-500 to-rose-500' },
  ];

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all platform users and their permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowInviteModal(true)}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Invite
          </Button>
          <Button 
            onClick={() => setShowAddUserModal(true)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant={stat.change.startsWith('+') ? 'success' : 'secondary'} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="flex h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm min-w-[120px]"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="doctor">Doctors</option>
                <option value="patient">Patients</option>
              </select>
              <select
                className="flex h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm min-w-[120px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">User List ({filteredUsers.length})</h3>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-semibold">
                          {user.photo ? (
                            <img 
                              src={user.photo} 
                              alt={user.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Doctor' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === 'Active' ? 'success' :
                        user.status === 'Pending' ? 'warning' :
                        'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.joined}</TableCell>
                    <TableCell className="text-gray-600">
                      {user.role === 'Doctor' ? `${user.patients} patients` : `${user.appointments} appointments`}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="View Details"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Edit User"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {user.status === 'Pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700" 
                            title="Enable User"
                            onClick={() => handleEnableUser(user.id)}
                          >
                            <UserCheck2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700" 
                          title={user.status === 'Suspended' ? 'Activate User' : 'Suspend User'}
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New User</h3>
              <Button variant="outline" size="sm" onClick={() => {
                setShowAddUserModal(false);
                setActiveTab('photo');
                setUserPhoto('');
              }}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-6">
              {/* Photo Tab */}
              {activeTab === 'photo' && (
                <div className="space-y-6">
                  {/* Profile Photo */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-medium">Profile Photo</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-6">
                          {/* Photo Preview */}
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
                              {userPhoto ? (
                                <img 
                                  src={userPhoto} 
                                  alt="Profile" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-16 h-16 text-gray-400" />
                              )}
                            </div>
                            {userPhoto && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={removePhoto}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove Photo
                              </Button>
                            )}
                          </div>

                          {/* Upload Options */}
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="photoUpload">Upload from Device</Label>
                              <Input
                                id="photoUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Or take a photo</Label>
                              <Button
                                variant="outline"
                                onClick={startCamera}
                                className="w-full"
                              >
                                <Camera className="w-4 h-4 mr-2" />
                                Take Photo with Camera
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-medium">Basic Information</h4>
                    </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        value={newUser.status}
                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
                </div>
              )}

              {/* Professional Information Tab */}
              {activeTab === 'professional' && (
                <div className="space-y-6">
                  {/* Professional Information */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-medium">Professional Information</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(newUser.role === 'doctor' || newUser.role === 'nurse') && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="department">Department</Label>
                              <select
                                id="department"
                                value={newUser.department}
                                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select Department</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="neurology">Neurology</option>
                                <option value="orthopedics">Orthopedics</option>
                                <option value="pediatrics">Pediatrics</option>
                                <option value="emergency">Emergency</option>
                                <option value="surgery">Surgery</option>
                                <option value="internal-medicine">Internal Medicine</option>
                                <option value="radiology">Radiology</option>
                                <option value="nursing">Nursing</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="specialization">Specialization</Label>
                              <Input
                                id="specialization"
                                value={newUser.specialization}
                                onChange={(e) => setNewUser({ ...newUser, specialization: e.target.value })}
                                placeholder="Enter specialization"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="licenseNumber">License Number</Label>
                              <Input
                                id="licenseNumber"
                                value={newUser.licenseNumber}
                                onChange={(e) => setNewUser({ ...newUser, licenseNumber: e.target.value })}
                                placeholder="Enter license number"
                              />
                            </div>
                            {newUser.role === 'doctor' && (
                              <>
                                <div className="space-y-2">
                                  <Label htmlFor="experience">Years of Experience</Label>
                                  <Input
                                    id="experience"
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={newUser.experience || ''}
                                    onChange={(e) => setNewUser({ ...newUser, experience: e.target.value })}
                                    placeholder="Enter years of experience"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="previousHospitals">Previous Hospitals</Label>
                                  <Input
                                    id="previousHospitals"
                                    value={newUser.previousHospitals || ''}
                                    onChange={(e) => setNewUser({ ...newUser, previousHospitals: e.target.value })}
                                    placeholder="Enter previous hospitals (comma-separated)"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="education">Education</Label>
                                  <Input
                                    id="education"
                                    value={newUser.education || ''}
                                    onChange={(e) => setNewUser({ ...newUser, education: e.target.value })}
                                    placeholder="Enter medical education details"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="certifications">Certifications</Label>
                                  <Input
                                    id="certifications"
                                    value={newUser.certifications || ''}
                                    onChange={(e) => setNewUser({ ...newUser, certifications: e.target.value })}
                                    placeholder="Enter certifications (comma-separated)"
                                  />
                                </div>
                              </>
                            )}
                          </>
                        )}
                        
                        {newUser.role === 'patient' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="medicalRecordNumber">Medical Record Number</Label>
                              <Input
                                id="medicalRecordNumber"
                                value={newUser.medicalRecordNumber || ''}
                                onChange={(e) => setNewUser({ ...newUser, medicalRecordNumber: e.target.value })}
                                placeholder="Enter medical record number"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                              <Input
                                id="insuranceProvider"
                                value={newUser.insuranceProvider || ''}
                                onChange={(e) => setNewUser({ ...newUser, insuranceProvider: e.target.value })}
                                placeholder="Enter insurance provider"
                              />
                            </div>
                          </>
                        )}
                        
                        {newUser.role === 'admin' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="adminLevel">Admin Level</Label>
                              <select
                                id="adminLevel"
                                value={newUser.adminLevel || ''}
                                onChange={(e) => setNewUser({ ...newUser, adminLevel: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select Admin Level</option>
                                <option value="super-admin">Super Admin</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="permissions">Permissions</Label>
                              <Input
                                id="permissions"
                                value={newUser.permissions || ''}
                                onChange={(e) => setNewUser({ ...newUser, permissions: e.target.value })}
                                placeholder="Enter permissions (comma-separated)"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-medium">Personal Information</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={newUser.dateOfBirth}
                            onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={newUser.address}
                            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                            placeholder="Enter address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newUser.city}
                            onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
                            placeholder="Enter city"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newUser.state}
                            onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                            placeholder="Enter state"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            value={newUser.zipCode}
                            onChange={(e) => setNewUser({ ...newUser, zipCode: e.target.value })}
                            placeholder="Enter zip code"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  {/* ID Proof */}
                  <Card>
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleDocumentAccordion('idProof')}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">ID Proof</h4>
                        {expandedDocuments.has('idProof') ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedDocuments.has('idProof') && (
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="idType">ID Type</Label>
                            <select
                              id="idType"
                              value={newUser.idType || ''}
                              onChange={(e) => setNewUser({ ...newUser, idType: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select ID Type</option>
                              <option value="passport">Passport</option>
                              <option value="drivers-license">Driver's License</option>
                              <option value="national-id">National ID</option>
                              <option value="ssn">SSN</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="idNumber">ID Number</Label>
                            <Input
                              id="idNumber"
                              value={newUser.idNumber || ''}
                              onChange={(e) => setNewUser({ ...newUser, idNumber: e.target.value })}
                              placeholder="Enter ID number"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="idUpload">Upload ID Document</Label>
                            <Input
                              id="idUpload"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setNewUser({ ...newUser, idDocument: e.target?.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-sm text-gray-500">OR</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                          </div>
                          <div className="space-y-2">
                            <Label>Scan Document with Camera</Label>
                            <Button
                              variant="outline"
                              onClick={() => startDocumentScanner('idDocument')}
                              className="w-full"
                            >
                              <Camera className="w-4 h-4 mr-2" />
                              Scan ID Document
                            </Button>
                          </div>
                        </div>
                        {newUser.idDocument && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800">
                              <strong>✓</strong> ID document uploaded successfully
                            </p>
                          </div>
                        )}
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Address Proof */}
                  <Card>
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleDocumentAccordion('addressProof')}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">Address Proof</h4>
                        {expandedDocuments.has('addressProof') ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedDocuments.has('addressProof') && (
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="addressProofType">Address Proof Type</Label>
                            <select
                              id="addressProofType"
                              value={newUser.addressProofType || ''}
                              onChange={(e) => setNewUser({ ...newUser, addressProofType: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select Address Proof Type</option>
                              <option value="utility-bill">Utility Bill</option>
                              <option value="bank-statement">Bank Statement</option>
                              <option value="rental-agreement">Rental Agreement</option>
                              <option value="government-letter">Government Letter</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="documentDate">Document Date</Label>
                            <Input
                              id="documentDate"
                              type="date"
                              value={newUser.documentDate || ''}
                              onChange={(e) => setNewUser({ ...newUser, documentDate: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="addressProofUpload">Upload Address Proof</Label>
                            <Input
                              id="addressProofUpload"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setNewUser({ ...newUser, addressProofDocument: e.target?.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-sm text-gray-500">OR</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                          </div>
                          <div className="space-y-2">
                            <Label>Scan Document with Camera</Label>
                            <Button
                              variant="outline"
                              onClick={() => startDocumentScanner('addressProofDocument')}
                              className="w-full"
                            >
                              <Camera className="w-4 h-4 mr-2" />
                              Scan Address Proof
                            </Button>
                          </div>
                        </div>
                        {newUser.addressProofDocument && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800">
                              <strong>✓</strong> Address proof document uploaded successfully
                            </p>
                          </div>
                        )}
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Insurance Documents (for patients) */}
                  {newUser.role === 'patient' && (
                    <Card>
                      <CardHeader 
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleDocumentAccordion('insuranceDocuments')}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium">Insurance Documents</h4>
                          {expandedDocuments.has('insuranceDocuments') ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedDocuments.has('insuranceDocuments') && (
                        <CardContent>
                          <div className="space-y-6">
                            {/* Insurance Card Front */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">1</span>
                              </div>
                              <h5 className="font-medium text-gray-900">Insurance Card (Front)</h5>
                            </div>
                            <div className="ml-10 space-y-3">
                              <div className="space-y-2">
                                <Label htmlFor="insuranceCardFront">Upload Insurance Card Front</Label>
                                <Input
                                  id="insuranceCardFront"
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (e) => {
                                        setNewUser({ ...newUser, insuranceCardFront: e.target?.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-xs text-gray-500">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm">Scan with Camera</Label>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => startDocumentScanner('insuranceCardFront')}
                                  className="w-full"
                                >
                                  <Camera className="w-3 h-3 mr-2" />
                                  Scan Card Front
                                </Button>
                              </div>
                              {newUser.insuranceCardFront && (
                                <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-xs text-green-800">
                                    <strong>✓</strong> Insurance card front uploaded
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Insurance Card Back */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">2</span>
                              </div>
                              <h5 className="font-medium text-gray-900">Insurance Card (Back)</h5>
                            </div>
                            <div className="ml-10 space-y-2">
                              <Label htmlFor="insuranceCardBack">Upload Insurance Card Back</Label>
                              <Input
                                id="insuranceCardBack"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                      setNewUser({ ...newUser, insuranceCardBack: e.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              {newUser.insuranceCardBack && (
                                <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-xs text-green-800">
                                    <strong>✓</strong> Insurance card back uploaded
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Insurance Policy Document */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">3</span>
                              </div>
                              <h5 className="font-medium text-gray-900">Insurance Policy Document</h5>
                            </div>
                            <div className="ml-10 space-y-2">
                              <Label htmlFor="insurancePolicy">Upload Insurance Policy Document</Label>
                              <Input
                                id="insurancePolicy"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                      setNewUser({ ...newUser, insurancePolicyDocument: e.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              {newUser.insurancePolicyDocument && (
                                <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-xs text-green-800">
                                    <strong>✓</strong> Insurance policy document uploaded
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Insurance Authorization Letter */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">4</span>
                              </div>
                              <h5 className="font-medium text-gray-900">Insurance Authorization Letter</h5>
                            </div>
                            <div className="ml-10 space-y-2">
                              <Label htmlFor="insuranceAuth">Upload Insurance Authorization Letter</Label>
                              <Input
                                id="insuranceAuth"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                      setNewUser({ ...newUser, insuranceAuthorization: e.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              {newUser.insuranceAuthorization && (
                                <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                                  <p className="text-xs text-green-800">
                                    <strong>✓</strong> Insurance authorization letter uploaded
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Insurance Coverage Details */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">5</span>
                              </div>
                              <h5 className="font-medium text-gray-900">Coverage Details</h5>
                            </div>
                            <div className="ml-10 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="coverageType">Coverage Type</Label>
                                  <select
                                    id="coverageType"
                                    value={newUser.coverageType || ''}
                                    onChange={(e) => setNewUser({ ...newUser, coverageType: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="">Select Coverage Type</option>
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                    <option value="supplemental">Supplemental</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="policyNumber">Policy Number</Label>
                                  <Input
                                    id="policyNumber"
                                    value={newUser.policyNumber || ''}
                                    onChange={(e) => setNewUser({ ...newUser, policyNumber: e.target.value })}
                                    placeholder="Enter policy number"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="groupNumber">Group Number</Label>
                                  <Input
                                    id="groupNumber"
                                    value={newUser.groupNumber || ''}
                                    onChange={(e) => setNewUser({ ...newUser, groupNumber: e.target.value })}
                                    placeholder="Enter group number"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="memberId">Member ID</Label>
                                  <Input
                                    id="memberId"
                                    value={newUser.memberId || ''}
                                    onChange={(e) => setNewUser({ ...newUser, memberId: e.target.value })}
                                    placeholder="Enter member ID"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </CardContent>
                      )}
                    </Card>
                  )}

                </div>
              )}

              {/* Family Tab */}
              {activeTab === 'family' && (
                <div className="space-y-6">
                  {newUser.role === 'patient' ? (
                    <Card>
                      <CardHeader>
                        <h4 className="text-lg font-medium">Family Members</h4>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-blue-600 font-semibold text-xs">i</span>
                              </div>
                              <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Family Member Linking:</p>
                                <ul className="space-y-1 text-xs">
                                  <li>• Search for existing patients to link as family members</li>
                                  <li>• Specify the relationship type (spouse, parent, child, etc.)</li>
                                  <li>• Family members can access shared medical records</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Add Family Member Form */}
                          <div className="space-y-4">
                            <h5 className="font-medium text-gray-900">Add Family Member</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="patientSearch">Search Patient</Label>
                                <div className="relative">
                                  <Input
                                    id="patientSearch"
                                    type="text"
                                    value={patientSearchQuery}
                                    onChange={(e) => setPatientSearchQuery(e.target.value)}
                                    onFocus={() => setShowPatientDropdown(patientSearchQuery.length > 1)}
                                    placeholder="Type patient name or email..."
                                    className="w-full"
                                  />
                                  {showPatientDropdown && filteredPatients.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                      {filteredPatients.map((patient) => (
                                        <div
                                          key={patient.id}
                                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                          onClick={() => selectPatient(patient)}
                                        >
                                          <div className="font-medium text-gray-900">{patient.name}</div>
                                          <div className="text-sm text-gray-500">{patient.email}</div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="relationshipType">Relationship</Label>
                                <select
                                  id="relationshipType"
                                  value={newUser.relationshipType || ''}
                                  onChange={(e) => setNewUser({ ...newUser, relationshipType: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="">Select relationship</option>
                                  <option value="spouse">Spouse</option>
                                  <option value="parent">Parent</option>
                                  <option value="child">Child</option>
                                  <option value="sibling">Sibling</option>
                                  <option value="guardian">Guardian</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            </div>
                            <Button
                              onClick={addFamilyMember}
                              disabled={!newUser.linkedPatientId || !newUser.relationshipType}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <User className="w-4 h-4 mr-2" />
                              Add Family Member
                            </Button>
                          </div>

                          {/* Family Members List */}
                          {newUser.familyMembers.length > 0 && (
                            <div className="space-y-4">
                              <h5 className="font-medium text-gray-900">Linked Family Members</h5>
                              <div className="space-y-2">
                                {newUser.familyMembers.map((member: any) => (
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
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeFamilyMember(member.id)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent>
                        <div className="text-center py-8">
                          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Family Members</h3>
                          <p className="text-gray-500">
                            Family member linking is only available for patients. 
                            {newUser.role && newUser.role !== 'patient' && (
                              <span> Current role: {newUser.role}</span>
                            )}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Emergency Contact Tab */}
              {activeTab === 'emergency' && (
                <div className="space-y-6">
                  {/* Emergency Contact */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-medium">Emergency Contact</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                          <Input
                            id="emergencyContact"
                            value={newUser.emergencyContact}
                            onChange={(e) => setNewUser({ ...newUser, emergencyContact: e.target.value })}
                            placeholder="Enter emergency contact name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                          <Input
                            id="emergencyPhone"
                            value={newUser.emergencyPhone}
                            onChange={(e) => setNewUser({ ...newUser, emergencyPhone: e.target.value })}
                            placeholder="Enter emergency contact phone"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Notes */}
                  <Card>
                    <CardHeader>
                      <h4 className="text-lg font-medium">Additional Notes</h4>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <textarea
                          id="notes"
                          value={newUser.notes}
                          onChange={(e) => setNewUser({ ...newUser, notes: e.target.value })}
                          placeholder="Enter any additional notes..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={6}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => {
                setShowAddUserModal(false);
                setActiveTab('photo');
                setUserPhoto('');
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                <Save className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Send Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Send Invite</h3>
              <Button variant="outline" size="sm" onClick={() => setShowInviteModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteEmail">Email Address</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteRole">Role</Label>
                  <select
                    id="inviteRole"
                    value={inviteData.role}
                    onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteFirstName">First Name</Label>
                  <Input
                    id="inviteFirstName"
                    value={inviteData.firstName}
                    onChange={(e) => setInviteData({ ...inviteData, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteLastName">Last Name</Label>
                  <Input
                    id="inviteLastName"
                    value={inviteData.lastName}
                    onChange={(e) => setInviteData({ ...inviteData, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inviteMessage">Message</Label>
                <textarea
                  id="inviteMessage"
                  value={inviteData.message}
                  onChange={(e) => setInviteData({ ...inviteData, message: e.target.value })}
                  placeholder="Enter invite message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              {copiedLink && (
                <Card>
                  <CardHeader>
                    <h4 className="text-lg font-medium">Generated Invite Link</h4>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={copiedLink}
                          readOnly
                          className="flex-1 bg-gray-50"
                        />
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(copiedLink)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> In a production environment, this link would be automatically sent via email to the recipient.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => {
                setShowInviteModal(false);
                setCopiedLink('');
              }}>
                Cancel
              </Button>
              <Button onClick={handleSendInvite}>
                <Send className="w-4 h-4 mr-2" />
                {copiedLink ? 'Send Another Invite' : 'Generate Invite Link'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Take Photo</h3>
              <Button variant="outline" size="sm" onClick={stopCamera}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={setVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-lg"
                />
                <canvas
                  ref={setCanvasRef}
                  className="hidden"
                />
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={stopCamera}
                >
                  Cancel
                </Button>
                <Button
                  onClick={capturePhoto}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Scanner Modal */}
      {showDocumentScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Scan Document</h3>
              <Button variant="outline" size="sm" onClick={stopDocumentScanner}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">i</span>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Document Scanning Tips:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Place the document on a flat surface with good lighting</li>
                      <li>• Ensure the entire document is visible in the camera frame</li>
                      <li>• Keep the camera steady and avoid shadows</li>
                      <li>• Make sure text is clear and readable</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative">
                <video
                  ref={setScannerVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-80 bg-gray-900 rounded-lg"
                />
                <canvas
                  ref={setScannerCanvasRef}
                  className="hidden"
                />
                
                {/* Document overlay guide */}
                <div className="absolute inset-4 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none">
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Document Area
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={stopDocumentScanner}
                >
                  Cancel
                </Button>
                <Button
                  onClick={scanDocument}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Scan & Upload Document
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-amber-700">TeleMedX Admin</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout
      role="admin"
      userName="Admin User"
      breadcrumbs={[
        { label: 'Admin Dashboard', href: '/admin' },
        { label: 'User Management', path: '/admin/users' }
      ]}
    >
      {content}
    </DesktopLayout>
  );
}
