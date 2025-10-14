import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Mail,
  CreditCard,
  Shield,
  Database,
  Key,
  Globe,
  Save
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('email');

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

  const tabs = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'api', label: 'API', icon: Key },
    { id: 'platform', label: 'Platform', icon: Globe },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'email':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>SMTP Server</Label>
                <Input value={emailSettings.smtpServer} onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input value={emailSettings.smtpPort} onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>SMTP Username</Label>
                <Input value={emailSettings.smtpUsername} onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>SMTP Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>From Email</Label>
                <Input value={emailSettings.fromEmail} onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>From Name</Label>
                <Input value={emailSettings.fromName} onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="outline" size="sm">Send Test Email</Button>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Email Settings
              </Button>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Stripe Public Key</Label>
                <Input value={paymentSettings.stripePublicKey} onChange={(e) => setPaymentSettings({...paymentSettings, stripePublicKey: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Stripe Secret Key</Label>
                <Input type="password" value={paymentSettings.stripeSecretKey} onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>PayPal Client ID</Label>
                <Input value={paymentSettings.paypalClientId} onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <select className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm" value={paymentSettings.currency} onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}>
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
            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Payment Settings
              </Button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" value={securitySettings.sessionTimeout} onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Max Login Attempts</Label>
                <Input type="number" value={securitySettings.maxLoginAttempts} onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Password Min Length</Label>
                <Input type="number" value={securitySettings.passwordMinLength} onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})} />
              </div>
            </div>
            <div className="space-y-4">
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
            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
                  <Button variant="outline" size="sm">Restore</Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Backup Now</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
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
        );

      case 'platform':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
            <div className="flex justify-end pt-4 border-t">
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Platform Settings
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Settings' }]}>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure system-wide settings and integrations</p>
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
                    ? 'border-amber-600 text-amber-600'
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
