import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';
import { 
  Search, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock,
  DollarSign,
  Zap,
  Brain,
  Video,
  Star,
  TrendingDown
} from 'lucide-react';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState<'ai_agent' | 'live_doctor' | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const consultationOptions = [
    {
      id: 'ai_agent',
      type: 'ai_agent' as const,
      title: 'AI Health Assistant',
      description: 'Quick consultation with AI for initial assessment',
      features: [
        'Instant availability',
        'Symptom analysis',
        'Medical history collection',
        'Prescription review',
        'Doctor follow-up if needed'
      ],
      price: 15,
      duration: '5-10 minutes',
      icon: Brain,
      popular: true
    },
    {
      id: 'live_doctor',
      type: 'live_doctor' as const,
      title: 'Live Video with Doctor',
      description: 'Direct consultation with a licensed physician',
      features: [
        'Live video consultation',
        'Prescription issuance',
        'Detailed diagnosis',
        'Treatment planning',
        'Medical records'
      ],
      price: 75,
      duration: '30 minutes',
      icon: Video,
      popular: false
    }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: '15 years', rating: 4.8, fee: 75, image: '👩‍⚕️', available: true },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', experience: '12 years', rating: 4.9, fee: 75, image: '👨‍⚕️', available: true },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'General Physician', experience: '10 years', rating: 4.7, fee: 75, image: '👩‍⚕️', available: false },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Pediatrician', experience: '18 years', rating: 4.9, fee: 75, image: '👨‍⚕️', available: true },
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
    const roomName = `consultation-${Date.now()}`;
    
    if (consultationType === 'ai_agent') {
      // Start AI agent consultation
      navigate(`/ai-agent-consultation?room=${roomName}&patientName=John Doe`);
    } else {
      // Start live doctor consultation
      navigate(`/video-call?room=${roomName}&name=John Doe&role=patient`);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Consultation Type</h2>
        <p className="text-gray-600">Select the option that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consultationOptions.map((option) => (
          <Card
            key={option.type}
            className={`cursor-pointer transition-all hover:shadow-xl ${
              consultationType === option.type
                ? 'ring-2 ring-blue-600 shadow-lg'
                : 'hover:ring-2 hover:ring-gray-300'
            } ${option.recommended ? 'border-2 border-green-500' : ''}`}
            onClick={() => setConsultationType(option.type)}
          >
            <CardContent className="p-6">
              {option.recommended && (
                <Badge className="bg-green-500 text-white mb-3">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  {option.type === 'ai_agent' ? (
                    <Brain className="w-7 h-7 text-white" />
                  ) : (
                    <Video className="w-7 h-7 text-white" />
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span className="text-3xl font-bold text-gray-900">{option.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">per session</p>
                  {option.type === 'ai_agent' && (
                    <Badge variant="secondary" className="mt-2">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      80% savings
                    </Badge>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Wait Time:</span>
                  <span>{option.waitTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {consultationType === option.type && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium text-center">
                    ✓ Selected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button
          onClick={() => setStep(2)}
          disabled={!consultationType}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8"
          size="lg"
        >
          Continue
          {consultationType && (
            <span className="ml-2">
              (${consultationOptions.find(o => o.type === consultationType)?.price})
            </span>
          )}
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (consultationType === 'ai_agent') {
      return (
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Health Assistant Ready</h3>
                <p className="text-gray-700 mb-3">
                  Our AI assistant will ask you questions about your symptoms and health. 
                  This typically takes 5-10 minutes. A doctor will review everything and respond within 2 hours.
                </p>
                <div className="flex gap-2">
                  <Badge variant="success">Instant Start</Badge>
                  <Badge variant="secondary">$15 Only</Badge>
                  <Badge variant="outline">Doctor Review Included</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              size="lg"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      );
    }

    // Live doctor consultation
    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Select Doctor & Time Slot</h3>
              <p className="text-gray-700">
                Choose your preferred doctor and appointment time
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Available Doctors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className={`cursor-pointer transition ${
                  selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-600' : ''
                } ${!doctor.available ? 'opacity-50' : ''}`}
                onClick={() => doctor.available && setSelectedDoctor(doctor)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{doctor.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">{doctor.experience}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">⭐ {doctor.rating}</span>
                        <Badge variant={doctor.available ? 'success' : 'secondary'}>
                          {doctor.available ? 'Available' : 'Busy'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedDoctor && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Select Time Slot</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedSlot(slot)}
                  disabled={!slot.available}
                  className={`p-4 rounded-lg border-2 transition ${
                    selectedSlot?.id === slot.id
                      ? 'border-blue-600 bg-blue-50'
                      : slot.available
                      ? 'border-gray-200 hover:border-blue-300'
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{slot.time}</p>
                  <p className="text-sm text-gray-600">{slot.date}</p>
                  {!slot.available && (
                    <Badge variant="secondary" className="mt-2 text-xs">Booked</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button
            onClick={() => setStep(3)}
            disabled={!selectedDoctor || !selectedSlot}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            size="lg"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const selectedOption = consultationOptions.find(o => o.type === consultationType);
    const totalCost = consultationType === 'ai_agent' ? 15 : (selectedDoctor?.fee || 75);

    return (
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Consultation Type:</span>
              <span className="font-semibold text-gray-900">{selectedOption?.name}</span>
            </div>

            {consultationType === 'live_doctor' && selectedDoctor && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-700">Doctor:</span>
                  <span className="font-semibold text-gray-900">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Date & Time:</span>
                  <span className="font-semibold text-gray-900">
                    {selectedSlot?.date} at {selectedSlot?.time}
                  </span>
                </div>
              </>
            )}

            {consultationType === 'ai_agent' && (
              <div className="flex justify-between">
                <span className="text-gray-700">Availability:</span>
                <Badge variant="success">
                  <Zap className="w-3 h-3 mr-1" />
                  Start Immediately
                </Badge>
              </div>
            )}

            <div className="pt-3 border-t border-green-200 flex justify-between">
              <span className="text-lg font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-green-600">${totalCost}</span>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader className="border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Payment Method</h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-blue-600">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-semibold">•••• •••• •••• 1234</p>
                  <p className="text-sm text-gray-600">Expires 12/2026</p>
                </div>
              </div>
              <Badge variant="success">Default</Badge>
            </div>

            <Button variant="outline" className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Use Different Payment Method
            </Button>
          </CardContent>
        </Card>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">100% Satisfaction Guaranteed</p>
              <p className="text-blue-800">
                If you're not satisfied with your consultation, we'll refund you fully within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button
            onClick={handleBooking}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            size="lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm & Start Consultation (${totalCost})
          </Button>
        </div>
      </div>
    );
  };

  return (
    <DesktopLayout 
      role="patient" 
      userName="John Doe" 
      breadcrumbs={[
        { label: 'Dashboard', href: '/patient/dashboard' },
        { label: 'Book Appointment' }
      ]}
    >
      <div className="p-8 max-w-5xl mx-auto">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Book Consultation</h1>
            
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mt-6">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-sm font-medium hidden md:inline">Consultation Type</span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-sm font-medium hidden md:inline">
                  {consultationType === 'ai_agent' ? 'Confirmation' : 'Select Doctor'}
                </span>
              </div>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
              
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-sm font-medium hidden md:inline">Payment</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}
