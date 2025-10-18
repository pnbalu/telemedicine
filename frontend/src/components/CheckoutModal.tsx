import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Truck, 
  Home, 
  Store, 
  Plus,
  Check,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { checkoutService, PaymentOption, DeliveryAddress, CheckoutData } from '@/services/checkoutService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onOrderPlaced: (orderId: string) => void;
}

export default function CheckoutModal({ isOpen, onClose, items, onOrderPlaced }: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1: Address
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<DeliveryAddress>>({});
  
  // Step 2: Delivery Type
  const [deliveryType, setDeliveryType] = useState<'home_delivery' | 'pickup' | 'in_person_collection'>('home_delivery');
  const [deliverySettings, setDeliverySettings] = useState<any>(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isWithinRadius, setIsWithinRadius] = useState(true);
  
  // Step 3: Payment
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>('');
  
  // Step 4: Review
  const [orderTotal, setOrderTotal] = useState({ subtotal: 0, deliveryFee: 0, total: 0 });
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  const steps = [
    { id: 1, title: 'Address', icon: MapPin },
    { id: 2, title: 'Delivery', icon: Truck },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Review', icon: Check }
  ];

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedAddressId && deliveryType) {
      calculateDeliveryFee();
    }
  }, [selectedAddressId, deliveryType]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [addressesData, paymentData, settingsData] = await Promise.all([
        checkoutService.getDeliveryAddresses(),
        checkoutService.getPaymentOptions(),
        checkoutService.getDeliverySettings()
      ]);
      
      setAddresses(addressesData);
      setPaymentOptions(paymentData);
      setDeliverySettings(settingsData);
      
      // Set defaults
      const defaultAddress = addressesData.find(addr => addr.isDefault);
      const defaultPayment = paymentData.find(pay => pay.isDefault);
      
      if (defaultAddress) setSelectedAddressId(defaultAddress.id);
      if (defaultPayment) setSelectedPaymentId(defaultPayment.id);
      
    } catch (error) {
      console.error('Failed to load checkout data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDeliveryFee = async () => {
    if (!selectedAddressId || (deliveryType !== 'home_delivery')) {
      setDeliveryFee(0);
      setIsWithinRadius(true);
      return;
    }

    const address = addresses.find(addr => addr.id === selectedAddressId);
    if (!address) return;

    try {
      const result = await checkoutService.calculateOrderTotal(items, deliveryType, address);
      setOrderTotal(result);
      setDeliveryFee(result.deliveryFee);
      setIsWithinRadius(true);
    } catch (error) {
      console.error('Failed to calculate delivery fee:', error);
    }
  };

  const handleAddNewAddress = async () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.phone) {
      alert('Please fill in all address fields');
      return;
    }

    try {
      const address = await checkoutService.addDeliveryAddress(newAddress as DeliveryAddress);
      setAddresses(prev => [...prev, address]);
      setSelectedAddressId(address.id);
      setShowNewAddressForm(false);
      setNewAddress({});
    } catch (error) {
      console.error('Failed to add address:', error);
      alert('Failed to add address. Please try again.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId || !selectedPaymentId) {
      alert('Please complete all required fields');
      return;
    }

    setLoading(true);
    try {
      const address = addresses.find(addr => addr.id === selectedAddressId);
      const payment = paymentOptions.find(pay => pay.id === selectedPaymentId);
      
      if (!address || !payment) {
        alert('Selected address or payment method not found');
        return;
      }

      const checkoutData: CheckoutData = {
        items,
        deliveryAddress: address,
        paymentMethod: payment,
        deliveryType,
        specialInstructions,
        prescriptionRequired: items.some(item => item.prescription)
      };

      const result = await checkoutService.placeOrder(checkoutData);
      
      if (result.success) {
        onOrderPlaced(result.orderId!);
        onClose();
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
      } else {
        alert(`Failed to place order: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
  const selectedPayment = paymentOptions.find(pay => pay.id === selectedPaymentId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive ? 'border-blue-600 bg-blue-600 text-white' :
                    isCompleted ? 'border-green-600 bg-green-600 text-white' :
                    'border-gray-300 bg-white text-gray-500'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && (
            <>
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Select Delivery Address</h3>
                  
                  <div className="grid gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAddressId === address.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{address.name}</h4>
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                            <p className="text-gray-600">{address.phone}</p>
                          </div>
                          {selectedAddressId === address.id && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>

                  {showNewAddressForm && (
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-4">New Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <Input
                              value={newAddress.name || ''}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <Input
                              value={newAddress.phone || ''}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="Phone number"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <Input
                              value={newAddress.address || ''}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                              placeholder="Street address"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <Input
                              value={newAddress.city || ''}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                              placeholder="City"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <Input
                              value={newAddress.state || ''}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                              placeholder="State"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                            <Input
                              value={newAddress.zipCode || ''}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                              placeholder="ZIP code"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <Button variant="outline" onClick={() => setShowNewAddressForm(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddNewAddress}>
                            Add Address
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 2: Delivery Type */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Delivery Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                        deliveryType === 'home_delivery'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setDeliveryType('home_delivery')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Home className="w-6 h-6 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">Home Delivery</h4>
                            <p className="text-sm text-gray-600">Delivered to your address</p>
                          </div>
                        </div>
                        {deliveryType === 'home_delivery' && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      {deliveryType === 'home_delivery' && deliverySettings && (
                        <div className="mt-4 p-3 bg-white rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span>Delivery Fee:</span>
                            <span className="font-semibold">{checkoutService.formatCurrency(deliveryFee)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span>Estimated Delivery:</span>
                            <span>{deliverySettings.estimatedDeliveryDays} days</span>
                          </div>
                          {deliverySettings.freeDeliveryThreshold > 0 && (
                            <div className="text-xs text-gray-600 mt-2">
                              Free delivery on orders over {checkoutService.formatCurrency(deliverySettings.freeDeliveryThreshold)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                        deliveryType === 'pickup'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setDeliveryType('pickup')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Store className="w-6 h-6 text-green-600" />
                          <div>
                            <h4 className="font-semibold">Pharmacy Pickup</h4>
                            <p className="text-sm text-gray-600">Pick up from pharmacy</p>
                          </div>
                        </div>
                        {deliveryType === 'pickup' && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      {deliveryType === 'pickup' && (
                        <div className="mt-4 p-3 bg-white rounded-lg">
                          <div className="text-sm text-green-600 font-medium">No delivery fee</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Available for pickup within 2-4 hours
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                        deliveryType === 'in_person_collection'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setDeliveryType('in_person_collection')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Truck className="w-6 h-6 text-purple-600" />
                          <div>
                            <h4 className="font-semibold">In-Person Collection</h4>
                            <p className="text-sm text-gray-600">Collect at pharmacy counter</p>
                          </div>
                        </div>
                        {deliveryType === 'in_person_collection' && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      {deliveryType === 'in_person_collection' && (
                        <div className="mt-4 p-3 bg-white rounded-lg">
                          <div className="text-sm text-purple-600 font-medium">No delivery fee</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Immediate collection with ID verification
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Payment Method</h3>
                  
                  <div className="grid gap-4">
                    {paymentOptions.map((payment) => (
                      <div
                        key={payment.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPaymentId === payment.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPaymentId(payment.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-gray-600" />
                            <div>
                              <h4 className="font-semibold">{payment.name}</h4>
                              <p className="text-sm text-gray-600">
                                {checkoutService.getPaymentMethodDisplayName(payment)}
                              </p>
                            </div>
                          </div>
                          {selectedPaymentId === payment.id && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Review Your Order</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Items</h4>
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x{item.quantity}</span>
                              <span>{checkoutService.formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Address</h4>
                        {selectedAddress && (
                          <div className="text-sm text-gray-600">
                            <p>{selectedAddress.name}</p>
                            <p>{selectedAddress.address}</p>
                            <p>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}</p>
                            <p>{selectedAddress.phone}</p>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Method</h4>
                        <div className="flex items-center gap-2 text-sm">
                          {deliveryType === 'home_delivery' ? (
                            <><Home className="w-4 h-4" /> <span>Home Delivery</span></>
                          ) : deliveryType === 'pickup' ? (
                            <><Store className="w-4 h-4" /> <span>Pharmacy Pickup</span></>
                          ) : (
                            <><Truck className="w-4 h-4" /> <span>In-Person Collection</span></>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Payment Method</h4>
                        {selectedPayment && (
                          <p className="text-sm text-gray-600">
                            {checkoutService.getPaymentMethodDisplayName(selectedPayment)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Order Summary</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{checkoutService.formatCurrency(orderTotal.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee:</span>
                          <span>{checkoutService.formatCurrency(orderTotal.deliveryFee)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>{checkoutService.formatCurrency(orderTotal.total)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Instructions (Optional)
                        </label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          placeholder="Any special delivery instructions..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
                >
                  {currentStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                
                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!selectedAddressId || (currentStep === 2 && deliveryType === 'home_delivery' && !isWithinRadius)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading || !selectedAddressId || !selectedPaymentId}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
