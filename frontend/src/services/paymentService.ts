export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account';
  name: string;
  lastFour: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  isDefault: boolean;
}

export interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: string;
  transactionId: string;
}

export interface AddPaymentMethodRequest {
  type: 'credit_card' | 'debit_card' | 'bank_account';
  cardNumber: string;
  expiryMonth?: number;
  expiryYear?: number;
  cvv?: string;
  name: string;
  bankName?: string;
  isDefault?: boolean;
}

// Mock data
const mockPaymentMethods: PaymentMethod[] = [
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
  }
];

const mockPaymentHistory: PaymentHistory[] = [
  {
    id: '1',
    date: '2024-01-15',
    amount: 150.00,
    description: 'Consultation with Dr. Sarah Johnson',
    status: 'completed',
    method: 'Visa Card ****4242',
    transactionId: 'TXN-001-2024'
  },
  {
    id: '2',
    date: '2024-01-10',
    amount: 75.50,
    description: 'Prescription medications',
    status: 'completed',
    method: 'Mastercard ****5555',
    transactionId: 'TXN-002-2024'
  },
  {
    id: '3',
    date: '2024-01-08',
    amount: 200.00,
    description: 'Lab test fees',
    status: 'pending',
    method: 'Chase Bank ****1234',
    transactionId: 'TXN-003-2024'
  },
  {
    id: '4',
    date: '2024-01-05',
    amount: 125.00,
    description: 'Video consultation with Dr. Michael Chen',
    status: 'refunded',
    method: 'Visa Card ****4242',
    transactionId: 'TXN-004-2024'
  },
  {
    id: '5',
    date: '2024-01-01',
    amount: 50.00,
    description: 'Prescription refill',
    status: 'failed',
    method: 'Mastercard ****5555',
    transactionId: 'TXN-005-2024'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const paymentService = {
  // Get all payment methods for the current user
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    await delay(500);
    return [...mockPaymentMethods];
  },

  // Add a new payment method
  async addPaymentMethod(data: AddPaymentMethodRequest): Promise<PaymentMethod> {
    await delay(1000);
    
    // Extract last 4 digits from card number
    const lastFour = data.cardNumber.replace(/\s/g, '').slice(-4);
    
    // If this is set as default, update other methods
    if (data.isDefault) {
      mockPaymentMethods.forEach(method => {
        method.isDefault = false;
      });
    }

    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: data.type,
      name: data.name,
      lastFour,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      bankName: data.bankName,
      isDefault: data.isDefault || mockPaymentMethods.length === 0
    };

    mockPaymentMethods.push(newPaymentMethod);
    return newPaymentMethod;
  },

  // Delete a payment method
  async deletePaymentMethod(id: string): Promise<void> {
    await delay(500);
    const index = mockPaymentMethods.findIndex(method => method.id === id);
    if (index > -1) {
      mockPaymentMethods.splice(index, 1);
    }
  },

  // Set a payment method as default
  async setAsDefault(id: string): Promise<void> {
    await delay(500);
    
    // Set all methods to not default
    mockPaymentMethods.forEach(method => {
      method.isDefault = false;
    });
    
    // Set the specified method as default
    const method = mockPaymentMethods.find(method => method.id === id);
    if (method) {
      method.isDefault = true;
    }
  },

  // Get payment history
  async getPaymentHistory(): Promise<PaymentHistory[]> {
    await delay(500);
    return [...mockPaymentHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  // Process a payment
  async processPayment(data: {
    amount: number;
    description: string;
    paymentMethodId: string;
  }): Promise<{
    success: boolean;
    transactionId?: string;
    error?: string;
  }> {
    await delay(2000);
    
    const paymentMethod = mockPaymentMethods.find(method => method.id === data.paymentMethodId);
    if (!paymentMethod) {
      return {
        success: false,
        error: 'Payment method not found'
      };
    }

    // Simulate payment processing (90% success rate)
    const success = Math.random() > 0.1;
    
    if (success) {
      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Add to payment history
      const newPayment: PaymentHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        amount: data.amount,
        description: data.description,
        status: 'completed',
        method: `${paymentMethod.type.replace('_', ' ').toUpperCase()} ****${paymentMethod.lastFour}`,
        transactionId
      };
      
      mockPaymentHistory.unshift(newPayment);
      
      return {
        success: true,
        transactionId
      };
    } else {
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
  },

  // Get payment statistics
  async getPaymentStats(): Promise<{
    totalSpent: number;
    monthlySpent: number;
    totalTransactions: number;
    successRate: number;
  }> {
    await delay(300);
    
    const completedPayments = mockPaymentHistory.filter(payment => payment.status === 'completed');
    const totalSpent = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyPayments = completedPayments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
    });
    const monthlySpent = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    const totalTransactions = mockPaymentHistory.length;
    const successRate = totalTransactions > 0 ? (completedPayments.length / totalTransactions) * 100 : 0;
    
    return {
      totalSpent,
      monthlySpent,
      totalTransactions,
      successRate: Math.round(successRate)
    };
  },

  // Validate card number (basic Luhn algorithm)
  validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d+$/.test(cleaned) || cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }
    
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
  },

  // Get card type from number
  getCardType(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (cleaned.startsWith('4')) {
      return 'Visa';
    } else if (cleaned.startsWith('5') || cleaned.startsWith('2')) {
      return 'Mastercard';
    } else if (cleaned.startsWith('3')) {
      return 'American Express';
    } else if (cleaned.startsWith('6')) {
      return 'Discover';
    } else {
      return 'Unknown';
    }
  }
};
