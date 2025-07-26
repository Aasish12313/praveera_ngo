'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function UserGalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get('http://localhost:5000/gallery');
      setImages(res.data);
    } catch (err) {
      console.error('Failed to fetch gallery images:', err);
    }
  };

  return (
    <>
      <Head>
        <title>Impact Gallery | Vishoka Foundation</title>
        <meta
          name="description"
          content="Browse our Impact Gallery showcasing real moments from Vishoka Foundation’s events, initiatives, and community outreach efforts."
        />
        <meta name="keywords" content="Vishoka Foundation, NGO, Impact Gallery, Social Work, Events, Outreach" />
        <meta name="author" content="Vishoka Foundation" />
        <meta property="og:title" content="Impact Gallery | Vishoka Foundation" />
        <meta property="og:description" content="Discover our journey and impact through real images from the field." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/gallery" />
        <meta property="og:image" content="https://yourdomain.com/default-gallery-image.jpg" />
        <link rel="canonical" href="https://yourdomain.com/gallery" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 p-6">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-10 text-green tracking-wide drop-shadow-md">
            Our Impact Gallery
          </h1>

          {images.length === 0 ? (
            <p className="text-center text-gray-500">
              No images yet. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img, index) => (
                <article
                  key={img._id}
                  className="rounded-xl shadow-md hover:shadow-xl transition overflow-hidden bg-white"
                >
                  <img
                    src={img.imageUrl}
                    alt={`Gallery image ${index + 1} - Vishoka Foundation activity`}
                    className="w-full aspect-video object-cover transition-transform duration-300 hover:scale-105"
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
