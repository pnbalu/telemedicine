import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, FileText, Video, BookOpen, HelpCircle, ChevronRight, ExternalLink, User, Calendar, Pill, CreditCard, Settings, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DesktopLayout from '@/components/layout/DesktopLayout';

export default function HelpSupport() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'account', label: 'Account & Profile', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'medical-records', label: 'Medical Records', icon: FileText },
    { id: 'payments', label: 'Payments & Billing', icon: CreditCard },
    { id: 'technical', label: 'Technical Support', icon: Settings },
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'To update your profile information, go to Settings from the user menu in the top right corner, then click on "Profile Settings" to edit your personal details.',
      tags: ['profile', 'account', 'settings']
    },
    {
      id: 2,
      category: 'appointments',
      question: 'How do I book an appointment?',
      answer: 'Navigate to "Book Appointment" from the sidebar or dashboard. Select your preferred doctor, choose a date and time, and confirm your appointment. You\'ll receive a confirmation email.',
      tags: ['appointment', 'booking', 'doctor']
    },
    {
      id: 3,
      category: 'prescriptions',
      question: 'How do I request a prescription refill?',
      answer: 'Go to the "Prescriptions" page from the sidebar. Find your medication and click "Request Refill". Your doctor will review and approve the request.',
      tags: ['prescription', 'refill', 'medication']
    },
    {
      id: 4,
      category: 'medical-records',
      question: 'How can I access my medical records?',
      answer: 'Your medical records are available in the "Medical Records" section. You can view lab results, consultation notes, and medical history organized by date and category.',
      tags: ['records', 'medical', 'history']
    },
    {
      id: 5,
      category: 'payments',
      question: 'How do I add a payment method?',
      answer: 'Go to the "Payments" page from the sidebar or dashboard. Click "Add Payment Method" and enter your card details securely. All payments are encrypted and secure.',
      tags: ['payment', 'billing', 'card']
    },
    {
      id: 6,
      category: 'technical',
      question: 'The app is running slowly. What should I do?',
      answer: 'Try refreshing the page, clearing your browser cache, or restarting your browser. If the issue persists, contact our technical support team.',
      tags: ['slow', 'performance', 'browser']
    },
    {
      id: 7,
      category: 'appointments',
      question: 'Can I reschedule my appointment?',
      answer: 'Yes, you can reschedule appointments up to 24 hours in advance. Go to your appointments and click "Reschedule" next to the appointment you want to change.',
      tags: ['reschedule', 'appointment', 'change']
    },
    {
      id: 8,
      category: 'technical',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page. Enter your email address and follow the instructions in the email to reset your password.',
      tags: ['password', 'reset', 'login']
    }
  ];

  const contactMethods = [
    {
      title: 'AI Support',
      description: 'Get instant help from our AI assistant',
      icon: Brain,
      action: 'Start AI Chat',
      available: 'Available 24/7',
      color: 'text-indigo-600'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageCircle,
      action: 'Start Chat',
      available: 'Available 24/7',
      color: 'text-green-600'
    },
    {
      title: 'Phone Support',
      description: 'Call our dedicated support line',
      icon: Phone,
      action: 'Call Now',
      available: 'Mon-Fri 8AM-8PM',
      color: 'text-blue-600'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      action: 'Send Email',
      available: 'Response within 24 hours',
      color: 'text-purple-600'
    },
    {
      title: 'Video Call',
      description: 'Schedule a video consultation',
      icon: Video,
      action: 'Schedule Call',
      available: 'By appointment',
      color: 'text-orange-600'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesCategory;
  });

  const handleContactAction = (method: string) => {
    switch (method) {
      case 'aisupport':
        navigate('/ai-agent-consultation');
        break;
      case 'chat':
        alert('Live chat feature will be implemented soon!');
        break;
      case 'phone':
        window.open('tel:+1-800-TELEMED');
        break;
      case 'email':
        window.open('mailto:support@telemedicine.com');
        break;
      case 'video':
        alert('Video consultation scheduling will be implemented soon!');
        break;
    }
  };

  return (
    <DesktopLayout 
      role="patient" 
      userName="John Doe" 
      breadcrumbs={[
        { label: 'Dashboard', path: '/patient/dashboard' }, 
        { label: 'Help & Support' }
      ]}
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 mt-1">Get help with using the telemedicine platform</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'hover:bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contact Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Contact Support</CardTitle>
            <p className="text-gray-600">Choose your preferred way to get in touch with our support team</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const isAI = method.title === 'AI Support';
                return (
                  <div key={index} className={`border rounded-lg p-3 hover:shadow-md transition-shadow ${
                    isAI ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-6 h-6 ${method.color}`} />
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      {isAI && (
                        <Badge className="ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
                          AI
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{method.available}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const methodKey = method.title.toLowerCase()
                            .replace('ai support', 'aisupport')
                            .replace('live chat', 'chat')
                            .replace('phone support', 'phone')
                            .replace('email support', 'email')
                            .replace('video call', 'video');
                          handleContactAction(methodKey);
                        }}
                        className="text-xs"
                      >
                        {method.action}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            <p className="text-gray-600">
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
            </p>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length > 0 ? (
              <div className="space-y-3">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-1">{faq.question}</h3>
                    <p className="text-gray-600 text-sm mb-2">{faq.answer}</p>
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No questions found in this category.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4"
                >
                  View All Questions
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Links</CardTitle>
            <p className="text-gray-600">Common tasks and helpful resources</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">User Guide</h4>
                  <p className="text-sm text-gray-600">Complete platform guide</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </div>
              <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Privacy Policy</h4>
                  <p className="text-sm text-gray-600">How we protect your data</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </div>
              <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">System Status</h4>
                  <p className="text-sm text-gray-600">Check platform status</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DesktopLayout>
  );
}
