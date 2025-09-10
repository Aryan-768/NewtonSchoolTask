import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  Download, 
  RefreshCw, 
  LogOut,
  BarChart3,
  Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { exportToExcel } from '../utils/excel';
import { AttendanceRecord, Registration, Attendance, Event } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalAttendance: 0,
    totalEvents: 0,
    attendanceRate: 0,
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscription for attendance
    const subscription = supabase
      .channel('admin-attendance')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'attendance' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      // Fetch events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch registrations with event data
      const { data: registrationsData } = await supabase
        .from('registrations')
        .select('*, events(*)')
        .order('created_at', { ascending: false });

      // Fetch attendance with registration data
      const { data: attendanceData } = await supabase
        .from('attendance')
        .select('*, registrations(*, events(*))')
        .order('attended_at', { ascending: false });

      setEvents(eventsData || []);
      setRegistrations(registrationsData || []);
      setAttendance(attendanceData || []);

      // Calculate stats
      const totalRegs = registrationsData?.length || 0;
      const totalAtt = attendanceData?.length || 0;
      const totalEvt = eventsData?.length || 0;
      const rate = totalRegs > 0 ? Math.round((totalAtt / totalRegs) * 100) : 0;

      setStats({
        totalRegistrations: totalRegs,
        totalAttendance: totalAtt,
        totalEvents: totalEvt,
        attendanceRate: rate,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = (): AttendanceRecord[] => {
    let filteredRegs = registrations;
    
    if (selectedEvent !== 'all') {
      filteredRegs = registrations.filter(reg => reg.event_id === selectedEvent);
    }

    return filteredRegs.map(reg => {
      const hasAttended = attendance.find(att => att.registration_id === reg.registration_id);
      
      return {
        name: reg.name,
        email: reg.email,
        registration_id: reg.registration_id,
        status: hasAttended ? 'Present' : 'Absent',
        timestamp: hasAttended?.attended_at || undefined,
        event_name: reg.event?.name,
      };
    });
  };

  const handleExport = () => {
    const data = getFilteredData();
    const eventName = selectedEvent === 'all' 
      ? 'All Events' 
      : events.find(e => e.id === selectedEvent)?.name || 'Event';
    
    exportToExcel(data, `attendance-report-${eventName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Live Attendance Tracking</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRegistrations}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Attendance</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalAttendance}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.attendanceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Event
                  </label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Events</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchData}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
                
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Excel</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Recent Attendance ({attendance.slice(0, 5).length} of {attendance.length})
            </h3>
            
            {attendance.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No attendance recorded yet</p>
            ) : (
              <div className="space-y-3">
                {attendance.slice(0, 5).map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{att.registration?.name}</p>
                        <p className="text-sm text-gray-600">{att.registration?.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {att.registration?.event?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(att.attended_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Attendance Records ({filteredData.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration ID
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{record.name}</p>
                        <p className="text-sm text-gray-500">{record.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{record.event_name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-gray-600">
                        {record.registration_id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'Present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">
                        {record.timestamp ? formatDateTime(record.timestamp) : 'Not attended'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No registrations found for the selected event</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};