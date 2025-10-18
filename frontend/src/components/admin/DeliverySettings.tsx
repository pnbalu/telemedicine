import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Save, 
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { checkoutService } from '@/services/checkoutService';

interface DeliverySettings {
  maxDeliveryRadius: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  estimatedDeliveryDays: number;
}

export default function DeliverySettingsPanel() {
  const [settings, setSettings] = useState<DeliverySettings>({
    maxDeliveryRadius: 25,
    deliveryFee: 5.00,
    freeDeliveryThreshold: 50.00,
    estimatedDeliveryDays: 2
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const currentSettings = await checkoutService.getDeliverySettings();
      setSettings(currentSettings);
    } catch (error) {
      console.error('Failed to load delivery settings:', error);
      setMessage({ type: 'error', text: 'Failed to load delivery settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      // In a real application, this would make an API call to save the settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setMessage({ type: 'success', text: 'Delivery settings saved successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Failed to save delivery settings:', error);
      setMessage({ type: 'error', text: 'Failed to save delivery settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({
      maxDeliveryRadius: 25,
      deliveryFee: 5.00,
      freeDeliveryThreshold: 50.00,
      estimatedDeliveryDays: 2
    });
    setMessage(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Delivery Settings</h2>
              <p className="text-gray-600">Configure delivery radius and pricing</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Radius */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Maximum Delivery Radius
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={settings.maxDeliveryRadius}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    maxDeliveryRadius: parseFloat(e.target.value) || 0 
                  }))}
                  className="pr-16"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  miles
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Maximum distance for home delivery service
              </p>
            </div>

            {/* Delivery Fee */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Standard Delivery Fee
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </div>
                <Input
                  type="number"
                  step="0.01"
                  value={settings.deliveryFee}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    deliveryFee: parseFloat(e.target.value) || 0 
                  }))}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-gray-500">
                Standard fee charged for home delivery
              </p>
            </div>

            {/* Free Delivery Threshold */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Free Delivery Threshold
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </div>
                <Input
                  type="number"
                  step="0.01"
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    freeDeliveryThreshold: parseFloat(e.target.value) || 0 
                  }))}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-gray-500">
                Order amount required for free delivery
              </p>
            </div>

            {/* Estimated Delivery Days */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Estimated Delivery Time
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={settings.estimatedDeliveryDays}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    estimatedDeliveryDays: parseInt(e.target.value) || 1 
                  }))}
                  className="pr-20"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  days
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Average delivery time for home delivery
              </p>
            </div>
          </div>

          {/* Delivery Settings Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Current Delivery Settings Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivery Radius</p>
                  <p className="text-lg font-bold text-gray-900">{settings.maxDeliveryRadius} miles</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivery Fee</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(settings.deliveryFee)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Free Delivery</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(settings.freeDeliveryThreshold)}+</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivery Time</p>
                  <p className="text-lg font-bold text-gray-900">{settings.estimatedDeliveryDays} days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Zones Info */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Delivery Zones
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">Within Radius</Badge>
                  <span className="text-sm text-gray-600">0 - {settings.maxDeliveryRadius} miles</span>
                </div>
                <div className="text-sm text-gray-600">
                  {formatCurrency(settings.deliveryFee)} delivery fee
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Free Delivery</Badge>
                  <span className="text-sm text-gray-600">Orders over {formatCurrency(settings.freeDeliveryThreshold)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  No delivery fee
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Outside Radius</Badge>
                  <span className="text-sm text-gray-600">Over {settings.maxDeliveryRadius} miles</span>
                </div>
                <div className="text-sm text-gray-600">
                  Pickup only
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
