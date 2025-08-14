'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PartnerDetailsModal from "../../../components/PartnerDetailsModal";

// ====== PARTNERS ======
const partners = [
  {
    name: 'UNICEF',
    description: 'Supporting children’s health and education across our rural programs.',
    logo: '/partners/unicef.png',
    url: 'https://www.unicef.org/',
    programs: [
      {
        name: 'Rural Child Education Program',
        beneficiaries: 1500,
        donation: '$50,000',
        images: ['/projects/unicef1.jpg', '/projects/unicef2.jpg'],
        achievements: 'Built 5 new schools and provided free learning materials.',
      }
    ]
  },
  {
    name: 'Google.org',
    description: 'Collaborating on digital literacy and AI education campaigns.',
    logo: '/partners/googleorg.png',
    url: 'https://www.google.org/',
    programs: [
      {
        name: 'Digital Literacy Drive',
        beneficiaries: 3000,
        donation: '$40,000',
        images: ['/projects/google1.jpg', '/projects/google2.jpg'],
        achievements: 'Provided laptops and training to rural students.',
      }
    ]
  },
  {
    name: 'Tata Trusts',
    description: 'Providing strategic support for healthcare and nutrition initiatives.',
    logo: '/partners/tata.png',
    url: 'https://www.tatatrusts.org/',
    programs: [
      {
        name: 'Nutrition for All',
        beneficiaries: 2000,
        donation: '$60,000',
        images: ['/projects/tata1.jpg', '/projects/tata2.jpg'],
        achievements: 'Distributed nutritional kits and set up community kitchens.',
      }
    ]
  },
  {
    name: 'Infosys Foundation',
    description: 'Driving rural education and skill development programs.',
    logo: '/partners/infosys.png',
    url: 'https://www.infosys.com/infosys-foundation.html',
    programs: [
      {
        name: 'Rural Skills Program',
        beneficiaries: 1200,
        donation: '$30,000',
        images: ['/projects/infosys1.jpg', '/projects/infosys2.jpg'],
        achievements: 'Established 3 vocational training centers.',
      }
    ]
  },
  {
    name: 'Microsoft Philanthropies',
    description: 'Promoting accessible technology for underprivileged communities.',
    logo: '/partners/microsoft.png',
    url: 'https://www.microsoft.com/philanthropies',
    programs: [
      {
        name: 'Tech Access for All',
        beneficiaries: 2500,
        donation: '$45,000',
        images: ['/projects/microsoft1.jpg', '/projects/microsoft2.jpg'],
        achievements: 'Installed free community computer labs.',
      }
    ]
  },
  {
    name: 'Save the Children',
    description: 'Advocating for children’s rights and education.',
    logo: '/partners/savethechildren.png',
    url: 'https://www.savethechildren.net/',
    programs: [
      {
        name: 'Child Safety & Education',
        beneficiaries: 1800,
        donation: '$25,000',
        images: ['/projects/stc1.jpg', '/projects/stc2.jpg'],
        achievements: 'Implemented after-school programs in rural areas.',
      }
    ]
  },
  {
    name: 'Plan International',
    description: 'Focusing on girls’ education and empowerment.',
    logo: '/partners/planint.png',
    url: 'https://plan-international.org/',
    programs: [
      {
        name: 'Girls First Initiative',
        beneficiaries: 900,
        donation: '$20,000',
        images: ['/projects/plan1.jpg', '/projects/plan2.jpg'],
        achievements: 'Provided scholarships and mentorship for young girls.',
      }
    ]
  },
  {
    name: 'Oxfam',
    description: 'Working to end poverty and inequality.',
    logo: '/partners/oxfam.png',
    url: 'https://www.oxfam.org/',
    programs: [
      {
        name: 'Fair Trade Support',
        beneficiaries: 500,
        donation: '$15,000',
        images: ['/projects/oxfam1.jpg', '/projects/oxfam2.jpg'],
        achievements: 'Helped farmers market their produce at fair prices.',
      }
    ]
  },
  {
    name: 'World Vision',
    description: 'Supporting vulnerable communities worldwide.',
    logo: '/partners/worldvision.png',
    url: 'https://www.wvi.org/',
    programs: [
      {
        name: 'Clean Water Initiative',
        beneficiaries: 1500,
        donation: '$35,000',
        images: ['/projects/wv1.jpg', '/projects/wv2.jpg'],
        achievements: 'Installed borewells in 15 villages.',
      }
    ]
  },
  {
    name: 'CARE International',
    description: 'Fighting global poverty and providing disaster relief.',
    logo: '/partners/care.png',
    url: 'https://www.care-international.org/',
    programs: [
      {
        name: 'Disaster Response Program',
        beneficiaries: 1200,
        donation: '$28,000',
        images: ['/projects/care1.jpg', '/projects/care2.jpg'],
        achievements: 'Supplied emergency relief kits to disaster-hit families.',
      }
    ]
  },
];

