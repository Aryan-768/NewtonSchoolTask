import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
         onClick={() => onSelect(event)}>
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              Click to register
            </div>
            <div className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
              Register Now →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};