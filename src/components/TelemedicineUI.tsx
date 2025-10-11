import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Stethoscope, Video, ShoppingCart, FileText, User } from "lucide-react";

export default function TelemedicineUI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 space-y-6">
      <header className="flex justify-between items-center bg-white rounded-2xl shadow p-4">
        <h1 className="text-2xl font-bold text-blue-700">TeleMedX</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost"><User className="w-5 h-5" /> Profile</Button>
          <Button variant="outline">Logout</Button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2 text-blue-600">
            <CalendarDays className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Book Appointment</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Choose a doctor, select your preferred slot, and confirm online payment.</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Now</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2 text-green-600">
            <Video className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Join Video Consultation</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Start your secure teleconsultation with your doctor via WebRTC.</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">Join Call</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2 text-purple-600">
            <FileText className="w-6 h-6" />
            <h2 className="text-lg font-semibold">My Prescriptions</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">View and manage your e-prescriptions directly from your dashboard.</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">View e-Rx</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2 text-rose-600">
            <ShoppingCart className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Medicine Delivery</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Add prescribed items to your cart and track delivery status in real time.</p>
            <Button className="w-full bg-rose-600 hover:bg-rose-700">Open Pharmacy</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2 text-teal-600">
            <Stethoscope className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Doctor Dashboard</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Access your patient appointments, write prescriptions, and follow up.</p>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Go to Dashboard</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center gap-2 text-yellow-600">
            <User className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Admin Console</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Manage users, analyze data, and edit platform content securely.</p>
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Open Console</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

