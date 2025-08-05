'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { toast } from 'react-hot-toast';
import { FaHeart, FaBook, FaStethoscope, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Aarti Sharma',
    title: 'Beneficiary',
    feedback: 'Thanks to your donations, my children can now go to school without worrying about food or supplies.',
  },
  {
    name: 'Vikram Joshi',
    title: 'Volunteer',
    feedback: 'Volunteering here has changed my life. Every donation truly makes an impact.',
  },
  {
    name: 'Sneha Patel',
    title: 'Donor',
    feedback: 'I trust this organization to use my contributions wisely and transparently.',
  },
];

const DonationPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pan: '',
    cause: '',
    amount: '',
  });

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const payNow = () => {
    const { name, email, phone, amount } = form;
    if (!name || !email || !phone || !amount) {
      return toast.error('Please fill in all required fields');
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: parseInt(amount) * 100,
      currency: 'INR',
      name: 'Praveera Foundation',
      description: 'Donation Payment',
      handler: () => setShowThankYou(true),
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        address: form.address,
        pan: form.pan,
        cause: form.cause,
      },
      theme: {
        color: '#2F855A',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 text-center">
        <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-green-700 mt-4"
        >
          🎉 Congratulations!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 mt-3 max-w-md"
        >
          Your kind donation has been successfully received. Together, we make the world better!
        </motion.p>
        <button
          className="mt-6 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          onClick={() => {
            setShowThankYou(false);
            setForm({
              name: '',
              email: '',
              phone: '',
              address: '',
              pan: '',
              cause: '',
              amount: '',
            });
          }}
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 to-white px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="NGO Logo" width={80} height={80} />
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800">Make a Donation</h2>
            <p className="text-center text-sm text-gray-500 mb-6">100% of your donation goes to the cause.</p>

            <div className="grid grid-cols-1 gap-4">
              <input className="border border-black px-4 py-2 rounded placeholder-black text-black" placeholder="Full Name" name="name" value={form.name} onChange={handleInput} />
              <input className="border border-black px-4 py-2 rounded placeholder-black text-black" placeholder="Email" name="email" value={form.email} onChange={handleInput} />
              <input className="border border-black px-4 py-2 rounded placeholder-black text-black" placeholder="Phone" name="phone" value={form.phone} onChange={handleInput} />
              <input className="border border-black px-4 py-2 rounded placeholder-black text-black" placeholder="Address" name="address" value={form.address} onChange={handleInput} />
              <input className="border border-black px-4 py-2 rounded placeholder-black text-black" placeholder="PAN Number" name="pan" value={form.pan} onChange={handleInput} />
              <select className="border border-black px-4 py-2 rounded text-black" name="cause" value={form.cause} onChange={handleInput}>
                <option value="">Select Cause</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Disaster Relief">Disaster Relief</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                {[{ val: 100, label: 'One Day Meal' }, { val: 500, label: '10 Books' }, { val: 1000, label: 'Health Checkup' }, { val: 2000, label: 'Family Kit' }].map(({ val, label }) => (
                  <div
                    key={val}
                    onClick={() => setForm({ ...form, amount: val.toString() })}
                    className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      form.amount === val.toString() ? 'border-green-700 bg-green-100' : 'border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-2xl font-bold text-green-800 mb-2">₹{val}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Enter Amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleInput}
                  className="w-full mt-2 border border-black px-4 py-2 rounded shadow placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button className="bg-green-700 text-white py-2 rounded mt-4 hover:bg-green-800" onClick={payNow}>
                Donate Now
              </button>
              <p className="text-center text-xs text-gray-500 mt-1">Secure payments via Razorpay</p>
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-green-900 mb-2">“Every rupee lights up a life.”</h2>
              <p className="text-gray-700 text-lg">Support underprivileged communities with love, health, and education.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-100 p-4 rounded shadow"
            >
              <p className="italic text-gray-700">"{testimonials[testimonialIndex].feedback}"</p>
              <p className="mt-2 text-green-900 font-semibold">{testimonials[testimonialIndex].name}</p>
              <p className="text-sm text-gray-600">{testimonials[testimonialIndex].title}</p>
            </motion.div>

            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">Your Impact:</h3>
              <div className="grid grid-cols-2 gap-4 text-black">
                <div className="flex items-center gap-2"><FaBook className="text-green-600" /> ₹500 = 10 books</div>
                <div className="flex items-center gap-2"><FaStethoscope className="text-green-600" /> ₹1000 = 1 health checkup</div>
                <div className="flex items-center gap-2"><FaUtensils className="text-green-600" /> ₹200 = 5 meals</div>
                <div className="flex items-center gap-2"><FaHeart className="text-green-600" /> ₹2000 = 1 family kit</div>
              </div>

              <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="text-right"
>
  <a
    href="/contact"
    className="inline-block mt-6 px-5 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition duration-300"
  >
    📞 Contact Us
  </a>

  {/* Embedded Video Section */}
  <div className="mt-6">
    <textarea name="Our " id=""></textarea>
    <video
      src="/vid.mp4" // make sure this video is in public/video/
      autoPlay
      loop
      muted
      playsInline
      controls
      className="w-full max-w-full mx-auto rounded-lg shadow-lg border border-green-600"
      
    />
  </div>
</motion.div>

            </div>
          </div>
        </div>
      </main>

    
    </>
  );
};

export default DonationPage;
