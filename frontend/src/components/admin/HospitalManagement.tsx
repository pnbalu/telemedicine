import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Palette,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  Activity
} from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  capacity: number;
  specialties: string[];
  operatingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

interface Hospital {
  id: string;
  name: string;
  description: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  theme: 'light' | 'dark' | 'auto';
  locations: Location[];
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function HospitalManagement() {
  const [hospitals, setHospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'City General Hospital',
      description: 'Leading healthcare provider serving the community with comprehensive medical services',
      logo: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      theme: 'light',
      locations: [
        {
          id: '1-1',
          name: 'Main Campus',
          address: '123 Medical Center Drive',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          phone: '+1 (555) 123-4567',
          email: 'main@citygeneral.com',
          website: 'https://citygeneral.com',
          capacity: 500,
          specialties: ['Emergency Medicine', 'Cardiology', 'Oncology', 'Pediatrics'],
          operatingHours: {
            monday: '24/7',
            tuesday: '24/7',
            wednesday: '24/7',
            thursday: '24/7',
            friday: '24/7',
            saturday: '24/7',
            sunday: '24/7'
          }
        },
        {
          id: '1-2',
          name: 'Westside Branch',
          address: '456 Healthcare Avenue',
          city: 'Brooklyn',
          state: 'NY',
          zipCode: '11201',
          phone: '+1 (555) 234-5678',
          email: 'westside@citygeneral.com',
          website: 'https://citygeneral.com/westside',
          capacity: 200,
          specialties: ['Orthopedics', 'Physical Therapy', 'Dermatology'],
          operatingHours: {
            monday: '8:00 AM - 8:00 PM',
            tuesday: '8:00 AM - 8:00 PM',
            wednesday: '8:00 AM - 8:00 PM',
            thursday: '8:00 AM - 8:00 PM',
            friday: '8:00 AM - 8:00 PM',
            saturday: '9:00 AM - 5:00 PM',
            sunday: 'Closed'
          }
        }
      ],
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'info@citygeneral.com',
        website: 'https://citygeneral.com'
      },
      status: 'active',
      createdAt: '2024-01-15'
    }
  ]);

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showHospitalForm, setShowHospitalForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const [newHospital, setNewHospital] = useState<Partial<Hospital>>({
    name: '',
    description: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    theme: 'light',
    locations: [],
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    status: 'active'
  });

  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    capacity: 0,
    specialties: [],
    operatingHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed'
    }
  });

  const predefinedColors = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#1E40AF' },
    { name: 'Green', primary: '#10B981', secondary: '#059669' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#7C3AED' },
    { name: 'Red', primary: '#EF4444', secondary: '#DC2626' },
    { name: 'Orange', primary: '#F59E0B', secondary: '#D97706' },
    { name: 'Pink', primary: '#EC4899', secondary: '#DB2777' },
    { name: 'Indigo', primary: '#6366F1', secondary: '#4F46E5' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#0D9488' }
  ];

  const medicalSpecialties = [
    'Emergency Medicine', 'Cardiology', 'Oncology', 'Pediatrics', 'Orthopedics',
    'Neurology', 'Dermatology', 'Radiology', 'Anesthesiology', 'Pathology',
    'Internal Medicine', 'Surgery', 'Obstetrics & Gynecology', 'Psychiatry',
    'Physical Therapy', 'Occupational Therapy', 'Respiratory Therapy'
  ];

  const handleAddHospital = () => {
    const hospital: Hospital = {
      id: Date.now().toString(),
      name: newHospital.name || '',
      description: newHospital.description || '',
      logo: '',
      primaryColor: newHospital.primaryColor || '#3B82F6',
      secondaryColor: newHospital.secondaryColor || '#1E40AF',
      theme: newHospital.theme || 'light',
      locations: [],
      contact: {
        phone: newHospital.contact?.phone || '',
        email: newHospital.contact?.email || '',
        website: newHospital.contact?.website || ''
      },
      status: newHospital.status || 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setHospitals([...hospitals, hospital]);
    setNewHospital({
      name: '',
      description: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      theme: 'light',
      locations: [],
      contact: {
        phone: '',
        email: '',
        website: ''
      },
      status: 'active'
    });
    setShowHospitalForm(false);
  };

  const handleAddLocation = (hospitalId: string) => {
    if (!newLocation.name) return;

    const location: Location = {
      id: `${hospitalId}-${Date.now()}`,
      name: newLocation.name || '',
      address: newLocation.address || '',
      city: newLocation.city || '',
      state: newLocation.state || '',
      zipCode: newLocation.zipCode || '',
      phone: newLocation.phone || '',
      email: newLocation.email || '',
      website: newLocation.website || '',
      capacity: newLocation.capacity || 0,
      specialties: newLocation.specialties || [],
      operatingHours: newLocation.operatingHours || {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: '9:00 AM - 1:00 PM',
        sunday: 'Closed'
      }
    };

    setHospitals(hospitals.map(hospital => 
      hospital.id === hospitalId 
        ? { ...hospital, locations: [...hospital.locations, location] }
        : hospital
    ));

    setNewLocation({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      website: '',
      capacity: 0,
      specialties: [],
      operatingHours: {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: '9:00 AM - 1:00 PM',
        sunday: 'Closed'
      }
    });
    setShowLocationForm(false);
  };

  const handleDeleteHospital = (hospitalId: string) => {
    setHospitals(hospitals.filter(hospital => hospital.id !== hospitalId));
  };

  const handleDeleteLocation = (hospitalId: string, locationId: string) => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === hospitalId 
        ? { ...hospital, locations: hospital.locations.filter(loc => loc.id !== locationId) }
        : hospital
    ));
  };

  const handleColorSelect = (primary: string, secondary: string) => {
    if (editingHospital) {
      setEditingHospital({ ...editingHospital, primaryColor: primary, secondaryColor: secondary });
    } else {
      setNewHospital({ ...newHospital, primaryColor: primary, secondaryColor: secondary });
    }
  };

  const handleSpecialtyToggle = (specialty: string) => {
    const currentSpecialties = newLocation.specialties || [];
    const updatedSpecialties = currentSpecialties.includes(specialty)
      ? currentSpecialties.filter(s => s !== specialty)
      : [...currentSpecialties, specialty];
    
    setNewLocation({ ...newLocation, specialties: updatedSpecialties });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hospital Management</h2>
          <p className="text-gray-600 mt-1">Manage hospitals, locations, and branding</p>
        </div>
        <Button onClick={() => setShowHospitalForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Hospital
        </Button>
      </div>

      {/* Hospitals List */}
      <div className="grid gap-6">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: hospital.primaryColor }}
                  >
                    {hospital.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                    <p className="text-sm text-gray-600">{hospital.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={hospital.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {hospital.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {hospital.locations.length} location{hospital.locations.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingHospital(hospital)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Locations
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteHospital(hospital.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{hospital.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{hospital.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span>{hospital.contact.website}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Branding</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: hospital.primaryColor }}
                      ></div>
                      <span className="text-sm text-gray-600">Primary: {hospital.primaryColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: hospital.secondaryColor }}
                      ></div>
                      <span className="text-sm text-gray-600">Secondary: {hospital.secondaryColor}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Theme: {hospital.theme}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Statistics</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{hospital.locations.length} locations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{hospital.locations.reduce((total, loc) => total + loc.capacity, 0)} total capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span>Created: {hospital.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Hospital Modal */}
      {showHospitalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Hospital</h3>
              <Button variant="outline" size="sm" onClick={() => setShowHospitalForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hospitalName">Hospital Name</Label>
                  <Input
                    id="hospitalName"
                    value={newHospital.name || ''}
                    onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={newHospital.status || 'active'}
                    onChange={(e) => setNewHospital({ ...newHospital, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={newHospital.description || ''}
                  onChange={(e) => setNewHospital({ ...newHospital, description: e.target.value })}
                  placeholder="Enter hospital description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newHospital.contact?.phone || ''}
                    onChange={(e) => setNewHospital({ 
                      ...newHospital, 
                      contact: { ...newHospital.contact!, phone: e.target.value }
                    })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newHospital.contact?.email || ''}
                    onChange={(e) => setNewHospital({ 
                      ...newHospital, 
                      contact: { ...newHospital.contact!, email: e.target.value }
                    })}
                    placeholder="info@hospital.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={newHospital.contact?.website || ''}
                    onChange={(e) => setNewHospital({ 
                      ...newHospital, 
                      contact: { ...newHospital.contact!, website: e.target.value }
                    })}
                    placeholder="https://hospital.com"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Theme Colors</Label>
                <div className="grid grid-cols-4 gap-3">
                  {predefinedColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(color.primary, color.secondary)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        newHospital.primaryColor === color.primary 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color.primary }}
                        ></div>
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color.secondary }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Theme Mode</Label>
                <select
                  id="theme"
                  value={newHospital.theme || 'light'}
                  onChange={(e) => setNewHospital({ ...newHospital, theme: e.target.value as 'light' | 'dark' | 'auto' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowHospitalForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddHospital}>
                <Save className="w-4 h-4 mr-2" />
                Add Hospital
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      {showLocationForm && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Location to {selectedHospital.name}</h3>
              <Button variant="outline" size="sm" onClick={() => setShowLocationForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locationName">Location Name</Label>
                  <Input
                    id="locationName"
                    value={newLocation.name || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    placeholder="e.g., Main Campus, Downtown Branch"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newLocation.capacity || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, capacity: parseInt(e.target.value) || 0 })}
                    placeholder="Number of beds"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newLocation.address || ''}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newLocation.city || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newLocation.state || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={newLocation.zipCode || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, zipCode: e.target.value })}
                    placeholder="Zip code"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locationPhone">Phone</Label>
                  <Input
                    id="locationPhone"
                    value={newLocation.phone || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationEmail">Email</Label>
                  <Input
                    id="locationEmail"
                    type="email"
                    value={newLocation.email || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, email: e.target.value })}
                    placeholder="location@hospital.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationWebsite">Website</Label>
                  <Input
                    id="locationWebsite"
                    value={newLocation.website || ''}
                    onChange={(e) => setNewLocation({ ...newLocation, website: e.target.value })}
                    placeholder="https://hospital.com/location"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Medical Specialties</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {medicalSpecialties.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => handleSpecialtyToggle(specialty)}
                      className={`p-2 text-sm rounded-lg border transition-all ${
                        newLocation.specialties?.includes(specialty)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowLocationForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleAddLocation(selectedHospital.id)}>
                <Save className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Location Details Modal */}
      {selectedHospital && !showLocationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedHospital.name} - Locations</h3>
              <div className="flex gap-2">
                <Button onClick={() => setShowLocationForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Location
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedHospital(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {selectedHospital.locations.map((location) => (
                <Card key={location.id} className="border border-gray-200">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-600">{location.address}, {location.city}, {location.state} {location.zipCode}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteLocation(selectedHospital.id, location.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Contact</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{location.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{location.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{location.website}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Capacity</h5>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{location.capacity} beds</span>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Specialties</h5>
                        <div className="flex flex-wrap gap-1">
                          {location.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Hours</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>Mon-Fri: {location.operatingHours.monday}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>Weekend: {location.operatingHours.saturday}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
