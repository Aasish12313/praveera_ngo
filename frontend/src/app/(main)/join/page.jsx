'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const jobs = [
  'Intern',
  'Social Media Manager',
  'Fundraising Partner',
  'Field Coordinator',
  'Program Lead',
];

export default function JoinUsPage() {
  const [openFormIndex, setOpenFormIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null,
  });
  const [loading, setLoading] = useState(false);

  const handleToggleForm = (index) => {
    setOpenFormIndex(openFormIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('message', formData.message);
      data.append('position', role);
      if (formData.resume) {
        data.append('resume', formData.resume);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/applications/add`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.status === 200) {
        toast.success(`Application for ${role} submitted successfully!`);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          resume: null,
        });
        setOpenFormIndex(null);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-28 px-4 pb-12">
      <ToastContainer />
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Join Our Team
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Job Title */}
            <button
              onClick={() => handleToggleForm(index)}
              className="w-full px-6 py-5 text-left text-xl md:text-2xl font-semibold text-pink-600 flex justify-between items-center hover:bg-pink-50 transition"
            >
              {job}
              <motion.span
                animate={{ rotate: openFormIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </button>

            {/* Collapsible Form */}
            <AnimatePresence>
              {openFormIndex === index && (
                <motion.form
                  key="form"
                  onSubmit={(e) => handleSubmit(e, job)}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="px-6 py-6 border-t border-gray-200 bg-gray-50"
                >
                  {/* Input Fields */}
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                    { label: 'Email', name: 'email', type: 'email', placeholder: 'email@example.com' },
                    { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 1234567890' },
                  ].map((field) => (
                    <motion.div
                      key={field.name}
                      className="relative z-0 w-full mb-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer block w-full px-3 pt-5 pb-2 text-black bg-transparent border-b-2 border-gray-300 focus:border-pink-600 focus:outline-none text-md transition-colors"
                      />
                      <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-md peer-focus:top-2 peer-focus:text-pink-600 peer-focus:text-sm">
                        {field.label}
                      </label>
                    </motion.div>
                  ))}

                  {/* Resume Upload */}
                  <motion.div
                    className="mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block mb-2 text-gray-600 font-medium">Upload Resume</label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700 transition"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    className="mb-5 relative z-0 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer block w-full px-3 pt-5 pb-2 text-black bg-transparent border-b-2 border-gray-300 focus:border-pink-600 focus:outline-none text-md transition-colors"
                      required
                    />
                    <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-md peer-focus:top-2 peer-focus:text-pink-600 peer-focus:text-sm">
                      Why do you want to join?
                    </label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(219, 39, 119,0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all disabled:opacity-60"
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
