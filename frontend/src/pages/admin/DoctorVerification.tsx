import React, { useState, useEffect } from 'react';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  AlertCircle,
  Download,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { User as UserType, roleManagementService } from '@/services/roleManagementService';
import { fraudDetectionService } from '@/services/fraudDetectionService';

export default function DoctorVerification() {
  const [pendingDoctors, setPendingDoctors] = useState<UserType[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<UserType | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPendingDoctors();
  }, []);

  const loadPendingDoctors = async () => {
    setIsLoading(true);
    const users = await roleManagementService.getAllUsers();
    const pending = users.filter(u => u.role === 'doctor' && u.status === 'pending_verification');
    setPendingDoctors(pending);
    setIsLoading(false);
  };

  const handleVerify = async (doctorId: string, approved: boolean) => {
    if (approved) {
      await roleManagementService.updateUserStatus(doctorId, 'active');
      alert('Doctor verified successfully!');
    } else {
      await roleManagementService.updateUserStatus(doctorId, 'suspended');
      alert('Doctor application rejected');
    }
    setSelectedDoctor(null);
    loadPendingDoctors();
  };

  const verifyCredentials = async (doctor: UserType) => {
    const result = await fraudDetectionService.verifyDoctorCredentials(
      doctor.id,
      {
        licenseNumber: doctor.metadata?.licenseNumber || '',
        state: 'CA',
        npiNumber: doctor.metadata?.npiNumber,
        deaNumber: doctor.metadata?.deaNumber
      }
    );

    alert(`Verification Result:\n
License: ${result.details.licenseValid ? '✓ Valid' : '✗ Invalid'}
NPI: ${result.details.npiValid ? '✓ Valid' : 'N/A'}
Background Check: ${result.details.backgroundCheckPassed ? '✓ Passed' : '✗ Failed'}
Confidence: ${(result.confidence * 100).toFixed(1)}%
    `);
  };

  return (
    <DesktopLayout 
      role="admin" 
      userName="Admin User" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Doctor Verification' }
      ]}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Verification</h1>
            <p className="text-gray-600 mt-1">Review and verify doctor applications</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{pendingDoctors.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified Today</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
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
                  <p className="text-sm text-gray-600">Rejected Today</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
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
                  <p className="text-sm text-gray-600">Avg Review Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">24h</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Pending Applications</h3>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search doctors..."
                  className="w-64"
                />
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {pendingDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                        {doctor.firstName[0]}{doctor.lastName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{doctor.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <FileText className="w-3.5 h-3.5" />
                            <span>License: {doctor.metadata?.licenseNumber}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Shield className="w-3.5 h-3.5" />
                            <span>{doctor.metadata?.specialty}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={doctor.verificationStatus?.emailVerified ? 'success' : 'warning'}>
                            Email {doctor.verificationStatus?.emailVerified ? 'Verified' : 'Unverified'}
                          </Badge>
                          <Badge variant={doctor.verificationStatus?.phoneVerified ? 'success' : 'warning'}>
                            Phone {doctor.verificationStatus?.phoneVerified ? 'Verified' : 'Unverified'}
                          </Badge>
                          <Badge variant="secondary">
                            License Pending
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          verifyCredentials(doctor);
                        }}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoctor(doctor);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {pendingDoctors.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-gray-600">No pending applications</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Verification Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                    </h2>
                    <p className="text-gray-600">Application Review</p>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedDoctor(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-semibold text-gray-900">
                        Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{selectedDoctor.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Specialty</p>
                      <p className="font-semibold text-gray-900">{selectedDoctor.metadata?.specialty}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-semibold text-gray-900">
                        {selectedDoctor.metadata?.yearsExperience || 'N/A'} years
                      </p>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Credentials</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-900 font-medium">Medical License</p>
                      <p className="text-lg font-bold text-blue-900">
                        {selectedDoctor.metadata?.licenseNumber}
                      </p>
                      <Badge variant="warning" className="mt-2">Pending Verification</Badge>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">NPI Number</p>
                      <p className="font-semibold text-gray-900">
                        {selectedDoctor.metadata?.npiNumber || 'Not Provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Verification Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Email Verified</span>
                      </div>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Phone Verified</span>
                      </div>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-orange-900">License Verification</span>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-orange-900">Background Check</span>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                  </div>
                </div>

                {/* Verification Notes */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Verification Notes</h3>
                  <Textarea
                    placeholder="Add notes about the verification process..."
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedDoctor(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleVerify(selectedDoctor.id, false)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => handleVerify(selectedDoctor.id, true)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve & Verify
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

