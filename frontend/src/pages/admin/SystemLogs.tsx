import React, { useState, useEffect } from 'react';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Filter, Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { roleManagementService } from '@/services/roleManagementService';

export default function SystemLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const logData = await roleManagementService.getAccessLogs();
    setLogs(logData);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'System Logs & Audit Trail' }]}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Logs & Audit Trail</h1>
            <p className="text-gray-600 mt-1">HIPAA/GDPR compliant access logging</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
            <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export</Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search logs by user, action, or resource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Access Logs</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{log.userName}</p>
                        <Badge variant="outline" className="text-xs">{log.action}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Resource: {log.resource}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {log.timestamp.toLocaleString()} • IP: {log.ipAddress}
                      </p>
                      {log.details && <p className="text-xs text-red-600 mt-1">{log.details}</p>}
                    </div>
                  </div>
                  <Badge variant={log.status === 'success' ? 'success' : log.status === 'denied' ? 'destructive' : 'warning'}>
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}

