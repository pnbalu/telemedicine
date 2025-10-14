import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { ArrowLeft, FileText, Download, ShoppingCart, Pill } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Prescriptions() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prescriptions = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-10-05',
      diagnosis: 'Hypertension',
      medications: [
        { name: 'Lisinopril 10mg', dosage: '1 tablet daily', duration: '30 days', price: 25 },
        { name: 'Aspirin 81mg', dosage: '1 tablet daily', duration: '30 days', price: 15 },
        { name: 'Atorvastatin 20mg', dosage: '1 tablet at night', duration: '30 days', price: 35 },
      ],
      notes: 'Take medications with food. Monitor blood pressure daily.',
    },
    {
      id: 2,
      doctor: 'Dr. Emily Davis',
      specialty: 'General Physician',
      date: '2025-09-28',
      diagnosis: 'Common Cold',
      medications: [
        { name: 'Acetaminophen 500mg', dosage: 'As needed for fever', duration: '7 days', price: 12 },
        { name: 'Vitamin C 1000mg', dosage: '1 tablet daily', duration: '14 days', price: 18 },
      ],
      notes: 'Rest and stay hydrated. Symptoms should improve in 7-10 days.',
    },
  ];

  const addToCart = (prescription: any) => {
    alert(`Added ${prescription.medications.length} medications to cart`);
  };

  const content = (
    <div className={isDesktop ? "p-8 space-y-6" : "p-6 space-y-6"}>
      {!isDesktop && (
        <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')} className="-ml-2">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </Button>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="w-8 h-8 text-purple-600" />
          My Prescriptions
        </h1>
        <Button variant="outline" onClick={() => navigate('/patient/pharmacy')}>
          <ShoppingCart className="w-5 h-5 mr-2" /> Go to Pharmacy
        </Button>
      </div>

      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{prescription.doctor}</h2>
                  <p className="text-sm text-gray-600">{prescription.specialty}</p>
                  <p className="text-sm text-gray-500">Prescribed on: {prescription.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-700" onClick={() => addToCart(prescription)}>
                    <ShoppingCart className="w-4 h-4 mr-1" /> Add All to Cart
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Diagnosis</p>
                  <p className="text-sm">{prescription.diagnosis}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Medications</h3>
                  <div className="space-y-3">
                    {prescription.medications.map((med, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Pill className="w-4 h-4 text-purple-600" />
                              <h4 className="font-semibold">{med.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                            <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">${med.price}</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Doctor's Notes</p>
                  <p className="text-sm">{prescription.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-purple-700">TeleMedX</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Prescriptions' }]}>
      {content}
    </DesktopLayout>
  );
}
