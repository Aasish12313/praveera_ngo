'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, CheckCircle, CalendarPlus, Pencil, X } from 'lucide-react';

export default function AdminEventPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: '', date: '', targetAmount: '', location: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/events/all');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post('http://localhost:5000/events/add', form);
      setEvents([res.data, ...events]);
      setForm({ name: '', date: '', targetAmount: '', location: '' });
    } catch (err) {
      console.error('Failed to add event:', err);
    }
  };

  const handleEdit = (event) => {
    setForm({
      name: event.name,
      date: event.date?.substring(0, 10),
      targetAmount: event.targetAmount,
      location: event.location || '',
    });
    setEditingId(event._id);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/events/${editingId}`, form);
      setEvents(events.map((e) => (e._id === editingId ? res.data : e)));
      setIsModalOpen(false);
      setEditingId(null);
      setForm({ name: '', date: '', targetAmount: '', location: '' });
    } catch (err) {
      console.error('Failed to update event:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/events/${id}/complete`);
      setEvents(events.map((e) => (e._id === id ? res.data : e)));
    } catch (err) {
      console.error('Failed to update event:', err);
    }
  };

  return (
    <div className="p-8 bg-[#f8f9fc] min-h-screen relative">
      {/* Add Event Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
          <CalendarPlus className="text-blue-600" /> Add New Event
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="input input-bordered w-full text-black"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input input-bordered w-full text-black"
          />
          <input
            type="number"
            name="targetAmount"
            value={form.targetAmount}
            onChange={handleChange}
            placeholder="Target Amount"
            className="input input-bordered w-full text-black"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="input input-bordered w-full text-black"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-black">{event.name}</h3>
              <p className="text-gray-600">📍 Location: {event.location || 'N/A'}</p>
              <p className="text-gray-600">📅 {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600">🎯 Target: ₹{event.targetAmount}</p>
              <p className="text-sm mt-1 text-green-600">
                {event.isCompleted ? '✅ Completed' : '⏳ Ongoing'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => toggleCompleted(event._id)}
                className={`p-2 rounded-full text-white ${
                  event.isCompleted ? 'bg-gray-600' : 'bg-green-600'
                }`}
              >
                <CheckCircle size={18} />
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="p-2 rounded-full bg-red-600 text-white"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-center text-gray-500">No events found.</p>}
      </div>

      {/* Edit Modal with Dimmed Background */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-30 backdrop-blur-sm z-30"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold mb-4 text-black">Edit Event</h3>
              <div className="grid gap-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Event Name"
                  className="input input-bordered w-full text-black"
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="input input-bordered w-full text-black"
                />
                <input
                  type="number"
                  name="targetAmount"
                  value={form.targetAmount}
                  onChange={handleChange}
                  placeholder="Target Amount"
                  className="input input-bordered w-full text-black"
                />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="input input-bordered w-full text-black"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Update Event
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
