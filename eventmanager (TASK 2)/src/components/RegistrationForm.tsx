import React, { useState } from 'react';
import { User, Mail, Hash, CheckCircle, QrCode, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateQRCode } from '../utils/qrcode';
import { Event, Registration } from '../types';

interface RegistrationFormProps {
  event: Event;
  onBack: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ event, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [showQR, setShowQR] = useState(false);

  const generateRegistrationId = () => {
    return `REG${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setLoading(true);
    try {
      // Check if already registered
      const { data: existingReg } = await supabase
        .from('registrations')
        .select('*')
        .eq('event_id', event.id)
        .eq('email', formData.email.toLowerCase())
        .single();

      if (existingReg) {
        alert('You are already registered for this event!');
        setLoading(false);
        return;
      }

      const registrationId = generateRegistrationId();
      const qrData = JSON.stringify({
        registrationId,
        eventId: event.id,
        email: formData.email,
      });

      const qrCode = await generateQRCode(qrData);

      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            event_id: event.id,
            name: formData.name.trim(),
            email: formData.email.toLowerCase(),
            registration_id: registrationId,
            qr_code: qrCode,
          },
        ])
        .select('*')
        .single();

      if (error) throw error;

      setRegistration(data);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!registration?.qr_code) return;
    
    const link = document.createElement('a');
    link.href = registration.qr_code;
    link.download = `QR_${registration.registration_id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (registration && !showQR) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nice! You're Admitted
          </h2>
          
          <p className="text-gray-600 mb-2">
            Successfully registered for <strong>{event.name}</strong>
          </p>
          <p className="text-lg font-semibold text-blue-600 mb-8">
            Registration ID: {registration.registration_id}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => setShowQR(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <QrCode className="w-5 h-5" />
              <span>Get Your QR Code</span>
            </button>
            
            <button
              onClick={onBack}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Register for Another Event
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (registration && showQR) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your QR Code</h2>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <img
              src={registration.qr_code}
              alt="QR Code"
              className="w-64 h-64 mx-auto rounded-lg shadow-sm"
            />
          </div>
          
          <p className="text-gray-600 mb-2">
            <strong>Event:</strong> {event.name}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Name:</strong> {registration.name}
          </p>
          <p className="text-gray-600 mb-6">
            <strong>Registration ID:</strong> {registration.registration_id}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={downloadQR}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <Download className="w-5 h-5" />
              <span>Download QR Code</span>
            </button>
            
            <button
              onClick={() => setShowQR(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Back to Success Page
            </button>
            
            <button
              onClick={onBack}
              className="w-full text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Register for Another Event
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center"
      >
        ← Back to Events
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Register for Event</h2>
          <p className="text-blue-100 mt-1">{event.name}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Hash className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Registration ID</p>
                <p className="text-sm text-blue-700">
                  A unique registration ID will be automatically generated for you
                </p>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || !formData.name.trim() || !formData.email.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg"
          >
            {loading ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};