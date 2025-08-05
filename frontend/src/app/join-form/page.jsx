'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function JobFormPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'Team Member';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', {
      role,
      ...formData,
    });
    alert('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-white pt-28 px-4 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-pink-600 text-center mb-10">
        Apply for: {role}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white border-2 border-black rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-black placeholder-black"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-black placeholder-black"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-black placeholder-black"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Resume Upload */}
        <div className="mb-5">
          <label className="block text-gray-800 font-medium mb-1">Upload Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-pink-600 file:text-white hover:file:bg-pink-700 transition text-black placeholder-black"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-1">Why do you want to join?</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition text-black placeholder-black"
            placeholder="Share your thoughts..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
