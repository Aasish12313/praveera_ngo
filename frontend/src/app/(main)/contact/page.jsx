'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedin,
  FaPhoneAlt, FaMapMarkerAlt, FaEnvelope,
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus(`❌ ${data.message || 'Something went wrong'}`);
      }
    } catch (err) {
      setStatus('❌ Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-[#1f1f1f]">
      {/* HERO SECTION */}
      <section
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url('/contact-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Get in Touch
          </motion.h1>
          <p className="mt-4 text-lg max-w-xl mx-auto text-gray-200">
            Ready to make a difference together? Let’s start a conversation.
          </p>
        </div>
      </section>

      {/* FORM & INFO */}
      <section className="py-16 px-4 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl rounded-xl p-8 w-full lg:w-1/2 border border-black"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="border border-black px-4 py-3 rounded-md w-full"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  required
                  className="border border-black px-4 py-3 rounded-md w-full"
                />
              </div>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                required
                className="border border-black px-4 py-3 w-full rounded-md"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message"
                required
                className="border border-black px-4 py-3 w-full rounded-md resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                disabled={loading}
                className="bg-black text-white w-full py-3 rounded-lg shadow hover:bg-gray-800 transition"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
              {status && <p className="mt-2 text-center">{status}</p>}
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[40%] space-y-6"
          >
            <div className="rounded-xl p-6 text-white bg-gradient-to-br from-blue-500 to-orange-400 shadow-md space-y-4">
              <h3 className="text-lg font-semibold">Get in touch</h3>
              <div className="flex items-center gap-3">
                <FaPhoneAlt /> <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope /> <span>contact@praveera.org</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt /> <span>Lucknow, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
