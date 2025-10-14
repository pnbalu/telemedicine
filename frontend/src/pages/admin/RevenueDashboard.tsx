import React, { useState, useEffect } from 'react';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';

export default function RevenueDashboard() {
  const [revenueData, setRevenueData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const data = await analyticsService.getRevenueAnalytics('month');
    setRevenueData(data);
    setIsLoading(false);
  };

  if (isLoading || !revenueData) {
    return (
      <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Revenue Dashboard' }]}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Loading revenue data...</p>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout 
      role="admin" 
      userName="Admin User" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Revenue & Transactions' }
      ]}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue & Transactions</h1>
            <p className="text-gray-600 mt-1">Financial overview and transaction analytics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter Period
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    ${(revenueData.total / 1000).toFixed(0)}K
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12.5% from last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Consultations</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    ${(revenueData.bySource.consultations / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {((revenueData.bySource.consultations / revenueData.total) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Month Projection</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    ${(revenueData.projections.nextMonth / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {(revenueData.projections.confidence * 100).toFixed(0)}% confidence
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Prescriptions</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    ${(revenueData.bySource.prescriptions / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {((revenueData.bySource.prescriptions / revenueData.total) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Revenue Doctors */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Top Revenue Doctors</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {revenueData.topRevenueDoctors.map((doctor: any, idx: number) => (
                <div key={doctor.doctorId} className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doctor.doctorName}</p>
                      <p className="text-sm text-gray-600">{doctor.consultations} consultations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${(doctor.revenue / 1000).toFixed(1)}K</p>
                    <Badge variant="success" className="mt-1">Active</Badge>
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

