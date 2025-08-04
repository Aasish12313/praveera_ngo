'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';


const stats = [
  { label: 'Children Educated', value: 12000 },
  { label: 'Meals Distributed', value: 150000 },
  { label: 'Women Empowered', value: 6500 },
  { label: 'Villages Reached', value: 340 },
];

const stories = [
  {
    name: 'Priya from Bihar',
    image: '/img1.jpg',
    story: 'Before our education drive, Priya had never seen a classroom. Now she is in college.',
  },
  {
    name: 'Rahul from Rajasthan',
    image: '/img2.png',
    story: 'Our nutrition program helped Rahul overcome malnutrition and pursue education.',
  },
  {
    name: 'Meena from Jharkhand',
    image: '/img3.png',
    story: 'With our skill training, Meena launched a tailoring business supporting her family.',
  },
];

const impacts = [
  {
    title: 'Empowering Women Through Skills',
    description: 'Thousands of women trained with practical life skills and entrepreneurship programs.',
    image: '/programs/hero1.jpg',
  },
  {
    title: 'Building Sustainable Education',
    description: 'From mobile classrooms to e-learning in tribal zones, education is now inclusive.',
    image: '/programs/hero2.jpg',
  },
  {
    title: 'Community Healthcare Access',
    description: 'We launched mobile clinics and awareness camps to reach remote villages.',
    image: '/programs/hero3.jpg',
  },
];

const ImpactPage = () => {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-800">

      {/* Hero with Video Background */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-4xl md:text-6xl font-bold text-center px-6"
          >
            Creating a Better Tomorrow, Today
          </motion.h1>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-blue-50 via-green-50 to-pink-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Our Impact in Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-extrabold text-green-600">
                  <CountUp end={item.value} duration={2} separator="," />
                </h3>
                <p className="mt-2 font-medium text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact on Society - Card Layout */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How We’re Changing Society
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {impacts.map((impact, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={impact.image}
                    alt={impact.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-pink-600 mb-2">{impact.title}</h3>
                  <p className="text-gray-700 text-sm">{impact.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiary Stories */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Faces Behind the Change
          </motion.h2>

          <motion.div
            key={currentStory}
            className="bg-white p-8 rounded-2xl shadow-xl mx-auto max-w-3xl transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-56 w-full rounded-xl overflow-hidden mb-6">
              <Image
                src={stories[currentStory].image}
                alt={stories[currentStory].name}
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-xl font-bold mb-2 text-blue-600">{stories[currentStory].name}</h4>
            <p className="text-gray-600">{stories[currentStory].story}</p>
          </motion.div>
        </div>
      </section>

{/* CTA Section */}
<section className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 text-blue-900 py-20 px-6 md:px-20 text-center">
  <motion.h2
    className="text-3xl md:text-4xl font-bold mb-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    Be the Reason Someone Smiles Today
  </motion.h2>
  <motion.p
    className="text-lg mb-8 max-w-xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.9 }}
    viewport={{ once: true }}
  >
    Support our mission with your time, resources, or voice. Join us in creating real, measurable change.
  </motion.p>
  <motion.a
    href="/donate"
    whileHover={{ scale: 1.05 }}
    className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-xl transition duration-300"
  >
    Donate Now
  </motion.a>
</section>


      
    </div>
  );
};

export default ImpactPage;
