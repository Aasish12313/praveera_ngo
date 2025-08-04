'use client';
import React from 'react';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const partners = [
  {
    name: 'UNICEF',
    description: 'Supporting children’s health and education across our rural programs.',
    logo: '/partners/unicef.png',
    url: 'https://www.unicef.org/',
  },
  {
    name: 'Google.org',
    description: 'Collaborating on digital literacy and AI education campaigns.',
    logo: '/partners/googleorg.png',
    url: 'https://www.google.org/',
  },
  {
    name: 'Tata Trusts',
    description: 'Providing strategic support for healthcare and nutrition initiatives.',
    logo: '/partners/tata.png',
    url: 'https://www.tatatrusts.org/',
  },
];

const collaborators = [
  {
    name: 'Red Cross',
    description: 'Emergency response and disaster relief collaboration during crises.',
    logo: '/partners/redcross.png',
    url: 'https://www.ifrc.org/',
  },
  {
    name: 'WHO',
    description: 'Partnering on global health awareness campaigns and vaccinations.',
    logo: '/partners/who.png',
    url: 'https://www.who.int/',
  },
  {
    name: 'Gates Foundation',
    description: 'Joint efforts in maternal health and scalable healthcare innovations.',
    logo: '/partners/gates.png',
    url: 'https://www.gatesfoundation.org/',
  },
];

const PartnersPage = () => {
  return (
    <div className="bg-white text-green-900">
     

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-pink-100 via-blue-100 to-green-100 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Partners & Collaborators
          </h1>
          <p className="text-lg md:text-xl text-green-800 mb-6">
            United by purpose, strengthened by partnership. Together we create lasting impact.
          </p>
          <a
            href="/contact"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow transition"
          >
            Become a Partner
          </a>
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Our Trusted Partners</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-50 rounded-xl shadow hover:shadow-lg transition p-6 text-center block h-full"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={100}
                  className="mx-auto mb-4 object-contain h-24"
                />
                <h3 className="text-xl font-semibold text-blue-700">{partner.name}</h3>
                <p className="text-sm text-green-800 mt-2">{partner.description}</p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Collaborators Carousel */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-green-100 via-pink-50 to-blue-100">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">Our Collaborators</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3500 }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {collaborators.map((collab, index) => (
            <SwiperSlide key={index}>
              <a
                href={collab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-6 text-center block h-full"
              >
                <Image
                  src={collab.logo}
                  alt={collab.name}
                  width={100}
                  height={100}
                  className="mx-auto mb-4 object-contain h-24"
                />
                <h3 className="text-xl font-semibold text-pink-700">{collab.name}</h3>
                <p className="text-sm text-green-900 mt-2">{collab.description}</p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
};

export default PartnersPage;
