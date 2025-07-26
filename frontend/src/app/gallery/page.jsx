'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const localImages = [
      { imageUrl: '/img1.jpg' },
      { imageUrl: '/img2.png' },
      { imageUrl: '/img3.png' },
      { imageUrl: '/img4.png' },
      { imageUrl: '/img5.png' },
      { imageUrl: '/img6.png' },
      { imageUrl: '/img7.png' },
      { imageUrl: '/img4.png' },
      { imageUrl: '/img5.png' },
    ];
    setImages(localImages);
    setLoading(false);
  }, []);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Head>
        <title>Impact Gallery | Pravira Socio Culture Welfare Foundation</title>
        <meta name="description" content="Explore real moments captured from Pravira's community development and cultural initiatives." />
        <meta name="keywords" content="Praveera Foundation, NGO, Gallery, Social Work, Culture, Events" />
        <meta name="author" content="Praveera Foundation" />
        <meta property="og:title" content="Impact Gallery | Pravira Foundation" />
        <meta property="og:description" content="See the cultural and welfare impact Pravira is making across communities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://praveerafoundation.org/gallery" />
        <meta property="og:image" content="https://praveerafoundation.org/assets/gallery-cover.jpg" />
        <link rel="canonical" href="https://praveerafoundation.org/gallery" />
      </Head>

      <Navbar />

      <main className="pt-24 pb-10 bg-white text-gray-800 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-green-700 tracking-wide drop-shadow-md">
            Our Impact Gallery
          </h1>
          <p className="text-center text-base sm:text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Witness the impact of Pravira's socio-cultural efforts through our gallery of real stories and moments.
          </p>

          {loading ? (
            <p className="text-center text-gray-500">Loading gallery...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-500">No images yet. Please check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
              {images.map((img, index) => (
                <article
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={img.imageUrl}
                    alt={`Gallery image ${index + 1} - Pravira Foundation activity`}
                    className="w-full h-auto aspect-video object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ease-in-out">
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className="absolute left-6 text-white text-3xl font-bold"
            onClick={showPrev}
          >
            &#8592;
          </button>

          <img
            src={images[currentIndex].imageUrl}
            alt={`Full View ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] rounded-lg shadow-xl"
          />

          <button
            className="absolute right-6 text-white text-3xl font-bold"
            onClick={showNext}
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
}
