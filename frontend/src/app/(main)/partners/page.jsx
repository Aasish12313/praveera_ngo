'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/partners');
      const data = await res.json();
      setPartners(data.filter(p => p.type === 'partner'));
      setCollaborators(data.filter(p => p.type === 'collaborator'));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white text-green-900">
      <section className="pt-36 pb-32 bg-gradient-to-r from-pink-100 via-blue-100 to-green-100 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">Partners & Collaborators</h1>
          <p className="text-lg md:text-xl text-green-800 mb-8">United by purpose, strengthened by partnership. Together we create lasting impact.</p>
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Our Trusted Partners</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{640:{slidesPerView:2},1024:{slidesPerView:3}}}
          autoplay={{delay:2500, disableOnInteraction:false}}
          loop
          pagination={{clickable:true}}
          modules={[Autoplay, Pagination]}
        >
          {partners.map(p => (
            <SwiperSlide key={p._id}>
              <div className="bg-pink-50 rounded-xl shadow p-6 text-center h-full">
                {p.logoUrl && <Image src={p.logoUrl} alt={p.name} width={100} height={100} className="mx-auto mb-4 object-contain h-24" />}
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-700 hover:underline block">{p.name}</a>
              </div>
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
          breakpoints={{640:{slidesPerView:2},1024:{slidesPerView:3}}}
          autoplay={{delay:3000, disableOnInteraction:false}}
          loop
          pagination={{clickable:true}}
          modules={[Autoplay, Pagination]}
        >
          {collaborators.map(c => (
            <SwiperSlide key={c._id}>
              <div className="bg-white border border-gray-200 rounded-xl shadow p-6 text-center h-full">
                {c.logoUrl && <Image src={c.logoUrl} alt={c.name} width={100} height={100} className="mx-auto mb-4 object-contain h-24" />}
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-pink-700 hover:underline block">{c.name}</a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default PartnersPage;
