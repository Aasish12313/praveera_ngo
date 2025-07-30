'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CountUp from 'react-countup';
import { FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';


const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-10">
        </div>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-black text-white">
        <Image
          src="/img6.png" // Use your own image path
          alt="Team joining hands"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold"
          >
            About Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="mt-4 text-lg max-w-2xl mx-auto"
          >
            Empowering communities worldwide through sustainable development, education, and hope. Together, we’re building a brighter future for all.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="/donate" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-semibold transition">
              Donate Now
            </a>
            <a href="/volunteer" className="bg-white hover:bg-gray-200 px-6 py-3 rounded-full text-blue-700 font-semibold transition">
              Join as Volunteer
            </a>
          </motion.div>
        </div>
      </section>

            {/* Our Story Section */}
      <section className="bg-gray-100 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-gray-800"
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            What began as a small initiative to support children’s education has evolved into a global movement, touching lives and creating strong change in underserved areas worldwide.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {[
              {
                year: '2010',
                title: 'Founded',
                description: 'Started with a small team in Delhi with a mission to educate slum children.',
              },
              {
                year: '2015',
                title: 'First Milestone',
                description: 'Expanded to 3 cities, launched our first women empowerment program.',
              },
              {
                year: '2020',
                title: 'Global Impact',
                description: 'Touched over 150K lives and built strong partnerships internationally.',
              },
              {
                year: '2024',
                title: 'Digital Transformation',
                description: 'Launched e-learning and health tele-consultation platforms.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                <div className="font-semibold text-gray-800">{item.title}</div>
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      
      {/* Our Impact in Numbers Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          >
            See the lasting difference we've made in communities around the world.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 250000, label: 'Lives Impacted', suffix: '+' },
              { value: 1500, label: 'Schools Built', suffix: '+' },
              { value: 50000, label: 'Children Educated', suffix: '+' },
              { value: 35, label: 'Countries', suffix: '' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <CountUp end={item.value} duration={2} suffix={item.suffix} />
                </div>
                <p className="text-gray-700 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

           {/* Our Programs Section */}
<section className="bg-white py-20 px-6 md:px-20">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-gray-800 mb-4"
    >
      Our Programs
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
    >
      Comprehensive initiatives tackling the most pressing challenges faced by underserved communities.
    </motion.p>

    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: 'Education for All',
          description: 'Providing inclusive education to children and youth in remote and urban slums.',
          image: '/contact-hero.jpg',
        },
        {
          title: 'Clean Water Initiative',
          description: 'Delivering clean drinking water and sanitation to rural and drought-hit areas.',
          image: '/img2.png',
        },
        {
          title: 'Healthcare Access',
          description: 'Running mobile health clinics and health awareness drives in remote areas.',
          image: '/img3.png',
        },
        {
          title: 'Environmental Sustainability',
          description: 'Promoting green practices like tree planting and plastic-free campaigns.',
          image: '/img7.png',
        },
      ].map((program, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl shadow-md group"
        >
          <Image
            src={program.image}
            alt={program.title}
            width={600}
            height={350}
            style={{ width: '100%', height: 'auto' }} // ✅ Prevents aspect ratio warning
            className="object-cover transform group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition flex flex-col justify-end p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
            <p className="text-sm mb-4">{program.description}</p>
            <a
              href="/programs"
              className="inline-block bg-white text-blue-700 font-semibold py-2 px-4 rounded-full text-sm hover:bg-gray-100 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>



       {/* Our Team Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Our passionate team works tirelessly to bring hope and transformation to those who need it most.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Member1',
                role: 'Founder & Director',
                image: '/img7.png',
                linkedin: '#',
                twitter: '#',
                email: 'mailto:aarav@example.org',
              },
              {
                name: 'Member2',
                role: 'Programs Head',
                image: '/img2.png',
                linkedin: '#',
                twitter: '#',
                email: 'mailto:nisha@example.org',
              },
              {
                name: 'Member3',
                role: 'Partnerships Lead',
                image: '/img3.png',
                linkedin: '#',
                twitter: '#',
                email: 'mailto:rahul@example.org',
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow hover:shadow-xl transition p-6 text-center"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="mx-auto mb-4 rounded-full object-cover w-[120px] h-[120px]"
                />
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <div className="flex justify-center gap-4 text-blue-600 text-lg">
                  <a href={member.linkedin} target="_blank"><FaLinkedinIn /></a>
                  <a href={member.twitter} target="_blank"><FaTwitter /></a>
                  <a href={member.email}><FaEnvelope /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* Call-to-Action Section */}
      <section className="bg-blue-700 text-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Whether you volunteer, donate, or spread the word — your support transforms lives. Join us today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="/donate"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Donate Now
            </a>
            <a
              href="/volunteer"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Become a Volunteer
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
          </>
  );
};

export default AboutPage;









