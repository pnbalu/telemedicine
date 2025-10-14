import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Save,
  Camera,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
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

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" value={profileData.dateOfBirth} onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" value={profileData.gender} onChange={(e) => setProfileData({...profileData, gender: e.target.value})}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" value={profileData.bloodType} onChange={(e) => setProfileData({...profileData, bloodType: e.target.value})}>
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
                <Input value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Name</Label>
                <Input value={profileData.emergencyContact} onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Emergency Contact Phone</Label>
                <Input value={profileData.emergencyPhone} onChange={(e) => setProfileData({...profileData, emergencyPhone: e.target.value})} />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {[
              { key: 'emailAppointments', title: 'Email - Appointment Reminders', desc: 'Get reminded 24 hours before appointments' },
              { key: 'emailPrescriptions', title: 'Email - Prescription Updates', desc: 'Notifications when prescriptions are issued' },
              { key: 'emailReminders', title: 'Email - Health Reminders', desc: 'Medication and health tips reminders' },
              { key: 'smsReminders', title: 'SMS - Appointment Reminders', desc: 'SMS notifications 1 hour before appointments' },
              { key: 'pushNotifications', title: 'Push Notifications', desc: 'Browser push notifications for urgent updates' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
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
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline">Update Password</Button>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">VISA</div>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">MC</div>
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
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            {[
              { key: 'shareDataWithDoctors', title: 'Share Data with Doctors', desc: 'Allow doctors to access your medical history' },
              { key: 'allowResearch', title: 'Allow Research Use', desc: 'Anonymized data for medical research' },
              { key: 'showProfile', title: 'Show Profile to Doctors', desc: 'Make your profile visible to healthcare providers' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={privacySettings[item.key as keyof typeof privacySettings]}
                    onChange={(e) => setPrivacySettings({...privacySettings, [item.key]: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Data Export & Deletion</p>
              <p className="text-sm text-gray-600 mb-3">Download your data or request account deletion</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Download My Data</Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete Account</Button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard', href: '/patient/dashboard' }, { label: 'Settings' }]}>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
        </div>

        {/* Horizontal Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 capitalize">{activeTab} Settings</h3>
          </CardHeader>
          <CardContent className="p-6">
            {renderTabContent()}
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}
