'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Page = () => {
  return (
    <div className="bg-[#fefdfc] text-[#1f1f1f]">
      <Navbar />
{/* ayush */}
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 via-white to-green-100 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-pink-700 mb-6 leading-tight">
              Empowering Lives, Building Hope
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Praveera Foundation is committed to transforming communities through education, healthcare, and social empowerment.
            </p>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
              Join Us
            </button>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
            <Image
              src="/img1.jpg"
              alt="Hero Logo"
              width={500}
              height={400}
              className="rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To uplift marginalized communities by offering education, healthcare access, and sustainable livelihood opportunities. We believe in community-driven solutions and long-term change.
          </p>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="py-16 px-6 md:px-20 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            ['Dream Shala', 'img2.png'],
            ['Fellowship Program', 'img3.png'],
            ['Red Relief', 'img4.png'],
            ['Zinda Van', 'img5.png'],
            ['Women Empowerment', 'img6.png'],
            ['Youth Skilling', 'img7.png'],
          ].map(([title, image], idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md transition p-4"
            >
              <Image
                src={`/${image}`}
                alt={title}
                width={400}
                height={200}
                className="rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-pink-700">{title}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Learn how we’re creating impact through {title.toLowerCase()}.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {[
            ['10,000+', 'Children Educated'],
            ['5,000+', 'Women Empowered'],
            ['25+', 'Villages Reached'],
            ['100+', 'Volunteers'],
          ].map(([number, label], idx) => (
            <div key={idx} className="p-6 bg-green-100 rounded-xl shadow-sm">
              <h3 className="text-3xl font-bold text-blue-800">{number}</h3>
              <p className="mt-2 text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-green-100 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-pink-800 mb-10">Get Involved</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            ['Volunteer', 'Give your time to support causes that matter.'],
            ['Donate', 'Contribute funds and help us scale our mission.'],
            ['Partner', 'Collaborate with us to reach more lives.'],
          ].map(([title, desc], idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{desc}</p>
              <button className="mt-4 text-pink-700 hover:underline">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-12">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            ['Aarav Gupta', 'Volunteering here changed my life. The impact is real!'],
            ['Meera Jain', 'Proud to be a donor. Transparency and trust matter.'],
            ['Rahul Verma', 'I’ve seen real change in my village, thanks to Praveera.'],
          ].map(([name, quote], idx) => (
            <div key={idx} className="bg-blue-50 p-6 rounded-xl shadow-md">
              <p className="italic text-gray-700">“{quote}”</p>
              <p className="mt-4 font-semibold text-pink-700">– {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="py-20 bg-gray-50 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {[
            ['Community Health Camp', 'Join us for a free health check-up on March 15, 2023.'],
            ['Annual Fundraiser Gala', 'Help us raise funds for our programs on April 20, 2023.'],
          ].map(([event, details], idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-pink-700">{event}</h3>
              <p className="text-gray-600 mt-2">{details}</p>
              <button className="mt-4 text-blue-700 hover:underline">RSVP</button>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-green-200 to-pink-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg text-gray-800 mb-6">
          Join the movement to uplift lives and create lasting change.
        </p>
        <button className="bg-pink-700 text-white px-8 py-3 rounded-full hover:bg-pink-800 transition">
          Get Started....
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
