'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/gallery/all');
      setImages(res.data);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    }
  };

  const openModal = (idx) => setSelectedIdx(idx);
  const closeModal = () => setSelectedIdx(null);

  const prevImage = () =>
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-[#fefdfc] min-h-screen">

      {/* WRAPPER WITH TOP PADDING FOR FIXED NAVBAR */}
      <div className="pt-32 p-8">
        {/* Centered Page Title */}
        <h1 className="text-4xl font-bold mb-8 text-center text-pink-700">
          Moments
        </h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.img
              key={img._id}
              src={img.imageUrl}
              alt="Gallery"
              className="w-full h-48 object-cover rounded cursor-pointer hover:scale-105 transition"
              onClick={() => openModal(idx)}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl font-bold"
              >
                &times;
              </button>
              <button
                onClick={prevImage}
                className="absolute left-4 text-white text-3xl font-bold"
              >
                &#8592;
              </button>
              <img
                src={images[selectedIdx].imageUrl}
                alt="Selected"
                className="max-h-[80vh] max-w-[80vw] object-contain rounded-lg shadow-lg"
              />
              <button
                onClick={nextImage}
                className="absolute right-4 text-white text-3xl font-bold"
              >
                &#8594;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
