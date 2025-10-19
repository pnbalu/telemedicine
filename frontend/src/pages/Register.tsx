import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, ArrowRight, CheckCircle2, UserCheck, Mail } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isInviteLink, setIsInviteLink] = useState(false);
  const [inviteInfo, setInviteInfo] = useState({
    email: '',
    role: 'patient',
    valid: false
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient'
  });

  useEffect(() => {
    // Check if this is an invite link
    const inviteToken = searchParams.get('invite');
    const inviteEmail = searchParams.get('email');
    const inviteRole = searchParams.get('role');

    if (inviteToken && inviteEmail && inviteRole) {
      try {
        // Decode the token (in a real app, you'd validate this server-side)
        const decoded = atob(inviteToken);
        const [tokenEmail, tokenRole, timestamp] = decoded.split(':');
        
        // Check if the token is not too old (24 hours)
        const tokenTime = parseInt(timestamp);
        const now = Date.now();
        const isValid = (now - tokenTime) < (24 * 60 * 60 * 1000);

        if (isValid && tokenEmail === inviteEmail && tokenRole === inviteRole) {
          setIsInviteLink(true);
          setInviteInfo({
            email: decodeURIComponent(inviteEmail),
            role: inviteRole,
            valid: true
          });
          setFormData(prev => ({
            ...prev,
            email: decodeURIComponent(inviteEmail),
            role: inviteRole
          }));
        }
      } catch (error) {
        console.error('Invalid invite token:', error);
      }
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Benefits */}
        <div className="hidden lg:block space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/60 shadow-lg">
              <Video className="w-6 h-6 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                TeleMedX
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Start Your<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Health Journey
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Join thousands of patients and healthcare professionals on our platform.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {[
              'Instant access to healthcare professionals',
              'Secure video consultations from anywhere',
              'Digital prescriptions and medical records',
              'Medicine delivery to your doorstep',
              '24/7 customer support'
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Register form */}
        <div className="animate-slide-up">
          <Card className="border-0 shadow-2xl backdrop-blur-xl bg-white/80">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6">
                {/* Mobile logo */}
                <div className="lg:hidden flex items-center justify-center gap-2 mb-2">
                  <Video className="w-7 h-7 text-indigo-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    TeleMedX
                  </span>
                </div>

                <div className="space-y-2 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {isInviteLink ? 'Complete Your Registration' : 'Create account'}
                  </h2>
                  <p className="text-gray-600">
                    {isInviteLink ? 'You\'ve been invited to join TeleMedX' : 'Get started with your free account'}
                  </p>
                </div>

                {/* Invite Link Banner */}
                {isInviteLink && inviteInfo.valid && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-800">Welcome! You've been invited</h3>
                        <p className="text-sm text-green-700">
                          You're registering as a <strong>{inviteInfo.role}</strong> with email <strong>{inviteInfo.email}</strong>
                        </p>
                      </div>
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-11 px-4 bg-white/50 border-gray-200 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`h-11 px-4 border-gray-200 focus:border-indigo-500 ${isInviteLink ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/50'}`}
                        required
                        readOnly={isInviteLink}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11 px-4 bg-white/50 border-gray-200 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="h-11 px-4 bg-white/50 border-gray-200 focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="h-11 px-4 bg-white/50 border-gray-200 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                      Register as
                    </Label>
                    <select
                      id="role"
                      className={`flex h-11 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${isInviteLink ? 'bg-gray-100 cursor-not-allowed' : 'bg-white/50'}`}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      disabled={isInviteLink}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/30"
                  >
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
