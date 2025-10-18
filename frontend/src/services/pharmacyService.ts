export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  prescription: boolean;
  inStock: boolean;
  stockCount: number;
  category: string;
  manufacturer: string;
  image?: string;
  rating: number;
  reviews: number;
  dosage?: string;
  sideEffects?: string[];
  ingredients?: string[];
  expiryDate?: string;
}

export interface CartItem {
  id: string;
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
  prescription: boolean;
  dosage?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingId?: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
  paymentMethod: string;
  prescriptionRequired: boolean;
  prescriptionUploaded?: boolean;
}

export interface PharmacyFilters {
  category: string;
  prescriptionOnly: boolean;
  inStockOnly: boolean;
  priceRange: [number, number];
  rating: number;
}

// Mock data
const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Lisinopril 10mg',
    description: 'ACE inhibitor for high blood pressure management',
    price: 25.00,
    prescription: true,
    inStock: true,
    stockCount: 150,
    category: 'Cardiovascular',
    manufacturer: 'Generic Pharma',
    rating: 4.5,
    reviews: 234,
    dosage: '10mg',
    sideEffects: ['Dizziness', 'Dry cough', 'Fatigue'],
    ingredients: ['Lisinopril'],
    expiryDate: '2025-12-31'
  },
  {
    id: '2',
    name: 'Aspirin 81mg',
    description: 'Low-dose aspirin for heart health and pain relief',
    price: 15.00,
    prescription: false,
    inStock: true,
    stockCount: 300,
    category: 'Pain Relief',
    manufacturer: 'Bayer',
    rating: 4.2,
    reviews: 189,
    dosage: '81mg',
    sideEffects: ['Stomach irritation', 'Bleeding risk'],
    ingredients: ['Acetylsalicylic Acid'],
    expiryDate: '2026-06-30'
  },
  {
    id: '3',
    name: 'Vitamin C 1000mg',
    description: 'High-potency vitamin C supplement for immune support',
    price: 18.00,
    prescription: false,
    inStock: true,
    stockCount: 200,
    category: 'Supplements',
    manufacturer: 'Nature Made',
    rating: 4.7,
    reviews: 456,
    dosage: '1000mg',
    sideEffects: ['Nausea (high doses)', 'Diarrhea'],
    ingredients: ['Ascorbic Acid'],
    expiryDate: '2026-03-15'
  },
  {
    id: '4',
    name: 'Paracetamol 500mg',
    description: 'Pain reliever and fever reducer',
    price: 12.00,
    prescription: false,
    inStock: true,
    stockCount: 250,
    category: 'Pain Relief',
    manufacturer: 'Tylenol',
    rating: 4.3,
    reviews: 312,
    dosage: '500mg',
    sideEffects: ['Rare: Liver damage (overdose)'],
    ingredients: ['Acetaminophen'],
    expiryDate: '2025-11-20'
  },
  {
    id: '5',
    name: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain reliever',
    price: 14.00,
    prescription: false,
    inStock: true,
    stockCount: 180,
    category: 'Pain Relief',
    manufacturer: 'Advil',
    rating: 4.4,
    reviews: 278,
    dosage: '400mg',
    sideEffects: ['Stomach upset', 'Dizziness'],
    ingredients: ['Ibuprofen'],
    expiryDate: '2025-09-30'
  },
  {
    id: '6',
    name: 'Multivitamin Complete',
    description: 'Daily multivitamin with essential vitamins and minerals',
    price: 22.00,
    prescription: false,
    inStock: true,
    stockCount: 120,
    category: 'Supplements',
    manufacturer: 'Centrum',
    rating: 4.6,
    reviews: 189,
    dosage: '1 tablet daily',
    sideEffects: ['Nausea (on empty stomach)'],
    ingredients: ['Multiple vitamins and minerals'],
    expiryDate: '2026-01-15'
  },
  {
    id: '7',
    name: 'Omega-3 Fish Oil',
    description: 'High-quality fish oil for heart and brain health',
    price: 28.00,
    prescription: false,
    inStock: true,
    stockCount: 95,
    category: 'Supplements',
    manufacturer: 'Nordic Naturals',
    rating: 4.8,
    reviews: 423,
    dosage: '2 capsules daily',
    sideEffects: ['Fishy aftertaste', 'Burping'],
    ingredients: ['EPA', 'DHA'],
    expiryDate: '2026-04-10'
  },
  {
    id: '8',
    name: 'Calcium 600mg',
    description: 'Calcium supplement for bone health',
    price: 16.00,
    prescription: false,
    inStock: true,
    stockCount: 160,
    category: 'Supplements',
    manufacturer: 'Caltrate',
    rating: 4.1,
    reviews: 156,
    dosage: '600mg',
    sideEffects: ['Constipation', 'Gas'],
    ingredients: ['Calcium Carbonate'],
    expiryDate: '2025-08-25'
  },
  {
    id: '9',
    name: 'Atorvastatin 20mg',
    description: 'Statin medication for cholesterol management',
    price: 35.00,
    prescription: true,
    inStock: true,
    stockCount: 80,
    category: 'Cardiovascular',
    manufacturer: 'Lipitor',
    rating: 4.3,
    reviews: 198,
    dosage: '20mg',
    sideEffects: ['Muscle pain', 'Liver enzyme elevation'],
    ingredients: ['Atorvastatin'],
    expiryDate: '2025-10-15'
  },
  {
    id: '10',
    name: 'Metformin 500mg',
    description: 'Diabetes medication for blood sugar control',
    price: 20.00,
    prescription: true,
    inStock: true,
    stockCount: 110,
    category: 'Diabetes',
    manufacturer: 'Glucophage',
    rating: 4.0,
    reviews: 167,
    dosage: '500mg',
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
    ingredients: ['Metformin HCl'],
    expiryDate: '2025-12-05'
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    date: '2024-01-15',
    items: [
      { id: '1', medicineId: '1', name: 'Lisinopril 10mg', quantity: 30, price: 25.00, prescription: true, dosage: '10mg' },
      { id: '2', medicineId: '2', name: 'Aspirin 81mg', quantity: 30, price: 15.00, prescription: false, dosage: '81mg' }
    ],
    total: 40.00,
    status: 'delivered',
    trackingId: 'TRK123456',
    deliveryAddress: '123 Main St, City, State 12345',
    estimatedDelivery: '2024-01-17',
    paymentMethod: 'Visa Card ****4242',
    prescriptionRequired: true,
    prescriptionUploaded: true
  },
  {
    id: '2',
    date: '2024-01-10',
    items: [
      { id: '3', medicineId: '3', name: 'Vitamin C 1000mg', quantity: 60, price: 18.00, prescription: false, dosage: '1000mg' }
    ],
    total: 18.00,
    status: 'shipped',
    trackingId: 'TRK123457',
    deliveryAddress: '123 Main St, City, State 12345',
    estimatedDelivery: '2024-01-12',
    paymentMethod: 'Mastercard ****5555',
    prescriptionRequired: false
  },
  {
    id: '3',
    date: '2024-01-08',
    items: [
      { id: '4', medicineId: '4', name: 'Paracetamol 500mg', quantity: 100, price: 12.00, prescription: false, dosage: '500mg' },
      { id: '5', medicineId: '5', name: 'Ibuprofen 400mg', quantity: 50, price: 14.00, prescription: false, dosage: '400mg' }
    ],
    total: 26.00,
    status: 'processing',
    deliveryAddress: '123 Main St, City, State 12345',
    estimatedDelivery: '2024-01-10',
    paymentMethod: 'Chase Bank ****1234',
    prescriptionRequired: false
  },
  {
    id: '4',
    date: '2024-01-05',
    items: [
      { id: '6', medicineId: '6', name: 'Multivitamin Complete', quantity: 30, price: 22.00, prescription: false, dosage: '1 tablet daily' }
    ],
    total: 22.00,
    status: 'cancelled',
    deliveryAddress: '123 Main St, City, State 12345',
    paymentMethod: 'Visa Card ****4242',
    prescriptionRequired: false
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const pharmacyService = {
  // Get medicines with pagination, search, and filters
  async getMedicines(options: {
    page?: number;
    limit?: number;
    search?: string;
    filters?: Partial<PharmacyFilters>;
  } = {}): Promise<{ medicines: Medicine[]; total: number; totalPages: number }> {
    await delay(500);
    
    const { page = 1, limit = 6, search = '', filters = {} } = options;
    
    let filteredMedicines = [...mockMedicines];
    
    // Apply search filter
    if (search) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        medicine.name.toLowerCase().includes(search.toLowerCase()) ||
        medicine.description.toLowerCase().includes(search.toLowerCase()) ||
        medicine.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.category && filters.category !== 'all') {
      filteredMedicines = filteredMedicines.filter(medicine =>
        medicine.category === filters.category
      );
    }
    
    if (filters.prescriptionOnly) {
      filteredMedicines = filteredMedicines.filter(medicine => medicine.prescription);
    }
    
    if (filters.inStockOnly) {
      filteredMedicines = filteredMedicines.filter(medicine => medicine.inStock);
    }
    
    if (filters.priceRange) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        medicine.price >= filters.priceRange![0] && medicine.price <= filters.priceRange![1]
      );
    }
    
    if (filters.rating) {
      filteredMedicines = filteredMedicines.filter(medicine =>
        medicine.rating >= filters.rating!
      );
    }
    
    // Pagination
    const total = filteredMedicines.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const medicines = filteredMedicines.slice(startIndex, startIndex + limit);
    
    return { medicines, total, totalPages };
  },

  // Get medicine categories
  async getCategories(): Promise<string[]> {
    await delay(200);
    const categories = [...new Set(mockMedicines.map(medicine => medicine.category))];
    return ['all', ...categories];
  },

  // Get medicine by ID
  async getMedicineById(id: string): Promise<Medicine | null> {
    await delay(300);
    return mockMedicines.find(medicine => medicine.id === id) || null;
  },

  // Cart operations
  async addToCart(medicineId: string, quantity: number = 1): Promise<CartItem> {
    await delay(200);
    const medicine = mockMedicines.find(m => m.id === medicineId);
    if (!medicine) {
      throw new Error('Medicine not found');
    }
    
    return {
      id: Date.now().toString(),
      medicineId: medicine.id,
      name: medicine.name,
      quantity,
      price: medicine.price,
      prescription: medicine.prescription,
      dosage: medicine.dosage
    };
  },

  async removeFromCart(itemId: string): Promise<void> {
    await delay(200);
    // This would typically interact with a cart service
  },

  async updateCartItem(itemId: string, quantity: number): Promise<void> {
    await delay(200);
    // This would typically interact with a cart service
  },

  // Order operations
  async createOrder(items: CartItem[], deliveryAddress: string, paymentMethod: string): Promise<Order> {
    await delay(1000);
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const prescriptionRequired = items.some(item => item.prescription);
    
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      items,
      total,
      status: 'pending',
      deliveryAddress,
      paymentMethod,
      prescriptionRequired,
      prescriptionUploaded: prescriptionRequired ? false : undefined
    };
    
    mockOrders.unshift(newOrder);
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    await delay(500);
    return [...mockOrders].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },

  async cancelOrder(orderId: string, reason: string): Promise<void> {
    await delay(500);
    const order = mockOrders.find(o => o.id === orderId);
    if (order && ['pending', 'confirmed', 'processing'].includes(order.status)) {
      order.status = 'cancelled';
    }
  },

  // Utility functions
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  },

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '📦';
      case 'cancelled':
        return '❌';
      default:
        return '❓';
    }
  }
};
