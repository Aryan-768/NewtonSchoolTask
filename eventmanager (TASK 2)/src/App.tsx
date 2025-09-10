import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { EventCard } from './components/EventCard';
import { RegistrationForm } from './components/RegistrationForm';
import { QRScanner } from './components/QRScanner';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import { Event } from './types';
import { QrCode, UserPlus, Scan, Shield } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'events' | 'register' | 'scan' | 'admin' | 'admin-dashboard'>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loading: authLoading, login, logout } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('register');
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setCurrentView('events');
  };

  const handleAdminLogin = async (email: string, password: string) => {
    await login(email, password);
    setCurrentView('admin-dashboard');
  };

  const handleAdminLogout = async () => {
    await logout();
    setCurrentView('events');
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Admin Dashboard View
  if (currentView === 'admin-dashboard' && isAuthenticated) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // Admin Login View
  if (currentView === 'admin') {
    return (
      <Layout>
        <AdminLogin onLogin={handleAdminLogin} />
      </Layout>
    );
  }

  // QR Scanner View
  if (currentView === 'scan') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => setCurrentView('events')}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← Back to Events
          </button>
          <QRScanner />
        </div>
      </Layout>
    );
  }

  // Registration Form View
  if (currentView === 'register' && selectedEvent) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RegistrationForm event={selectedEvent} onBack={handleBackToEvents} />
        </div>
      </Layout>
    );
  }

  // Main Events View
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventTracker
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive solution for event registration and attendance tracking. 
            Register for events, get your QR code, and mark attendance seamlessly.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button
              onClick={() => setCurrentView('scan')}
              className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Scan className="w-6 h-6" />
              <span>Scan QR Code</span>
            </button>
            
            <button
              onClick={() => setCurrentView('admin')}
              className="flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Shield className="w-6 h-6" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Events</h2>
              <p className="text-gray-600">Choose an event to register and get your QR code</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <UserPlus className="w-4 h-4 mr-2" />
              <span>{events.length} events available</span>
            </div>
          </div>
          
          {events.length === 0 ? (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h3>
              <p className="text-gray-600">Check back later for upcoming events.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={handleEventSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Registration</h3>
            <p className="text-gray-600">
              Register for events with just your name and email. Get instant confirmation and QR code.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">QR Code Generation</h3>
            <p className="text-gray-600">
              Unique QR codes for each registration. Download and save for quick attendance marking.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Attendance</h3>
            <p className="text-gray-600">
              Scan QR codes to mark attendance instantly. Real-time tracking with duplicate prevention.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;