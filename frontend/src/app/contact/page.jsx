'use client';
import React from 'react';

import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-100 text-[#1f1f1f]">
      

      {/* HERO SECTION */}
      <section
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('/contact-hero.jpg')`, // Your dark image
        }}
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
            Ready to make a difference together? Let’s start a conversation about how we can create
            positive change in your community.
          </p>
          <div className="flex justify-center gap-4 mt-6 text-white text-xl">
            <FaFacebookF className="hover:text-blue-400 transition" />
            <FaInstagram className="hover:text-pink-400 transition" />
            <FaTwitter className="hover:text-sky-400 transition" />
            <FaLinkedin className="hover:text-blue-500 transition" />
          </div>
        </div>
      </section>

      {/* CONNECT SECTION */}
      <section className="py-16 px-4 md:px-12 lg:px-20">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800"
          >
            Let’s Connect
          </motion.h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-3">
            Whether you're looking to volunteer, partner with us, or need our support, we’re here to help.
          </p>
        </div>

        {/* FORM & INFO */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-2xl rounded-xl p-8 w-full lg:w-1/2 border border-black"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Send us a message</h3>
            <p className="text-gray-500 mb-6">
              We’d love to hear from you. Fill out the form and we’ll get back to you shortly.
            </p>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-field border border-black shadow-md hover:shadow-lg transition duration-300 px-4 py-3 rounded-md focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field border border-black shadow-md hover:shadow-lg transition duration-300 px-4 py-3 rounded-md focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="input-field border border-black shadow-md hover:shadow-lg transition duration-300 px-4 py-3 w-full rounded-md focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Message"
                className="input-field resize-none border border-black shadow-md hover:shadow-lg transition duration-300 px-4 py-3 w-full rounded-md focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="bg-black text-white w-full py-3 rounded-lg shadow hover:bg-gray-800 transition"
              >
                Send Message
              </motion.button>
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
                <FaPhoneAlt />
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>contact@praveera.org</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>

            <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">Office Hours</h3>
              <p className="text-gray-600">Mon – Fri: <strong>9:00 AM – 6:00 PM</strong></p>
              <p className="text-gray-600">Saturday: <strong>10:00 AM – 4:00 PM</strong></p>
              <p className="text-gray-600">Sunday: <strong>Closed</strong></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 md:px-12 lg:px-20 mb-16"
      >
        <iframe
          title="NGO Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.695656095496!2d80.9346000752063!3d26.848902062141315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2b2d1896c33%3A0x4b8e165d06ea9786!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1689765112337!5m2!1sen!2sin"
          width="100%"
          height="400"
          loading="lazy"
          className="w-full rounded-xl shadow-xl border-none"
        ></iframe>
      </motion.div>

      
    </div>
  );
};

export default Contact;
