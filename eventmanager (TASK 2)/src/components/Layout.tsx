import React from 'react';
import { Calendar, Users, QrCode } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EventTracker</h1>
                <p className="text-sm text-gray-500">Registration & Attendance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <QrCode className="w-4 h-4" />
              <span>Smart Event Management</span>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};