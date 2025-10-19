import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Settings,
  Save,
  Eye,
  EyeOff,
  Shield,
  Users,
  Building2,
  CreditCard,
  Bell,
  Database,
  Activity,
  Camera,
  FileText,
  Heart,
  Pill,
  Calendar,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Star,
  Lock,
  Unlock,
  Plus,
  X,
  Edit,
  Trash2
} from 'lucide-react';

interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  required: boolean;
  tier: 'basic' | 'premium' | 'enterprise';
  dependencies?: string[];
}

interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  features: FeatureConfig[];
  enabled: boolean;
  tier: 'basic' | 'premium' | 'enterprise';
}

export default function Setup() {
  const [showDisabledFeatures, setShowDisabledFeatures] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'basic' | 'premium' | 'enterprise'>('premium');
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showAddFeatureModal, setShowAddFeatureModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  
  const [newModule, setNewModule] = useState({
    name: '',
    description: '',
    tier: 'basic' as 'basic' | 'premium' | 'enterprise'
  });
  
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    category: '',
    tier: 'basic' as 'basic' | 'premium' | 'enterprise',
    required: false
  });

  const [modules, setModules] = useState<ModuleConfig[]>([
    {
      id: 'core',
      name: 'Core Platform',
      description: 'Essential platform features',
      tier: 'basic',
      enabled: true,
      features: [
        {
          id: 'user_management',
          name: 'User Management',
          description: 'Manage patients, doctors, nurses, and admin users',
          category: 'core',
          icon: Users,
          enabled: true,
          required: true,
          tier: 'basic'
        },
        {
          id: 'authentication',
          name: 'Authentication',
          description: 'Login, registration, and user authentication',
          category: 'core',
          icon: Shield,
          enabled: true,
          required: true,
          tier: 'basic'
        },
        {
          id: 'basic_dashboard',
          name: 'Basic Dashboard',
          description: 'Basic dashboard for all user roles',
          category: 'core',
          icon: Activity,
          enabled: true,
          required: true,
          tier: 'basic'
        }
      ]
    },
    {
      id: 'telemedicine',
      name: 'Telemedicine',
      description: 'Video consultation and remote care features',
      tier: 'premium',
      enabled: true,
      features: [
        {
          id: 'video_consultation',
          name: 'Video Consultation',
          description: 'HD video calls between patients and doctors',
          category: 'telemedicine',
          icon: Camera,
          enabled: true,
          required: false,
          tier: 'premium'
        },
        {
          id: 'livekit_integration',
          name: 'LiveKit Integration',
          description: 'Advanced video calling with LiveKit',
          category: 'telemedicine',
          icon: Camera,
          enabled: true,
          required: false,
          tier: 'premium',
          dependencies: ['video_consultation']
        },
        {
          id: 'ai_agent',
          name: 'AI Agent Consultation',
          description: 'AI-powered virtual consultation assistant',
          category: 'telemedicine',
          icon: Zap,
          enabled: true,
          required: false,
          tier: 'enterprise'
        }
      ]
    },
    {
      id: 'medical_records',
      name: 'Medical Records',
      description: 'Patient medical records and documentation',
      tier: 'basic',
      enabled: true,
      features: [
        {
          id: 'patient_records',
          name: 'Patient Records',
          description: 'Comprehensive patient medical records',
          category: 'medical_records',
          icon: FileText,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'vital_signs',
          name: 'Vital Signs Tracking',
          description: 'Record and monitor patient vital signs',
          category: 'medical_records',
          icon: Heart,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'lab_results',
          name: 'Lab Results',
          description: 'Laboratory test results and reports',
          category: 'medical_records',
          icon: Database,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'prescriptions',
          name: 'Prescriptions',
          description: 'Digital prescription management',
          category: 'medical_records',
          icon: Pill,
          enabled: true,
          required: false,
          tier: 'basic'
        }
      ]
    },
    {
      id: 'scheduling',
      name: 'Scheduling & Appointments',
      description: 'Appointment booking and scheduling system',
      tier: 'basic',
      enabled: true,
      features: [
        {
          id: 'appointment_booking',
          name: 'Appointment Booking',
          description: 'Patient appointment booking system',
          category: 'scheduling',
          icon: Calendar,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'doctor_schedule',
          name: 'Doctor Schedule Management',
          description: 'Manage doctor availability and schedules',
          category: 'scheduling',
          icon: Calendar,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'nurse_schedule',
          name: 'Nurse Schedule Management',
          description: 'Manage nurse schedules and assignments',
          category: 'scheduling',
          icon: Calendar,
          enabled: true,
          required: false,
          tier: 'premium'
        }
      ]
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy & Medications',
      description: 'Pharmacy services and medication management',
      tier: 'premium',
      enabled: true,
      features: [
        {
          id: 'pharmacy_services',
          name: 'Pharmacy Services',
          description: 'Online pharmacy with medication ordering',
          category: 'pharmacy',
          icon: Pill,
          enabled: true,
          required: false,
          tier: 'premium'
        },
        {
          id: 'medication_tracking',
          name: 'Medication Tracking',
          description: 'Track medication adherence and refills',
          category: 'pharmacy',
          icon: Pill,
          enabled: true,
          required: false,
          tier: 'premium'
        },
        {
          id: 'prescription_tracking',
          name: 'Prescription Tracking',
          description: 'Track prescription status and delivery',
          category: 'pharmacy',
          icon: Pill,
          enabled: false,
          required: false,
          tier: 'enterprise'
        }
      ]
    },
    {
      id: 'payments',
      name: 'Payments & Billing',
      description: 'Payment processing and billing management',
      tier: 'premium',
      enabled: true,
      features: [
        {
          id: 'payment_processing',
          name: 'Payment Processing',
          description: 'Secure payment processing for consultations',
          category: 'payments',
          icon: CreditCard,
          enabled: true,
          required: false,
          tier: 'premium'
        },
        {
          id: 'billing_management',
          name: 'Billing Management',
          description: 'Comprehensive billing and invoice management',
          category: 'payments',
          icon: CreditCard,
          enabled: true,
          required: false,
          tier: 'premium'
        },
        {
          id: 'insurance_integration',
          name: 'Insurance Integration',
          description: 'Insurance claim processing and verification',
          category: 'payments',
          icon: CreditCard,
          enabled: false,
          required: false,
          tier: 'enterprise'
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Reporting',
      description: 'Advanced analytics and reporting features',
      tier: 'enterprise',
      enabled: true,
      features: [
        {
          id: 'basic_analytics',
          name: 'Basic Analytics',
          description: 'Basic usage statistics and reports',
          category: 'analytics',
          icon: TrendingUp,
          enabled: true,
          required: false,
          tier: 'premium'
        },
        {
          id: 'advanced_analytics',
          name: 'Advanced Analytics',
          description: 'Advanced analytics with custom dashboards',
          category: 'analytics',
          icon: TrendingUp,
          enabled: true,
          required: false,
          tier: 'enterprise'
        },
        {
          id: 'ai_reports',
          name: 'AI-Powered Reports',
          description: 'AI-generated insights and recommendations',
          category: 'analytics',
          icon: Zap,
          enabled: false,
          required: false,
          tier: 'enterprise'
        }
      ]
    },
    {
      id: 'communication',
      name: 'Communication',
      description: 'Messaging and notification systems',
      tier: 'basic',
      enabled: true,
      features: [
        {
          id: 'messaging',
          name: 'Messaging System',
          description: 'Secure messaging between users',
          category: 'communication',
          icon: MessageSquare,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'notifications',
          name: 'Notifications',
          description: 'Push notifications and alerts',
          category: 'communication',
          icon: Bell,
          enabled: true,
          required: false,
          tier: 'basic'
        },
        {
          id: 'email_integration',
          name: 'Email Integration',
          description: 'Email notifications and communications',
          category: 'communication',
          icon: Bell,
          enabled: true,
          required: false,
          tier: 'basic'
        }
      ]
    }
  ]);

  const tiers = {
    basic: {
      name: 'Basic',
      color: 'bg-blue-100 text-blue-800',
      description: 'Essential features for small practices',
      price: '$99/month'
    },
    premium: {
      name: 'Premium',
      color: 'bg-purple-100 text-purple-800',
      description: 'Advanced features for growing practices',
      price: '$299/month'
    },
    enterprise: {
      name: 'Enterprise',
      color: 'bg-gold-100 text-gold-800',
      description: 'Full feature set for large organizations',
      price: 'Custom pricing'
    }
  };

  const toggleFeature = (moduleId: string, featureId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          features: module.features.map(feature => {
            if (feature.id === featureId) {
              return { ...feature, enabled: !feature.enabled };
            }
            return feature;
          })
        };
      }
      return module;
    }));
  };

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return { ...module, enabled: !module.enabled };
      }
      return module;
    }));
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'premium': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'enterprise': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getFeatureStatus = (feature: FeatureConfig) => {
    if (feature.required) return { status: 'required', icon: Lock, color: 'text-green-600' };
    if (feature.enabled) return { status: 'enabled', icon: CheckCircle, color: 'text-green-600' };
    return { status: 'disabled', icon: XCircle, color: 'text-gray-400' };
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving configuration:', modules);
    alert('Configuration saved successfully!');
  };

  const handleReset = () => {
    // Reset to default configuration
    window.location.reload();
  };

  const handleAddModule = () => {
    if (!newModule.name || !newModule.description) {
      alert('Please fill in all required fields');
      return;
    }

    const moduleId = newModule.name.toLowerCase().replace(/\s+/g, '_');
    const newModuleConfig: ModuleConfig = {
      id: moduleId,
      name: newModule.name,
      description: newModule.description,
      tier: newModule.tier,
      enabled: true,
      features: []
    };

    setModules([...modules, newModuleConfig]);
    setNewModule({ name: '', description: '', tier: 'basic' });
    setShowAddModuleModal(false);
    alert('Module added successfully!');
  };

  const handleAddFeature = () => {
    if (!newFeature.name || !newFeature.description || !selectedModuleId) {
      alert('Please fill in all required fields');
      return;
    }

    const featureId = newFeature.name.toLowerCase().replace(/\s+/g, '_');
    const newFeatureConfig: FeatureConfig = {
      id: featureId,
      name: newFeature.name,
      description: newFeature.description,
      category: newFeature.category || 'custom',
      icon: Activity, // Default icon, can be enhanced later
      enabled: true,
      required: newFeature.required,
      tier: newFeature.tier
    };

    setModules(modules.map(module => {
      if (module.id === selectedModuleId) {
        return {
          ...module,
          features: [...module.features, newFeatureConfig]
        };
      }
      return module;
    }));

    setNewFeature({ name: '', description: '', category: '', tier: 'basic', required: false });
    setSelectedModuleId('');
    setShowAddFeatureModal(false);
    alert('Feature added successfully!');
  };

  const handleDeleteModule = (moduleId: string) => {
    if (window.confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      setModules(modules.filter(module => module.id !== moduleId));
      alert('Module deleted successfully!');
    }
  };

  const handleDeleteFeature = (moduleId: string, featureId: string) => {
    if (window.confirm('Are you sure you want to delete this feature? This action cannot be undone.')) {
      setModules(modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            features: module.features.filter(feature => feature.id !== featureId)
          };
        }
        return module;
      }));
      alert('Feature deleted successfully!');
    }
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Setup & Configuration', href: '/admin/setup' }
  ];

  return (
    <DesktopLayout 
      role="admin" 
      userName="Admin User" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-6 m-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Setup & Configuration</h1>
            <p className="text-gray-600 mt-1">Configure which features and modules are enabled for your platform</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>

        {/* Tier Selection */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-600" />
              Subscription Tier
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(tiers).map(([key, tier]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTier(key as any)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedTier === key
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={tier.color}>
                      {tier.name}
                    </Badge>
                    <span className="font-semibold text-gray-900">{tier.price}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tier.name} Plan</h3>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Options */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Feature Configuration
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModuleModal(true)}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDisabledFeatures(!showDisabledFeatures)}
                >
                  {showDisabledFeatures ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showDisabledFeatures ? 'Hide Disabled Info' : 'Show Disabled Info'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {modules.map((module) => {
                // Always show all features, but filter based on showDisabledFeatures setting
                const visibleFeatures = showDisabledFeatures 
                  ? module.features 
                  : module.features; // Show all features, styling will indicate disabled state

                return (
                  <div key={module.id} className={`border rounded-lg p-4 transition-all ${
                    module.enabled 
                      ? 'border-gray-200 bg-white' 
                      : 'border-red-300 bg-red-50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          module.enabled ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          <Building2 className={`w-5 h-5 ${
                            module.enabled ? 'text-blue-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            module.enabled ? 'text-gray-900' : 'text-red-700'
                          }`}>{module.name}</h3>
                          <p className={`text-sm ${
                            module.enabled ? 'text-gray-600' : 'text-red-500'
                          }`}>{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getTierColor(module.tier)}>
                          {module.tier}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedModuleId(module.id);
                              setShowAddFeatureModal(true);
                            }}
                            title="Add Feature"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteModule(module.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete Module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          onClick={() => toggleModule(module.id)}
                          className={module.enabled 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                          }
                          size="sm"
                        >
                          {module.enabled ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {visibleFeatures.length === 0 ? (
                        <div className="col-span-full p-8 text-center text-gray-500">
                          <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-lg font-medium">No features available</p>
                          <p className="text-sm">Add features to this module to get started.</p>
                        </div>
                      ) : (
                        visibleFeatures.map((feature) => {
                        const Icon = feature.icon;
                        const status = getFeatureStatus(feature);
                        const StatusIcon = status.icon;
                        
                        return (
                          <div
                            key={feature.id}
                            className={`p-4 rounded-lg border transition-all relative ${
                              feature.enabled || feature.required
                                ? 'border-green-200 bg-green-50'
                                : 'border-red-200 bg-red-50 opacity-75'
                            } ${!showDisabledFeatures && !feature.enabled && !feature.required ? 'opacity-50' : ''}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Icon className={`w-5 h-5 ${
                                  feature.enabled || feature.required ? 'text-gray-600' : 'text-red-600'
                                }`} />
                                <h4 className={`font-medium ${
                                  feature.enabled || feature.required ? 'text-gray-900' : 'text-red-700'
                                }`}>{feature.name}</h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <StatusIcon className={`w-4 h-4 ${status.color}`} />
                                <div className="flex items-center gap-1">
                                  {!feature.required && (
                                    <button
                                      onClick={() => toggleFeature(module.id, feature.id)}
                                      className={`text-sm font-medium ${
                                        feature.enabled 
                                          ? 'text-red-600 hover:text-red-800' 
                                          : 'text-green-600 hover:text-green-800'
                                      }`}
                                    >
                                      {feature.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteFeature(module.id, feature.id)}
                                    className="text-red-600 hover:text-red-700 p-1"
                                    title="Delete Feature"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <p className={`text-sm mb-2 ${
                              feature.enabled || feature.required ? 'text-gray-600' : 'text-red-500'
                            }`}>{feature.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={getTierColor(feature.tier)} variant="outline">
                                {feature.tier}
                              </Badge>
                              {feature.required && (
                                <Badge className="text-green-600 bg-green-50 border-green-200" variant="outline">
                                  Required
                                </Badge>
                              )}
                              {!feature.enabled && !feature.required && (
                                <Badge className="text-red-600 bg-red-50 border-red-200" variant="outline">
                                  Disabled
                                </Badge>
                              )}
                            </div>
                          </div>
                        );
                      })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Configuration Summary */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Configuration Summary
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {modules.filter(m => m.enabled).length}
                </div>
                <div className="text-sm text-gray-600">Active Modules</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {modules.reduce((total, module) => 
                    total + module.features.filter(f => f.enabled).length, 0
                  )}
                </div>
                <div className="text-sm text-gray-600">Enabled Features</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {modules.reduce((total, module) => 
                    total + module.features.filter(f => f.required).length, 0
                  )}
                </div>
                <div className="text-sm text-gray-600">Required Features</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">
                  {tiers[selectedTier].name}
                </div>
                <div className="text-sm text-gray-600">Selected Tier</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Module Modal */}
        {showAddModuleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Module</h3>
                <Button variant="outline" size="sm" onClick={() => setShowAddModuleModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="moduleName">Module Name *</Label>
                  <Input
                    id="moduleName"
                    value={newModule.name}
                    onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                    placeholder="Enter module name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="moduleDescription">Description *</Label>
                  <Input
                    id="moduleDescription"
                    value={newModule.description}
                    onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                    placeholder="Enter module description"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="moduleTier">Tier</Label>
                  <select
                    id="moduleTier"
                    value={newModule.tier}
                    onChange={(e) => setNewModule({ ...newModule, tier: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddModuleModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add Feature Modal */}
        {showAddFeatureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Feature</h3>
                <Button variant="outline" size="sm" onClick={() => setShowAddFeatureModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featureName">Feature Name *</Label>
                  <Input
                    id="featureName"
                    value={newFeature.name}
                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                    placeholder="Enter feature name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featureDescription">Description *</Label>
                  <Input
                    id="featureDescription"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    placeholder="Enter feature description"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featureCategory">Category</Label>
                  <Input
                    id="featureCategory"
                    value={newFeature.category}
                    onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value })}
                    placeholder="Enter feature category"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featureTier">Tier</Label>
                  <select
                    id="featureTier"
                    value={newFeature.tier}
                    onChange={(e) => setNewFeature({ ...newFeature, tier: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featureRequired"
                    checked={newFeature.required}
                    onChange={(e) => setNewFeature({ ...newFeature, required: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="featureRequired">Required Feature</Label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddFeatureModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFeature}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}
