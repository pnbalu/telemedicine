import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  HardDrive,
  Wifi,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SystemHealth() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const systemMetrics = [
    { label: 'Server Uptime', value: '99.9%', status: 'success', icon: Server, trend: 'stable', details: '30 days, 2 hours' },
    { label: 'CPU Usage', value: '45%', status: 'success', icon: Cpu, trend: 'down', details: 'Average: 38%' },
    { label: 'Memory Usage', value: '67%', status: 'warning', icon: Activity, trend: 'up', details: '8.2 GB / 12 GB' },
    { label: 'Database Load', value: '34%', status: 'success', icon: Database, trend: 'stable', details: 'Queries: 1,245/min' },
    { label: 'Storage Used', value: '234 GB', status: 'success', icon: HardDrive, trend: 'up', details: '468 GB available' },
    { label: 'Network Traffic', value: '125 Mbps', status: 'success', icon: Wifi, trend: 'stable', details: 'Bandwidth: 1 Gbps' },
  ];

  const services = [
    { name: 'Web Server', status: 'running', uptime: '99.9%', lastRestart: '30 days ago', port: '443', health: 'healthy' },
    { name: 'API Server', status: 'running', uptime: '99.8%', lastRestart: '15 days ago', port: '8080', health: 'healthy' },
    { name: 'Database', status: 'running', uptime: '99.9%', lastRestart: '45 days ago', port: '5432', health: 'healthy' },
    { name: 'Video Server', status: 'running', uptime: '99.7%', lastRestart: '7 days ago', port: '3478', health: 'healthy' },
    { name: 'Redis Cache', status: 'running', uptime: '99.9%', lastRestart: '30 days ago', port: '6379', health: 'healthy' },
    { name: 'Email Service', status: 'running', uptime: '98.5%', lastRestart: '2 days ago', port: '587', health: 'degraded' },
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'High memory usage detected', time: '2 hours ago', resolved: false },
    { id: 2, type: 'info', message: 'Database backup completed', time: '6 hours ago', resolved: true },
    { id: 3, type: 'error', message: 'Email service temporary failure', time: '1 day ago', resolved: true },
    { id: 4, type: 'info', message: 'SSL certificate renewed', time: '2 days ago', resolved: true },
  ];

  const performanceMetrics = [
    { metric: 'Avg Response Time', value: '120ms', target: '<200ms', status: 'success' },
    { metric: 'Error Rate', value: '0.02%', target: '<0.1%', status: 'success' },
    { metric: 'Active Sessions', value: '247', target: '<500', status: 'success' },
    { metric: 'API Requests/min', value: '1,245', target: '<5,000', status: 'success' },
  ];

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
          <p className="text-gray-600 mt-1">Monitor system performance and infrastructure</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            All Systems Operational
          </Badge>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                    metric.status === 'success' ? 'from-green-500 to-emerald-500' :
                    metric.status === 'warning' ? 'from-yellow-500 to-orange-500' :
                    'from-red-500 to-rose-500'
                  } flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant={metric.status as any} className="text-xs capitalize">
                    {metric.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-2">{metric.details}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Services Status */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Services Status</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-semibold">Service</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Uptime</th>
                  <th className="text-left p-4 font-semibold">Last Restart</th>
                  <th className="text-left p-4 font-semibold">Port</th>
                  <th className="text-left p-4 font-semibold">Health</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-900">{service.name}</td>
                    <td className="p-4">
                      <Badge variant={service.status === 'running' ? 'success' : 'destructive'}>
                        {service.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-600">{service.uptime}</td>
                    <td className="p-4 text-gray-600">{service.lastRestart}</td>
                    <td className="p-4 text-gray-600">{service.port}</td>
                    <td className="p-4">
                      <Badge variant={service.health === 'healthy' ? 'success' : 'warning'}>
                        {service.health}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">Restart</Button>
                        <Button variant="ghost" size="sm">Logs</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Performance Metrics</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {performanceMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{metric.metric}</p>
                    <p className="text-sm text-gray-600">Target: {metric.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <Badge variant={metric.status as any} className="text-xs mt-1">
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Recent Alerts</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.type === 'error' ? 'bg-red-50 border-red-200' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {alert.type === 'error' ? (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        ) : alert.type === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        )}
                        <p className="font-semibold text-sm text-gray-900">{alert.message}</p>
                      </div>
                      <p className="text-xs text-gray-600">{alert.time}</p>
                    </div>
                    <Badge variant={alert.resolved ? 'success' : 'warning'} className="text-xs">
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">System Logs</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 h-64 overflow-y-auto">
            <div className="space-y-1">
              <p>[2025-10-10 14:23:45] INFO: Database connection established</p>
              <p>[2025-10-10 14:23:46] INFO: Redis cache connected</p>
              <p>[2025-10-10 14:23:47] INFO: API server started on port 8080</p>
              <p>[2025-10-10 14:23:48] INFO: WebSocket server initialized</p>
              <p>[2025-10-10 14:24:12] INFO: User authentication successful (user_id: 1247)</p>
              <p>[2025-10-10 14:24:35] INFO: Appointment booked (appointment_id: 3521)</p>
              <p>[2025-10-10 14:25:01] WARN: High memory usage detected (67%)</p>
              <p>[2025-10-10 14:25:15] INFO: Video consultation started (room_id: VC12345)</p>
              <p>[2025-10-10 14:26:42] INFO: Prescription created (prescription_id: 156)</p>
              <p>[2025-10-10 14:27:03] INFO: Payment processed successfully (transaction_id: TXN789)</p>
            </div>
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
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Dashboard' }, { label: 'System Health' }]}>
      {content}
    </DesktopLayout>
  );
}

