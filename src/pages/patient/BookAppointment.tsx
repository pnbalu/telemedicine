import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { ArrowLeft, Search, Calendar, CreditCard } from 'lucide-react';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: '15 years', rating: 4.8, fee: 100, image: '👩‍⚕️' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', experience: '12 years', rating: 4.9, fee: 90, image: '👨‍⚕️' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'General Physician', experience: '10 years', rating: 4.7, fee: 80, image: '👩‍⚕️' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Pediatrician', experience: '18 years', rating: 4.9, fee: 95, image: '👨‍⚕️' },
  ];

  const timeSlots = [
    { id: 1, date: '2025-10-15', time: '09:00 AM', available: true },
    { id: 2, date: '2025-10-15', time: '10:00 AM', available: true },
    { id: 3, date: '2025-10-15', time: '11:00 AM', available: false },
    { id: 4, date: '2025-10-15', time: '02:00 PM', available: true },
    { id: 5, date: '2025-10-16', time: '09:00 AM', available: true },
    { id: 6, date: '2025-10-16', time: '10:00 AM', available: true },
  ];

  const handleBooking = () => {
    navigate('/patient/dashboard');
  };

  const content = (
    <div className={isDesktop ? "p-8" : "p-6"}>
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="border-b border-gray-100">
          {!isDesktop && (
            <Button variant="ghost" size="sm" onClick={() => navigate('/patient/dashboard')} className="mb-4 -ml-2">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
            </Button>
          )}
          <h1 className="text-2xl font-bold">Book an Appointment</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span className="text-sm font-medium">Select Doctor</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span className="text-sm font-medium">Choose Slot</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Search doctors..." />
                </div>
                <Select>
                  <option>All Specialties</option>
                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                  <option>General Physician</option>
                  <option>Pediatrician</option>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className={`cursor-pointer transition ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-600' : ''}`} onClick={() => setSelectedDoctor(doctor)}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{doctor.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-sm text-gray-500">{doctor.experience} experience</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm">⭐ {doctor.rating}</span>
                            <span className="font-semibold text-blue-600">${doctor.fee}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!selectedDoctor} className="bg-blue-600 hover:bg-blue-700">
                  Next: Choose Slot
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Choose Time Slot */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Selected Doctor</p>
                <p className="font-semibold">{selectedDoctor?.name} - {selectedDoctor?.specialty}</p>
              </div>
              <h3 className="font-semibold">Available Time Slots</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot?.id === slot.id ? 'default' : 'outline'}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot)}
                    className="h-auto py-3 flex flex-col"
                  >
                    <span className="text-sm">{slot.date}</span>
                    <span className="font-semibold">{slot.time}</span>
                    {!slot.available && <span className="text-xs text-red-500">Booked</span>}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} disabled={!selectedSlot} className="bg-blue-600 hover:bg-blue-700">
                  Next: Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Booking Summary</h3>
                <p className="text-sm"><span className="text-gray-600">Doctor:</span> {selectedDoctor?.name}</p>
                <p className="text-sm"><span className="text-gray-600">Date & Time:</span> {selectedSlot?.date} at {selectedSlot?.time}</p>
                <p className="text-sm"><span className="text-gray-600">Consultation Fee:</span> ${selectedDoctor?.fee}</p>
                <p className="text-lg font-bold">Total: ${selectedDoctor?.fee}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment Details
                </h3>
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cardholder Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handleBooking} className="bg-green-600 hover:bg-green-700">
                  Confirm & Pay ${selectedDoctor?.fee}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-blue-700">TeleMedX</h1>
          </div>
        </header>
        {content}
      </div>
    );
  }

  return (
    <DesktopLayout role="patient" userName="John Doe" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Book Appointment' }]}>
      {content}
    </DesktopLayout>
  );
}
