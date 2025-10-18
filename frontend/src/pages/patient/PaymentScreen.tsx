import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Plus, 
  CreditCard, 
  Trash2, 
  Star, 
  Calendar, 
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account';
  name: string;
  lastFour: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  isDefault: boolean;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: string;
  transactionId: string;
}

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

export default function PaymentScreen() {
  const [activeTab, setActiveTab] = useState<'methods' | 'history'>('methods');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>(mockPaymentHistory);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState<{[key: string]: boolean}>({});
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'refunded':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCardNumber = (lastFour: string, showFull: boolean = false) => {
    if (showFull) {
      return `**** **** **** ${lastFour}`;
    }
    return `****${lastFour}`;
  };

  const toggleCardDetails = (id: string) => {
    setShowCardDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const deletePaymentMethod = (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
    }
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const totalSpent = paymentHistory
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const content = (
    <div className={isDesktop ? "p-8" : "p-6"}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
        <p className="text-gray-600">Manage your payment methods and view transaction history</p>
      </div>

      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Spent</p>
                <p className="text-2xl font-bold text-blue-900">${totalSpent.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Payment Methods</p>
                <p className="text-2xl font-bold text-green-900">{paymentMethods.length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">This Month</p>
                <p className="text-2xl font-bold text-purple-900">
                  ${paymentHistory
                    .filter(payment => {
                      const paymentDate = new Date(payment.date);
                      const currentDate = new Date();
                      return paymentDate.getMonth() === currentDate.getMonth() && 
                             paymentDate.getFullYear() === currentDate.getFullYear() &&
                             payment.status === 'completed';
                    })
                    .reduce((sum, payment) => sum + payment.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="border-0 shadow-lg bg-white mb-6">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('methods')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'methods'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Payment Methods
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Payment History
              </button>
            </div>
            {activeTab === 'methods' && (
              <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {activeTab === 'methods' ? (
            <div className="space-y-6">
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{method.name}</h3>
                              {method.isDefault && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {method.type === 'bank_account' 
                                ? `${method.bankName} ••••${method.lastFour}`
                                : `${method.type.replace('_', ' ').toUpperCase()} ••••${method.lastFour}`
                              }
                            </p>
                            {method.expiryMonth && method.expiryYear && (
                              <p className="text-sm text-gray-500">
                                Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCardDetails(method.id)}
                          >
                            {showCardDetails[method.id] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          
                          {!method.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDefaultPaymentMethod(method.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePaymentMethod(method.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {showCardDetails[method.id] && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Card Number:</p>
                              <p className="font-mono">{formatCardNumber(method.lastFour, true)}</p>
                            </div>
                            {method.expiryMonth && method.expiryYear && (
                              <div>
                                <p className="text-gray-600">Expiry Date:</p>
                                <p className="font-mono">
                                  {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-gray-600">Type:</p>
                              <p className="capitalize">{method.type.replace('_', ' ')}</p>
                            </div>
                            {method.bankName && (
                              <div>
                                <p className="text-gray-600">Bank:</p>
                                <p>{method.bankName}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {paymentMethods.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No payment methods added yet</p>
                  <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Payment Method
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(payment.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell className="font-semibold">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{payment.method}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(payment.status)}
                            {payment.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 font-mono">{payment.transactionId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {paymentHistory.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No payment history available</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Payment Method</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_account">Bank Account</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <Input placeholder="123" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <Input placeholder="John Doe" />
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="default" className="rounded" />
                  <label htmlFor="default" className="text-sm text-gray-600">
                    Set as default payment method
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-700">Payments</h1>
            {activeTab === 'methods' && (
              <Button onClick={() => setShowAddModal(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            )}
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard', path: '/patient/dashboard' }, { label: 'Payments' }]}>
      {content}
    </DesktopLayout>
  );
}
