import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Settings as SettingsIcon,
  Mail,
  CreditCard,
  Database,
  Shield,
  Globe,
  FileText,
  Save,
  Key
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

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.telemedx.com',
    smtpPort: '587',
    smtpUsername: 'notifications@telemedx.com',
    fromEmail: 'noreply@telemedx.com',
    fromName: 'TeleMedX',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripePublicKey: 'pk_test_***************',
    stripeSecretKey: '••••••••••••••••',
    paypalClientId: 'AYS***************',
    currency: 'USD',
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    require2FA: false,
    allowSocialLogin: true,
  });

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600 mt-1">Configure system-wide settings and integrations</p>
      </div>

      {/* Email Configuration */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Email Configuration</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>SMTP Server</Label>
              <Input 
                value={emailSettings.smtpServer}
                onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>SMTP Port</Label>
              <Input 
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>SMTP Username</Label>
              <Input 
                value={emailSettings.smtpUsername}
                onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>SMTP Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>From Email</Label>
              <Input 
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>From Name</Label>
              <Input 
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <Button variant="outline" size="sm">
              Send Test Email
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="w-4 h-4 mr-2" />
              Save Email Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateway */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Payment Gateway</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Stripe Public Key</Label>
                <Input 
                  value={paymentSettings.stripePublicKey}
                  onChange={(e) => setPaymentSettings({...paymentSettings, stripePublicKey: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Stripe Secret Key</Label>
                <Input 
                  type="password"
                  value={paymentSettings.stripeSecretKey}
                  onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>PayPal Client ID</Label>
                <Input 
                  value={paymentSettings.paypalClientId}
                  onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <select
                  className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                  value={paymentSettings.currency}
                  onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Payment Status</p>
                  <p className="text-sm text-gray-600 mt-1">Gateway connected and operational</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="w-4 h-4 mr-2" />
              Save Payment Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Security Settings</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input 
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Login Attempts</Label>
              <Input 
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Password Min Length</Label>
              <Input 
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Require Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Enforce 2FA for all users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={securitySettings.require2FA}
                  onChange={(e) => setSecuritySettings({...securitySettings, require2FA: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold">Allow Social Login</p>
                <p className="text-sm text-gray-600">Enable Google, Facebook login</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={securitySettings.allowSocialLogin}
                  onChange={(e) => setSecuritySettings({...securitySettings, allowSocialLogin: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="w-4 h-4 mr-2" />
              Save Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Backup Configuration</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Retention Period (days)</Label>
                <Input type="number" defaultValue="30" />
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Last Backup</p>
                  <p className="text-sm text-gray-600 mt-1">October 10, 2025 at 2:00 AM</p>
                  <p className="text-sm text-gray-600">Size: 2.4 GB</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Restore
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Backup Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">API Access</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">API Key 1</p>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 font-mono">api_key_1234567890abcdef</p>
              <p className="text-xs text-gray-500 mt-2">Created: Oct 1, 2025 • Last used: 2 hours ago</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">Regenerate</Button>
                <Button variant="outline" size="sm" className="text-red-600">Revoke</Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Generate New API Key
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Management */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Content Management</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Terms of Service', lastUpdated: 'Oct 1, 2025' },
              { title: 'Privacy Policy', lastUpdated: 'Oct 1, 2025' },
              { title: 'FAQ Content', lastUpdated: 'Sep 28, 2025' },
              { title: 'Help Documentation', lastUpdated: 'Sep 25, 2025' },
              { title: 'About Us Page', lastUpdated: 'Sep 20, 2025' },
              { title: 'Contact Information', lastUpdated: 'Sep 15, 2025' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">Last updated: {item.lastUpdated}</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">General Platform Settings</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input defaultValue="TeleMedX" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@telemedx.com" />
            </div>
            <div className="space-y-2">
              <Label>Default Language</Label>
              <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
                <option value="est">Eastern Time (ET)</option>
                <option value="cst">Central Time (CT)</option>
                <option value="pst">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="w-4 h-4 mr-2" />
              Save Platform Settings
            </Button>
          </div>
        </CardContent>
      </Card>
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
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Settings' }]}>
      {content}
    </DesktopLayout>
  );
}

