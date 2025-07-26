'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const heroImages = [
  '/programs/hero1.jpg',
  '/programs/hero2.jpg',
  '/programs/hero3.jpg',
];

const programs = [
  {
    title: 'Child Education Drive',
    image: '/programs/img5.png',
    description:
      'Building community schools and providing free educational materials in rural areas.',
  },
  {
    title: 'Rural Health Missions',
    image: '/programs/img6.png',
    description:
      'Deploying mobile clinics to ensure healthcare reaches remote corners.',
  },
  {
    title: 'Green Future Project',
    image: '/programs/img7.png',
    description: 'Tree plantation drives and clean energy workshops.',
  },
  {
    title: 'Child Education Drive',
    image: '/programs/img5.png',
    description:
      'Building community schools and providing free educational materials in rural areas.',
  },
  {
    title: 'Rural Health Missions',
    image: '/programs/img6.png',
    description:
      'Deploying mobile clinics to ensure healthcare reaches remote corners.',
  },
  {
    title: 'Green Future Project',
    image: '/programs/img7.png',
    description: 'Tree plantation drives and clean energy workshops.',
  },
];

const partners = [
  '/partners/p1.png',
  '/partners/p2.png',
  '/partners/p3.png',
  '/partners/p4.png',
  '/partners/p5.png',
  '/partners/p1.png',
  '/partners/p2.png',
  '/partners/p3.png',
  '/partners/p4.png',
  '/partners/p5.png',
];

export default function Programs() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      <Navbar />

<section className="relative h-[70vh] mt-[80px] overflow-hidden">
  {/* Background Images */}
  {heroImages.map((img, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: current === i ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      <Image
        src={img}
        alt={`Hero ${i}`}
        fill
        className="object-cover"
        priority={i === 0}
      />
    </motion.div>
  ))}

  {/* Overlay to darken background */}
  <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center text-white text-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-2">Our Programs</h1>
      <p className="text-base md:text-xl max-w-xl mx-auto">
        Empowering change through education, health, and sustainability.
      </p>
    </motion.div>
  </div>
</section>






      {/* Programs Section */}
      <section className="bg-gray-100 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold mb-14 text-[#e91e63]"
          >
            Explore Our Initiatives
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  width={500}
                  height={240}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-black">
                    {p.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Slider */}
      <section className="bg-white py-12">
        <h3 className="text-center text-3xl font-semibold mb-8 text-[#00bcd4]">
          Our Partners
        </h3>
        <div className="overflow-hidden relative w-full">
          <div className="flex animate-scroll gap-10 px-10">
            {[...partners, ...partners].map((logo, i) => (
              <Image
                key={i}
                src={logo}
                alt={`partner-${i}`}
                width={120}
                height={80}
                className="object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
