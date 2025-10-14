import React, { useState } from 'react';
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
  Calendar, 
  CreditCard, 
  Save,
  Camera
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@telemedx.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Cardiologist',
    licenseNumber: 'MD123456',
    experience: '15',
    consultationFee: '100',
    bio: 'Board-certified cardiologist with 15 years of experience in treating heart conditions.',
  });

  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '13:00' },
    sunday: { enabled: false, start: '09:00', end: '13:00' },
  });

  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    emailPrescriptions: true,
    emailMessages: true,
    pushAppointments: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold">
                SJ
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
                <Label>Specialty</Label>
                <Input value={profileData.specialty} onChange={(e) => setProfileData({...profileData, specialty: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Medical License Number</Label>
                <Input value={profileData.licenseNumber} onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input type="number" value={profileData.experience} onChange={(e) => setProfileData({...profileData, experience: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Consultation Fee ($)</Label>
                <Input type="number" value={profileData.consultationFee} onChange={(e) => setProfileData({...profileData, consultationFee: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea rows={4} placeholder="Brief description about yourself..." value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'availability':
        return (
          <div className="space-y-4">
            {Object.entries(availability).map(([day, schedule]) => (
              <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-32">
                  <p className="font-semibold text-gray-900 capitalize">{day}</p>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={schedule.enabled}
                      onChange={(e) => setAvailability({
                        ...availability,
                        [day]: { ...schedule, enabled: e.target.checked }
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Available</span>
                  </label>
                  {schedule.enabled && (
                    <div className="flex items-center gap-2">
                      <Input 
                        type="time" 
                        value={schedule.start}
                        onChange={(e) => setAvailability({
                          ...availability,
                          [day]: { ...schedule, start: e.target.value }
                        })}
                        className="w-32"
                      />
                      <span className="text-gray-500">to</span>
                      <Input 
                        type="time" 
                        value={schedule.end}
                        onChange={(e) => setAvailability({
                          ...availability,
                          [day]: { ...schedule, end: e.target.value }
                        })}
                        className="w-32"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="w-4 h-4 mr-2" />
                Save Availability
              </Button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {[
              { key: 'emailAppointments', title: 'Email - New Appointments', desc: 'Receive email when patients book appointments' },
              { key: 'emailPrescriptions', title: 'Email - Prescription Updates', desc: 'Get notified about prescription status changes' },
              { key: 'emailMessages', title: 'Email - Patient Messages', desc: 'Email notifications for new patient messages' },
              { key: 'pushAppointments', title: 'Push - Upcoming Appointments', desc: 'Push notifications 30 minutes before appointments' },
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-teal-600 hover:bg-teal-700">
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
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline">Update Password</Button>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Bank Account</p>
                <p className="text-sm text-gray-600">•••• •••• •••• 1234</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Tax Information</p>
                <p className="text-sm text-gray-600">W-9 form on file</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-semibold">Total Earnings (This Month)</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">$3,200</p>
              </div>
              <Button variant="outline" size="sm">View Report</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard', href: '/doctor/dashboard' }, { label: 'Settings' }]}>
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
                    ? 'border-teal-600 text-teal-600'
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
