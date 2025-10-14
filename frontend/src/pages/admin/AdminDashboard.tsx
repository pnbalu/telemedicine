import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Desktop from '@/components/layout/DesktopLayout';
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Search,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Ban,
  Server,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = {
    totalUsers: 1247,
    totalDoctors: 87,
    totalPatients: 1160,
    totalAppointments: 3521,
    revenue: 125480,
    activeConsultations: 12,
    growthRate: 22.5
  };

  const recentUsers = [
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@example.com', role: 'Doctor', status: 'Active', joined: '2025-10-01', patients: 45 },
    { id: 2, name: 'John Doe', email: 'john.d@example.com', role: 'Patient', status: 'Active', joined: '2025-10-02', appointments: 3 },
    { id: 3, name: 'Dr. Michael Chen', email: 'michael.c@example.com', role: 'Doctor', status: 'Pending', joined: '2025-10-03', patients: 0 },
    { id: 4, name: 'Jane Smith', email: 'jane.s@example.com', role: 'Patient', status: 'Active', joined: '2025-10-04', appointments: 5 },
    { id: 5, name: 'Dr. Emily Davis', email: 'emily.d@example.com', role: 'Doctor', status: 'Active', joined: '2025-09-28', patients: 62 },
    { id: 6, name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Patient', status: 'Active', joined: '2025-09-25', appointments: 2 },
  ];

  const systemMetrics = [
    { label: 'Server Uptime', value: '99.9%', status: 'success', trend: 'up', icon: Server },
    { label: 'Avg Response Time', value: '120ms', status: 'success', trend: 'down', icon: Activity },
    { label: 'Active Sessions', value: '247', status: 'warning', trend: 'up', icon: Users },
    { label: 'Database Load', value: '67%', status: 'warning', trend: 'up', icon: Database },
    { label: 'CPU Usage', value: '45%', status: 'success', trend: 'down', icon: Cpu },
    { label: 'Storage Used', value: '234 GB', status: 'success', trend: 'up', icon: HardDrive },
  ];

  const mainStats = [
    { label: 'Total Users', value: stats.totalUsers, change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Revenue', value: `$${(stats.revenue / 1000).toFixed(0)}K`, change: '+22%', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Appointments', value: stats.totalAppointments, change: '+18%', icon: Activity, color: 'from-purple-500 to-pink-500' },
    { label: 'Growth Rate', value: `${stats.growthRate}%`, change: '+5%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ];

  const topDoctors = [
    { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', patients: 247, rating: 4.9, consultations: 1245 },
    { name: 'Dr. Michael Chen', specialty: 'Dermatology', patients: 189, rating: 4.8, consultations: 987 },
    { name: 'Dr. Emily Davis', specialty: 'General', patients: 156, rating: 4.7, consultations: 865 },
  ];

  const revenueByCategory = [
    { category: 'Consultations', amount: 85340, percentage: 68 },
    { category: 'Pharmacy', amount: 28150, percentage: 22 },
    { category: 'Subscriptions', amount: 11990, percentage: 10 },
  ];

  // Mobile/Tablet View  
  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/50">
        <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              TeleMedX Admin
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {mainStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg backdrop-blur-xl bg-white/80">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Desktop View
  return (
    <Desktop role="admin" userName="Admin User" breadcrumbs={[{ label: 'Dashboard' }, { label: activeTab }]}>
      <div className="p-8 space-y-6">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
            <p className="text-gray-600 mt-1">Monitor and manage your telemedicine platform</p>
          </div>
          <Tabs value={activeTab}>
            <TabsList className="bg-white border border-gray-200 shadow-sm">
              <TabsTrigger active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                Overview
              </TabsTrigger>
              <TabsTrigger active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
                Users
              </TabsTrigger>
              <TabsTrigger active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')}>
                Analytics
              </TabsTrigger>
              <TabsTrigger active={activeTab === 'system'} onClick={() => setActiveTab('system')}>
                System
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-4 gap-6">
              {mainStats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="success" className="gap-1">
                        <ArrowUp className="w-3 h-3" />
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Recent Users - 5 columns */}
              <div className="col-span-5">
                <Card className="border-0 shadow-md bg-white h-full">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Recent Registrations</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    {recentUsers.slice(0, 5).map(user => (
                      <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-600 truncate">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.role === 'Doctor' ? 'default' : 'secondary'} className="text-xs">
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === 'Active' ? 'success' : 'warning'} className="text-xs">
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Top Doctors & Revenue - 7 columns */}
              <div className="col-span-7 space-y-6">
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Top Performing Doctors</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Doctor</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead className="text-center">Patients</TableHead>
                          <TableHead className="text-center">Rating</TableHead>
                          <TableHead className="text-right">Consultations</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topDoctors.map((doctor, idx) => (
                          <TableRow key={idx} className="hover:bg-gray-50">
                            <TableCell className="font-semibold">{doctor.name}</TableCell>
                            <TableCell className="text-gray-600">{doctor.specialty}</TableCell>
                            <TableCell className="text-center">{doctor.patients}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="success">{doctor.rating} ⭐</Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">{doctor.consultations}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md bg-white">
                    <CardHeader className="border-b border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900">Revenue Breakdown</h3>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {revenueByCategory.map((item, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                            <span className="text-sm font-bold text-gray-900">${item.amount.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm opacity-90">Total Revenue</p>
                          <p className="text-3xl font-bold mt-1">${stats.revenue.toLocaleString()}</p>
                          <p className="text-sm opacity-75 mt-1">+22% from last month</p>
                        </div>
                        <div className="pt-4 border-t border-white/20">
                          <p className="text-sm opacity-90">Avg per Transaction</p>
                          <p className="text-2xl font-bold mt-1">$35.64</p>
                        </div>
                        <div className="pt-4 border-t border-white/20">
                          <p className="text-sm opacity-90">Active Subscriptions</p>
                          <p className="text-2xl font-bold mt-1">428</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search users..." className="pl-10 w-80 bg-gray-50" />
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map(user => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell className="font-semibold">{user.name}</TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Doctor' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{user.joined}</TableCell>
                      <TableCell className="text-gray-600">
                        {user.role === 'Doctor' ? `${user.patients} patients` : `${user.appointments} appointments`}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {systemMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <Card key={idx} className="border-0 shadow-md bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          {metric.trend === 'up' ? (
                            <ArrowUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-blue-600" />
                          )}
                          <Badge variant={metric.status as any} className="text-xs">
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">System Configuration</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Email Notifications', description: 'Configure email settings and templates' },
                    { title: 'Payment Gateway', description: 'Manage payment integration' },
                    { title: 'Data Backup', description: 'Schedule and manage backups' },
                    { title: 'API Access', description: 'Manage API keys and integrations' },
                    { title: 'Security Settings', description: 'Configure authentication and encryption' },
                    { title: 'Content Management', description: 'Update terms, privacy policy, and FAQs' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 hover:shadow-md transition-all">
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Desktop>
  );
}