// ====== COLLABORATORS ======
const collaborators = [
  {
    name: 'Red Cross',
    description: 'Emergency response and disaster relief collaboration during crises.',
    logo: '/partners/redcross.png',
    url: 'https://www.ifrc.org/',
    programs: [
      {
        name: 'Flood Relief 2024',
        beneficiaries: 500,
        donation: '$20,000',
        images: ['/projects/redcross1.jpg', '/projects/redcross2.jpg'],
        achievements: 'Provided food kits, blankets, and medical aid.',
      }
    ]
  },
  {
    name: 'WHO',
    description: 'Partnering on global health awareness campaigns and vaccinations.',
    logo: '/partners/who.png',
    url: 'https://www.who.int/',
    programs: [
      {
        name: 'Vaccination Drive',
        beneficiaries: 2000,
        donation: '$35,000',
        images: ['/projects/who1.jpg', '/projects/who2.jpg'],
        achievements: 'Vaccinated children against measles and polio.',
      }
    ]
  },
  {
    name: 'Doctors Without Borders',
    description: 'Providing medical aid in conflict zones and disaster areas.',
    logo: '/partners/dwb.png',
    url: 'https://www.msf.org/',
    programs: [
      {
        name: 'Medical Outreach 2024',
        beneficiaries: 800,
        donation: '$40,000',
        images: ['/projects/dwb1.jpg', '/projects/dwb2.jpg'],
        achievements: 'Set up mobile clinics in remote areas.',
      }
    ]
  },
  {
    name: 'UNDP',
    description: 'Promoting sustainable development and resilience.',
    logo: '/partners/undp.png',
    url: 'https://www.undp.org/',
    programs: [
      {
        name: 'Green Village Initiative',
        beneficiaries: 1200,
        donation: '$33,000',
        images: ['/projects/undp1.jpg', '/projects/undp2.jpg'],
        achievements: 'Introduced solar energy to rural homes.',
      }
    ]
  },
  {
    name: 'FAO',
    description: 'Fighting hunger and improving agriculture.',
    logo: '/partners/fao.png',
    url: 'https://www.fao.org/',
    programs: [
      {
        name: 'Farmer Training Program',
        beneficiaries: 700,
        donation: '$15,000',
        images: ['/projects/fao1.jpg', '/projects/fao2.jpg'],
        achievements: 'Trained farmers in modern sustainable agriculture.',
      }
    ]
  },
  {
    name: 'UNESCO',
    description: 'Supporting education, science, and culture.',
    logo: '/partners/unesco.png',
    url: 'https://www.unesco.org/',
    programs: [
      {
        name: 'Cultural Heritage Program',
        beneficiaries: 500,
        donation: '$10,000',
        images: ['/projects/unesco1.jpg', '/projects/unesco2.jpg'],
        achievements: 'Restored cultural monuments and organized school visits.',
      }
    ]
  },
  {
    name: 'Global Fund',
    description: 'Fighting AIDS, tuberculosis, and malaria.',
    logo: '/partners/globalfund.png',
    url: 'https://www.theglobalfund.org/',
    programs: [
      {
        name: 'Malaria Eradication Campaign',
        beneficiaries: 3000,
        donation: '$55,000',
        images: ['/projects/globalfund1.jpg', '/projects/globalfund2.jpg'],
        achievements: 'Distributed mosquito nets and conducted awareness programs.',
      }
    ]
  },
  {
    name: 'WaterAid',
    description: 'Improving access to clean water and sanitation.',
    logo: '/partners/wateraid.png',
    url: 'https://www.wateraid.org/',
    programs: [
      {
        name: 'Sanitation for All',
        beneficiaries: 1800,
        donation: '$25,000',
        images: ['/projects/wateraid1.jpg', '/projects/wateraid2.jpg'],
        achievements: 'Built toilets and promoted hygiene education.',
      }
    ]
  },
  {
    name: 'Habitat for Humanity',
    description: 'Building homes for those in need.',
    logo: '/partners/habitat.png',
    url: 'https://www.habitat.org/',
    programs: [
      {
        name: 'Homes for Hope',
        beneficiaries: 400,
        donation: '$50,000',
        images: ['/projects/habitat1.jpg', '/projects/habitat2.jpg'],
        achievements: 'Constructed affordable homes for low-income families.',
      }
    ]
  },
  {
    name: 'Mercy Corps',
    description: 'Helping communities recover from crisis.',
    logo: '/partners/mercycorps.png',
    url: 'https://www.mercycorps.org/',
    programs: [
      {
        name: 'Economic Recovery Project',
        beneficiaries: 600,
        donation: '$22,000',
        images: ['/projects/mercy1.jpg', '/projects/mercy2.jpg'],
        achievements: 'Provided small business grants post-disaster.',
      }
    ]
  },
];

const PartnersPage = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const handleCardClick = (partner) => {
    setSelectedPartner(partner);
  };

  const handleClose = () => {
    setSelectedPartner(null);
  };

  return (
    <div className="bg-white text-green-900">
      {/* Hero Section */}
      <section className="pt-36 pb-32 bg-gradient-to-r from-pink-100 via-blue-100 to-green-100 text-center relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-pink-200 rounded-full top-0 -left-20 opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-blue-200 rounded-full bottom-0 -right-32 opacity-30 blur-2xl animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
            Partners & Collaborators
          </h1>
          <p className="text-lg md:text-xl text-green-800 mb-8">
            United by purpose, strengthened by partnership. Together we create lasting impact.
          </p>
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
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCardClick(partner)}
                className="cursor-pointer bg-pink-50 rounded-xl shadow hover:shadow-lg transition p-6 text-center h-full"
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
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
        >
          {collaborators.map((collab, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCardClick(collab)}
                className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-6 text-center h-full"
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {selectedPartner && (
        <PartnerDetailsModal partner={selectedPartner} onClose={handleClose} />
      )}
    </div>
  );
};

export default PartnersPage;
