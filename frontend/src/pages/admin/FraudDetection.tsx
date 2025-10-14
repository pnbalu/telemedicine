import React, { useState, useEffect } from 'react';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp
} from 'lucide-react';
import { fraudDetectionService, FraudAlert } from '@/services/fraudDetectionService';

export default function FraudDetection() {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [alertData, stats] = await Promise.all([
      fraudDetectionService.getActiveFraudAlerts(),
      fraudDetectionService.getFraudStatistics()
    ]);
    setAlerts(alertData);
    setStatistics(stats);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <DesktopLayout 
      role="admin" 
      userName="Admin User" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Fraud Detection' }
      ]}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Fraud Detection</h1>
            <p className="text-gray-600 mt-1">Monitor and prevent fraudulent activities</p>
          </div>
          <Button onClick={loadData} className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <Shield className="w-4 h-4 mr-2" />
            Run Fraud Scan
          </Button>
        </div>

        {statistics && (
          <div className="grid grid-cols-4 gap-6 mb-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Alerts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.totalAlerts}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Critical Alerts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.criticalAlerts}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{statistics.resolvedAlerts}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Detection Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">98.5%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Active Fraud Alerts</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 bg-gradient-to-br from-gray-50 to-red-50/30 rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={getSeverityColor(alert.severity)} className="capitalize">
                          {alert.severity}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {alert.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Risk Score: {alert.riskScore}/100
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900">{alert.userName} ({alert.userRole})</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Detected: {alert.detectedAt.toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedAlert(alert); }}>
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b border-gray-100 sticky top-0 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Fraud Alert Details</h2>
                  <Button variant="ghost" onClick={() => setSelectedAlert(null)}>Close</Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-bold text-red-900">{selectedAlert.description}</p>
                  <p className="text-sm text-red-700 mt-1">Risk Score: {selectedAlert.riskScore}/100</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Evidence</h3>
                  <div className="space-y-2">
                    {selectedAlert.evidence.map((ev, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900">{ev.description}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Confidence: {(ev.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">Mark as False Positive</Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Resolve Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}

