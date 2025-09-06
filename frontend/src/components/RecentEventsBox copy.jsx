'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Clock,
  Heart,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  MapPin,
} from 'lucide-react';

export default function RecentEventsBox() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchRecentEvents();
  }, []);

  const fetchRecentEvents = async () => {
  try {
    const res = await axios.get('http://localhost:5000/events/all'); // ✅ FIXED
    const sorted = res.data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
    setEvents(sorted);
  } catch (err) {
    console.error('Failed to load recent events:', err);
  }


  };

  const formatTimeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black">
        <Clock className="text-gray-600" /> Recent Events
      </h2>

      {events.map((event, index) => (
        <div
          key={event._id}
          className={`rounded-md p-3 mb-3 flex items-center justify-between transition-all transform cursor-pointer hover:scale-[1.015] hover:shadow-md ${
            index % 3 === 0
              ? 'bg-green-100'
              : index % 3 === 1
              ? 'bg-blue-100'
              : 'bg-yellow-100'
          }`}
        >
          {/* Left: Event Info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {index % 3 === 0 ? (
                <Heart className="text-green-600" />
              ) : index % 3 === 1 ? (
                <CheckCircle2 className="text-blue-600" />
              ) : (
                <AlertTriangle className="text-yellow-600" />
              )}
              <span className="text-sm text-black font-medium">{event.name}</span>
            </div>

            <div className="ml-6 text-xs text-gray-700 flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {event.date} · {formatTimeAgo(event.createdAt)}
            </div>

            {event.location && (
              <div className="ml-6 text-xs text-gray-700 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" />
                {event.location}
              </div>
            )}
          </div>

          {/* Right: Amount */}
          <div className="bg-white text-green-600 font-semibold text-sm px-3 py-1 rounded-full shadow border border-green-300 whitespace-nowrap">
            ₹{event.targetAmount.toLocaleString()}
          </div>
        </div>
      ))}

      {events.length === 0 && (
        <p className="text-sm text-gray-500 text-center">No recent events</p>
      )}
    </div>
  );
}
