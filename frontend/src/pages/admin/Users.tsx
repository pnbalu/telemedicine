import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Search, 
  Users as UsersIcon, 
  Eye, 
  Edit, 
  Ban, 
  Plus,
  Filter,
  Download,
  UserPlus,
  UserCheck,
  UserX
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Users() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const users = [
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@example.com', role: 'Doctor', status: 'Active', joined: '2025-10-01', patients: 45, lastLogin: '2 hours ago' },
    { id: 2, name: 'John Doe', email: 'john.d@example.com', role: 'Patient', status: 'Active', joined: '2025-10-02', appointments: 3, lastLogin: '1 day ago' },
    { id: 3, name: 'Dr. Michael Chen', email: 'michael.c@example.com', role: 'Doctor', status: 'Pending', joined: '2025-10-03', patients: 0, lastLogin: 'Never' },
    { id: 4, name: 'Jane Smith', email: 'jane.s@example.com', role: 'Patient', status: 'Active', joined: '2025-10-04', appointments: 5, lastLogin: '3 hours ago' },
    { id: 5, name: 'Dr. Emily Davis', email: 'emily.d@example.com', role: 'Doctor', status: 'Active', joined: '2025-09-28', patients: 62, lastLogin: '30 min ago' },
    { id: 6, name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Patient', status: 'Active', joined: '2025-09-25', appointments: 2, lastLogin: '2 days ago' },
    { id: 7, name: 'Dr. James Wilson', email: 'james.w@example.com', role: 'Doctor', status: 'Suspended', joined: '2025-09-20', patients: 23, lastLogin: '1 week ago' },
    { id: 8, name: 'Emma Davis', email: 'emma.d@example.com', role: 'Patient', status: 'Active', joined: '2025-09-15', appointments: 8, lastLogin: '5 hours ago' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: UsersIcon, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Users', value: '1,160', change: '+8%', icon: UserCheck, color: 'from-green-500 to-emerald-500' },
    { label: 'New This Month', value: '87', change: '+22%', icon: UserPlus, color: 'from-purple-500 to-pink-500' },
    { label: 'Suspended', value: '15', change: '-3', icon: UserX, color: 'from-red-500 to-rose-500' },
  ];

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all platform users and their permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant={stat.change.startsWith('+') ? 'success' : 'secondary'} className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="flex h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm min-w-[120px]"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="doctor">Doctors</option>
                <option value="patient">Patients</option>
              </select>
              <select
                className="flex h-10 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm min-w-[120px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">User List ({filteredUsers.length})</h3>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Doctor' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === 'Active' ? 'success' :
                        user.status === 'Pending' ? 'warning' :
                        'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.joined}</TableCell>
                    <TableCell className="text-gray-600">
                      {user.role === 'Doctor' ? `${user.patients} patients` : `${user.appointments} appointments`}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit User">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" title="Suspend User">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card className="border-0 shadow-md bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
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
    <DesktopLayout role="admin" userName="Admin User" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Users' }]}>
      {content}
    </DesktopLayout>
  );
}

