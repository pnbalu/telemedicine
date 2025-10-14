import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { ArrowLeft, ShoppingCart, Search, Trash2, Package, Pill } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Pharmacy() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Lisinopril 10mg', quantity: 30, price: 25, prescription: true },
    { id: 2, name: 'Aspirin 81mg', quantity: 30, price: 15, prescription: false },
  ]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const availableMedicines = [
    { id: 3, name: 'Vitamin C 1000mg', price: 18, prescription: false, inStock: true },
    { id: 4, name: 'Paracetamol 500mg', price: 12, prescription: false, inStock: true },
    { id: 5, name: 'Ibuprofen 400mg', price: 14, prescription: false, inStock: true },
    { id: 6, name: 'Multivitamin', price: 22, prescription: false, inStock: true },
    { id: 7, name: 'Omega-3 Fish Oil', price: 28, prescription: false, inStock: true },
    { id: 8, name: 'Calcium 600mg', price: 16, prescription: false, inStock: true },
  ];

  const orders = [
    { id: 1, date: '2025-10-03', items: 3, total: 75, status: 'Delivered', trackingId: 'TRK123456' },
    { id: 2, date: '2025-09-25', items: 2, total: 40, status: 'In Transit', trackingId: 'TRK123455' },
    { id: 3, date: '2025-09-10', items: 4, total: 95, status: 'Delivered', trackingId: 'TRK123454' },
  ];

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity / 30), 0);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input placeholder="Search medicines..." className="pl-10" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Medicines */}
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-xl font-semibold">Available Medicines</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableMedicines.map((medicine) => (
                  <div key={medicine.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Pill className="w-4 h-4 text-rose-600" />
                          <h3 className="font-semibold">{medicine.name}</h3>
                        </div>
                        <p className="text-lg font-bold text-blue-600 mt-1">${medicine.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {medicine.prescription && (
                            <Badge variant="warning" className="text-xs">Rx Required</Badge>
                          )}
                          <Badge variant={medicine.inStock ? 'success' : 'destructive'} className="text-xs">
                            {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order History
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-500">{order.items} items • ${order.total}</p>
                        <p className="text-xs text-gray-400 mt-1">Tracking: {order.trackingId}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === 'Delivered' ? 'success' : 'secondary'}>
                          {order.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="mt-2">
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shopping Cart Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-md bg-white sticky top-24">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Shopping Cart
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.prescription && (
                            <Badge variant="warning" className="text-xs mt-1">Rx</Badge>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-20 h-8 text-sm"
                              min="1"
                            />
                            <span className="text-sm text-gray-600">tablets</span>
                          </div>
                          <p className="text-sm font-semibold mt-2 text-blue-600">
                            ${(item.price * item.quantity / 30).toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${(cartTotal + 5).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/patient/prescriptions')}>
                    View Prescriptions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-rose-700">TeleMedX</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Pharmacy' }]}>
      {content}
    </DesktopLayout>
  );
}
