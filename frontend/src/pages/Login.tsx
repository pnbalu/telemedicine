import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, ArrowRight, Shield, Heart, Zap } from 'lucide-react';

const DEMO_ACCOUNTS: Record<string, { password: string; role: string; name: string }> = {
  'patient@test.com': { password: 'test123', role: 'patient', name: 'John Doe' },
  'doctor@test.com': { password: 'test123', role: 'doctor', name: 'Dr. Alice Smith' },
  'admin@test.com': { password: 'test123', role: 'admin', name: 'Admin User' },
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const account = DEMO_ACCOUNTS[formData.email.toLowerCase()];
    
    if (!account || account.password !== formData.password) {
      setError('Invalid email or password');
      return;
    }

    // Route based on account type
    if (account.role === 'patient') {
      navigate('/patient/dashboard');
    } else if (account.role === 'doctor') {
      navigate('/doctor/dashboard');
    } else if (account.role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-white/60 shadow-lg">
              <Video className="w-6 h-6 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                TeleMedX
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Healthcare at<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Your Fingertips
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Connect with top healthcare professionals through secure video consultations, anytime, anywhere.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
                <p className="text-sm text-gray-600">HIPAA compliant with end-to-end encryption</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Expert Care</h3>
                <p className="text-sm text-gray-600">Access to board-certified doctors 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Instant Access</h3>
                <p className="text-sm text-gray-600">Get consultations in minutes, not days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="animate-slide-up">
          <Card className="border-0 shadow-2xl backdrop-blur-xl bg-white/80">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-8">
                {/* Mobile logo */}
                <div className="lg:hidden flex items-center justify-center gap-2 mb-2">
                  <Video className="w-7 h-7 text-indigo-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    TeleMedX
                  </span>
                </div>

                <div className="space-y-2 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                  <p className="text-gray-600">Sign in to continue to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <p className="text-sm text-red-800 font-medium">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 px-4 bg-white/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                        Password
                      </Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 px-4 bg-white/50 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40"
                  >
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {/* Demo Accounts Info */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-semibold text-blue-900">Demo Accounts</h4>
                    </div>
                    <div className="space-y-1 text-xs text-blue-800">
                      <p>👤 <strong>Patient:</strong> patient@test.com</p>
                      <p>⚕️ <strong>Doctor:</strong> doctor@test.com</p>
                      <p>🏥 <strong>Admin:</strong> admin@test.com</p>
                      <p className="text-blue-600 mt-2">🔑 Password: <strong>test123</strong></p>
                    </div>
                  </div>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500">New to TeleMedX?</span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Create an account
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
