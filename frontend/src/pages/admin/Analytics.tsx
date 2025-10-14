import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Filter,
  Activity,
  Star
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Analytics() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '$125,480', change: '+22%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Appointments', value: '3,521', change: '+18%', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Users', value: '1,247', change: '+12%', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Growth Rate', value: '22.5%', change: '+5%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  const topDoctors = [
    { rank: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 247, revenue: 24700, rating: 4.9, consultations: 1245 },
    { rank: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', patients: 189, revenue: 17010, rating: 4.8, consultations: 987 },
    { rank: 3, name: 'Dr. Emily Davis', specialty: 'General Medicine', patients: 156, revenue: 12480, rating: 4.7, consultations: 865 },
    { rank: 4, name: 'Dr. James Wilson', specialty: 'Pediatrics', patients: 134, revenue: 12730, rating: 4.9, consultations: 756 },
    { rank: 5, name: 'Dr. Lisa Brown', specialty: 'Psychiatry', patients: 98, revenue: 9800, rating: 4.8, consultations: 654 },
  ];

  const revenueByCategory = [
    { category: 'Video Consultations', amount: 85340, percentage: 68, trend: '+15%' },
    { category: 'Pharmacy Sales', amount: 28150, percentage: 22, trend: '+28%' },
    { category: 'Subscription Plans', amount: 11990, percentage: 10, trend: '+12%' },
  ];

  const specialtyDistribution = [
    { specialty: 'Cardiology', doctors: 15, patients: 847, percentage: 25 },
    { specialty: 'Dermatology', doctors: 12, patients: 623, percentage: 18 },
    { specialty: 'General Medicine', doctors: 18, patients: 1245, percentage: 35 },
    { specialty: 'Pediatrics', doctors: 10, patients: 512, percentage: 15 },
    { specialty: 'Psychiatry', doctors: 8, patients: 234, percentage: 7 },
  ];

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Platform performance and business insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="flex h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm min-w-[120px]"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="success" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Trend</h3>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-slate-100">
              <p className="text-gray-500">Revenue Chart (Recharts integration ready)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50/50 rounded-xl border border-slate-100">
              <p className="text-gray-500">User Growth Chart (Recharts integration ready)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Revenue by Category</h3>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {revenueByCategory.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <Badge variant="success" className="text-xs">{item.trend}</Badge>
                  </div>
                  <span className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total revenue</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Doctors */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Top Performing Doctors</h3>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead className="text-center">Patients</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Consultations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDoctors.map((doctor) => (
                <TableRow key={doctor.rank} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold">
                      {doctor.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{doctor.name}</TableCell>
                  <TableCell className="text-gray-600">{doctor.specialty}</TableCell>
                  <TableCell className="text-center">{doctor.patients}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="success">{doctor.rating} ⭐</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    ${doctor.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">{doctor.consultations}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Specialty Distribution */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Specialty Distribution</h3>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {specialtyDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-32">
                  <p className="text-sm font-medium text-gray-700">{item.specialty}</p>
                  <p className="text-xs text-gray-500">{item.doctors} doctors</p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  <p className="text-sm font-semibold text-gray-900">{item.patients} pts</p>
                  <p className="text-xs text-gray-500">{item.percentage}%</p>
                </div>
              </div>
            ))}
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
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Analytics' }]}>
      {content}
    </DesktopLayout>
  );
}

