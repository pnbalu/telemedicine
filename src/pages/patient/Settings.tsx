import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Save,
  Camera,
  Shield,
  Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Settings() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1980-05-15',
    gender: 'Male',
    bloodType: 'A+',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
  });

  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    emailPrescriptions: true,
    emailReminders: true,
    smsReminders: true,
    pushNotifications: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareDataWithDoctors: true,
    allowResearch: false,
    showProfile: true,
  });

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
                {profileData.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input 
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <select
                  className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  value={profileData.gender}
                  onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <select
                  className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  value={profileData.bloodType}
                  onChange={(e) => setProfileData({...profileData, bloodType: e.target.value})}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Address</Label>
                <Input 
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Name</Label>
                <Input 
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Phone</Label>
                <Input 
                  value={profileData.emergencyPhone}
                  onChange={(e) => setProfileData({...profileData, emergencyPhone: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Email - Appointment Reminders</p>
                <p className="text-sm text-gray-600">Get reminded 24 hours before appointments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailAppointments}
                  onChange={(e) => setNotifications({...notifications, emailAppointments: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Email - Prescription Updates</p>
                <p className="text-sm text-gray-600">Notifications when prescriptions are issued</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailPrescriptions}
                  onChange={(e) => setNotifications({...notifications, emailPrescriptions: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Email - Health Reminders</p>
                <p className="text-sm text-gray-600">Medication and health tips reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailReminders}
                  onChange={(e) => setNotifications({...notifications, emailReminders: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">SMS - Appointment Reminders</p>
                <p className="text-sm text-gray-600">SMS notifications 1 hour before appointments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.smsReminders}
                  onChange={(e) => setNotifications({...notifications, smsReminders: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Push Notifications</p>
                <p className="text-sm text-gray-600">Browser push notifications for urgent updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.pushNotifications}
                  onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Security</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="outline">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-semibold">•••• •••• •••• 1234</p>
                  <p className="text-sm text-gray-600">Expires 12/2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Default</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold">•••• •••• •••• 5678</p>
                  <p className="text-sm text-gray-600">Expires 08/2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600">Remove</Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Add New Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Privacy & Data</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Share Data with Doctors</p>
                <p className="text-sm text-gray-600">Allow doctors to access your medical history</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacySettings.shareDataWithDoctors}
                  onChange={(e) => setPrivacySettings({...privacySettings, shareDataWithDoctors: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Allow Research Use</p>
                <p className="text-sm text-gray-600">Anonymized data for medical research</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacySettings.allowResearch}
                  onChange={(e) => setPrivacySettings({...privacySettings, allowResearch: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Show Profile to Doctors</p>
                <p className="text-sm text-gray-600">Make your profile visible to healthcare providers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacySettings.showProfile}
                  onChange={(e) => setPrivacySettings({...privacySettings, showProfile: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Data Export & Deletion</p>
              <p className="text-sm text-gray-600 mb-3">Download your data or request account deletion</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Download My Data
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Language & Region</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="est">Eastern Time (ET)</option>
                <option value="cst">Central Time (CT)</option>
                <option value="mst">Mountain Time (MT)</option>
                <option value="pst">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-blue-700">TeleMedX</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Settings' }]}>
      {content}
    </DesktopLayout>
  );
}

