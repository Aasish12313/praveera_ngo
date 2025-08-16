'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VolunteerFormModal = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      area: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/volunteers/add`, values);
        toast.success('🎉 Thank you for volunteering!');
        resetForm();
        onClose();
      } catch (err) {
        console.error(err);
        toast.error('❌ Submission failed. Please try again.');
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="volunteer-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-xl w-[90%] max-w-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Title in pink */}
              <h2 className="text-2xl text-pink-600 font-bold mb-4 text-center">
                Become a Volunteer
              </h2>

              {/* Form */}
              <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <input
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border text-black rounded-md"
                  required
                />
                <input
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border text-black rounded-md"
                  required
                />
                <input
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 text-black border rounded-md"
                  required
                />
                <textarea
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  placeholder="Why do you want to volunteer?"
                  className="w-full p-3 text-black border rounded-md"
                  rows={3}
                  required
                />
                <select
                  name="area"
                  onChange={formik.handleChange}
                  value={formik.values.area}
                  className="w-full p-3 border text-black rounded-md"
                  required
                >
                  <option value="">Preferred Area of Work</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Women Empowerment</option>
                  <option>Event Management</option>
                </select>

                {/* Submit Button in pink */}
                <button
                  type="submit"
                  className="bg-pink-600 w-full text-white py-2 rounded-md hover:bg-pink-700 transition"
                >
                  Submit
                </button>
              </form>

              {/* Close Button in pink */}
              <button
                onClick={onClose}
                className="absolute top-2 right-4 text-pink-600 hover:text-pink-800 text-2xl"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VolunteerFormModal;
