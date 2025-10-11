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
  Calendar, 
  CreditCard, 
  Globe,
  Save,
  Camera
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
    pushMessages: false,
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
                <Label>Specialty</Label>
                <Input 
                  value={profileData.specialty}
                  onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Medical License Number</Label>
                <Input 
                  value={profileData.licenseNumber}
                  onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input 
                  type="number"
                  value={profileData.experience}
                  onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Consultation Fee ($)</Label>
                <Input 
                  type="number"
                  value={profileData.consultationFee}
                  onChange={(e) => setProfileData({...profileData, consultationFee: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea 
                rows={4}
                placeholder="Brief description about yourself..."
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Availability Schedule</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
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
                    <>
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
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Save className="w-4 h-4 mr-2" />
              Save Availability
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Email - New Appointments</p>
                <p className="text-sm text-gray-600">Receive email when patients book appointments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailAppointments}
                  onChange={(e) => setNotifications({...notifications, emailAppointments: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Email - Prescription Updates</p>
                <p className="text-sm text-gray-600">Get notified about prescription status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailPrescriptions}
                  onChange={(e) => setNotifications({...notifications, emailPrescriptions: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Email - Patient Messages</p>
                <p className="text-sm text-gray-600">Email notifications for new patient messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.emailMessages}
                  onChange={(e) => setNotifications({...notifications, emailMessages: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Push - Upcoming Appointments</p>
                <p className="text-sm text-gray-600">Push notifications 30 minutes before appointments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.pushAppointments}
                  onChange={(e) => setNotifications({...notifications, pushAppointments: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-teal-600 hover:bg-teal-700">
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
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="outline">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Payment & Billing</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
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
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-teal-700">TeleMedX Doctor</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="doctor" userName="Dr. Sarah Johnson" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Settings' }]}>
      {content}
    </DesktopLayout>
  );
}

