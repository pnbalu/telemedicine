import React, { useState, useEffect } from 'react';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Users, TrendingUp, Plus } from 'lucide-react';
import { notificationService } from '@/services/notificationService';

export default function NotificationManagement() {
  const [statistics, setStatistics] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [stats, temps] = await Promise.all([
      notificationService.getStatistics('month'),
      notificationService.getTemplates()
    ]);
    setStatistics(stats);
    setTemplates(temps);
  };

  if (!statistics) return null;

  return (
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Notification Management' }]}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Push Notification Management</h1>
            <p className="text-gray-600 mt-1">Manage templates, campaigns, and delivery</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sent</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.sent}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivery Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.deliveryRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Read Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.readRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">8.5K</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Notification Templates</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                      <div className="flex gap-2 mt-2">
                        {template.channels.map((channel: string) => (
                          <Badge key={channel} variant="outline" className="text-xs capitalize">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={template.enabled ? 'success' : 'secondary'}>
                        {template.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}

