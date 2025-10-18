import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Search, 
  Trash2, 
  Package, 
  Pill,
  Plus,
  Minus,
  Star,
  Filter,
  X,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  Eye,
  Upload,
  Download
} from 'lucide-react';
import { pharmacyService, Medicine, CartItem, Order } from '@/services/pharmacyService';
import CheckoutModal from '@/components/CheckoutModal';

export default function Pharmacy() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState<'medicines' | 'orders' | 'cancel'>('medicines');

  // State for medicines
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [prescriptionOnly, setPrescriptionOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);

  // State for cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // State for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadMedicines();
    loadCategories();
    loadOrders();
  }, [currentPage, searchTerm, selectedCategory, prescriptionOnly]);

  const loadMedicines = async () => {
    setLoading(true);
    try {
      const result = await pharmacyService.getMedicines({
        page: currentPage,
        limit: 6,
        search: searchTerm,
        filters: {
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          prescriptionOnly,
          inStockOnly: false
        }
      });
      setMedicines(result.medicines);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to load medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await pharmacyService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const orderList = await pharmacyService.getOrders();
      setOrders(orderList);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const addToCart = async (medicine: Medicine) => {
    try {
      const cartItem = await pharmacyService.addToCart(medicine.id, 1);
      setCartItems(prev => {
        const existing = prev.find(item => item.medicineId === medicine.id);
        if (existing) {
          return prev.map(item =>
            item.medicineId === medicine.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, cartItem];
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) return;
    setShowCheckoutModal(true);
  };

  const handleOrderPlaced = (orderId: string) => {
    setCartItems([]);
    setShowCheckoutModal(false);
    setActiveTab('orders');
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder || !cancelReason.trim()) return;

    try {
      await pharmacyService.cancelOrder(selectedOrder.id, cancelReason);
      await loadOrders();
      setShowCancelModal(false);
      setSelectedOrder(null);
      setCancelReason('');
      alert('Order cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="w-10"
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  };

  const renderCancelModal = () => {
    if (!showCancelModal || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cancel Order</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowCancelModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Order #{selectedOrder.id}</p>
                <p className="font-semibold">Total: {pharmacyService.formatCurrency(selectedOrder.total)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for cancellation
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please provide a reason for cancelling this order..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowCancelModal(false)}>
                Keep Order
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleCancelOrder}
                disabled={!cancelReason.trim()}
              >
                Cancel Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const content = (
    <div className={isDesktop ? "p-8" : "p-6"}>
      {!isDesktop && (
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')}>
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">{cartItems.length} items</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-rose-600" />
            Pharmacy & Medicine Delivery
          </h1>
          <p className="text-gray-600 mt-1">Order medicines and track your deliveries</p>
        </div>
        {isDesktop && (
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">{cartItems.length} items in cart</span>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'medicines'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Medicines
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('cancel')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cancel'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cancel Orders
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Content - 3 columns */}
        <div className="lg:col-span-3">
          {activeTab === 'medicines' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="Search medicines..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="prescriptionOnly"
                    checked={prescriptionOnly}
                    onChange={(e) => setPrescriptionOnly(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="prescriptionOnly" className="text-sm text-gray-600">
                    Prescription Only
                  </label>
                </div>
              </div>

              {/* Medicines Grid */}
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {medicines.map((medicine) => (
                      <Card key={medicine.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Pill className="w-5 h-5 text-rose-600" />
                                <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                              <p className="text-lg font-bold text-blue-600 mb-2">
                                {pharmacyService.formatCurrency(medicine.price)}
                              </p>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600">{medicine.rating}</span>
                                  <span className="text-sm text-gray-500">({medicine.reviews})</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {medicine.prescription && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    Rx Required
                                  </Badge>
                                )}
                                <Badge className={medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} className="text-xs">
                                  {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500">
                                {medicine.manufacturer} • {medicine.category}
                              </p>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => addToCart(medicine)}
                            disabled={!medicine.inStock}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {renderPagination()}
                </>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell className="font-semibold">{pharmacyService.formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <Badge className={pharmacyService.getStatusColor(order.status)}>
                          <span className="mr-1">{pharmacyService.getStatusIcon(order.status)}</span>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.trackingId ? (
                          <span className="text-sm text-gray-600 font-mono">{order.trackingId}</span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {['pending', 'confirmed', 'processing'].includes(order.status) && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowCancelModal(true);
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 'cancel' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Use the "Order History" tab to cancel orders</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Cart */}
        {activeTab === 'medicines' && (
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white sticky top-6">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart ({cartItems.length})
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="p-4 max-h-96 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">{pharmacyService.formatCurrency(item.price)} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 w-8 h-8 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">Total:</span>
                        <span className="text-lg font-bold text-blue-600">{pharmacyService.formatCurrency(cartTotal)}</span>
                      </div>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={proceedToCheckout}
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {renderCancelModal()}
      
      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')}>
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-semibold">{cartItems.length} items</span>
              </div>
            </div>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard', path: '/patient/dashboard' }, { label: 'Pharmacy' }]}>
      {content}
    </DesktopLayout>
  );
}
