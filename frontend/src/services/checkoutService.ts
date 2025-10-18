export interface PaymentOption {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'cash_on_delivery';
  name: string;
  lastFour?: string;
  isDefault: boolean;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
}

export interface DeliveryAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface DeliverySettings {
  maxDeliveryRadius: number; // in miles
  deliveryFee: number;
  freeDeliveryThreshold: number;
  estimatedDeliveryDays: number;
}

export interface CheckoutData {
  items: any[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentOption;
  deliveryType: 'home_delivery' | 'pickup' | 'in_person_collection';
  specialInstructions?: string;
  prescriptionRequired: boolean;
}

// Mock data
const mockPaymentOptions: PaymentOption[] = [
  {
    id: '1',
    type: 'credit_card',
    name: 'Visa Card',
    lastFour: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'debit_card',
    name: 'Mastercard',
    lastFour: '5555',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false
  },
  {
    id: '3',
    type: 'bank_account',
    name: 'Checking Account',
    lastFour: '1234',
    bankName: 'Chase Bank',
    isDefault: false
  },
  {
    id: '4',
    type: 'cash_on_delivery',
    name: 'Cash on Delivery',
    isDefault: false
  }
];

const mockDeliveryAddresses: DeliveryAddress[] = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 123-4567',
    isDefault: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: '456 Oak Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    phone: '+1 (555) 987-6543',
    isDefault: false
  }
];

const mockDeliverySettings: DeliverySettings = {
  maxDeliveryRadius: 25,
  deliveryFee: 5.00,
  freeDeliveryThreshold: 50.00,
  estimatedDeliveryDays: 2
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const checkoutService = {
  // Get available payment options
  async getPaymentOptions(): Promise<PaymentOption[]> {
    await delay(300);
    return [...mockPaymentOptions];
  },

  // Get delivery addresses
  async getDeliveryAddresses(): Promise<DeliveryAddress[]> {
    await delay(300);
    return [...mockDeliveryAddresses];
  },

  // Add new delivery address
  async addDeliveryAddress(address: Omit<DeliveryAddress, 'id'>): Promise<DeliveryAddress> {
    await delay(500);
    
    const newAddress: DeliveryAddress = {
      id: Date.now().toString(),
      ...address
    };
    
    mockDeliveryAddresses.push(newAddress);
    return newAddress;
  },

  // Get delivery settings
  async getDeliverySettings(): Promise<DeliverySettings> {
    await delay(200);
    return { ...mockDeliverySettings };
  },

  // Check if address is within delivery radius
  async checkDeliveryRadius(address: DeliveryAddress): Promise<{
    isWithinRadius: boolean;
    distance: number;
    deliveryFee: number;
  }> {
    await delay(400);
    
    // Mock distance calculation (in real app, this would use geolocation API)
    const mockDistance = Math.random() * 30; // Random distance between 0-30 miles
    const settings = await this.getDeliverySettings();
    
    const isWithinRadius = mockDistance <= settings.maxDeliveryRadius;
    const deliveryFee = isWithinRadius ? settings.deliveryFee : 0;
    
    return {
      isWithinRadius,
      distance: mockDistance,
      deliveryFee
    };
  },

  // Place order
  async placeOrder(checkoutData: CheckoutData): Promise<{
    success: boolean;
    orderId?: string;
    estimatedDelivery?: string;
    error?: string;
  }> {
    await delay(2000);
    
    try {
      // Validate checkout data
      if (!checkoutData.items || checkoutData.items.length === 0) {
        return { success: false, error: 'No items in cart' };
      }
      
      if (!checkoutData.deliveryAddress) {
        return { success: false, error: 'Delivery address is required' };
      }
      
      if (!checkoutData.paymentMethod) {
        return { success: false, error: 'Payment method is required' };
      }
      
      // Check delivery radius
      const radiusCheck = await this.checkDeliveryRadius(checkoutData.deliveryAddress);
      if (!radiusCheck.isWithinRadius && checkoutData.deliveryType === 'home_delivery') {
        return { 
          success: false, 
          error: `Address is outside our delivery radius (${mockDeliverySettings.maxDeliveryRadius} miles)` 
        };
      }
      
      // Simulate payment processing
      const paymentSuccess = Math.random() > 0.1; // 90% success rate
      if (!paymentSuccess) {
        return { success: false, error: 'Payment processing failed' };
      }
      
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Calculate estimated delivery
      const settings = await this.getDeliverySettings();
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + settings.estimatedDeliveryDays);
      const estimatedDelivery = deliveryDate.toISOString().split('T')[0];
      
      return {
        success: true,
        orderId,
        estimatedDelivery
      };
      
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  // Calculate order total with delivery fees
  async calculateOrderTotal(items: any[], deliveryType: string, address?: DeliveryAddress): Promise<{
    subtotal: number;
    deliveryFee: number;
    total: number;
    freeDeliveryEligible: boolean;
  }> {
    await delay(200);
    
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const settings = await this.getDeliverySettings();
    
    let deliveryFee = 0;
    let freeDeliveryEligible = false;
    
    if (deliveryType === 'home_delivery' && address) {
      const radiusCheck = await this.checkDeliveryRadius(address);
      if (radiusCheck.isWithinRadius) {
        deliveryFee = radiusCheck.deliveryFee;
        freeDeliveryEligible = subtotal >= settings.freeDeliveryThreshold;
        
        if (freeDeliveryEligible) {
          deliveryFee = 0;
        }
      }
    }
    // For pickup and in_person_collection, no delivery fee
    else if (deliveryType === 'pickup' || deliveryType === 'in_person_collection') {
      deliveryFee = 0;
    }
    
    const total = subtotal + deliveryFee;
    
    return {
      subtotal,
      deliveryFee,
      total,
      freeDeliveryEligible
    };
  },

  // Format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  // Get payment method display name
  getPaymentMethodDisplayName(payment: PaymentOption): string {
    switch (payment.type) {
      case 'credit_card':
        return `Visa Card ****${payment.lastFour}`;
      case 'debit_card':
        return `Mastercard ****${payment.lastFour}`;
      case 'bank_account':
        return `${payment.bankName} ****${payment.lastFour}`;
      case 'cash_on_delivery':
        return 'Cash on Delivery';
      default:
        return payment.name;
    }
  },

  // Validate delivery address
  validateAddress(address: Partial<DeliveryAddress>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (!address.name || address.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (!address.address || address.address.trim().length === 0) {
      errors.push('Address is required');
    }
    
    if (!address.city || address.city.trim().length === 0) {
      errors.push('City is required');
    }
    
    if (!address.state || address.state.trim().length === 0) {
      errors.push('State is required');
    }
    
    if (!address.zipCode || address.zipCode.trim().length === 0) {
      errors.push('ZIP code is required');
    }
    
    if (!address.phone || address.phone.trim().length === 0) {
      errors.push('Phone number is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

// Export delivery settings for admin configuration
export const DeliverySettings = mockDeliverySettings;
