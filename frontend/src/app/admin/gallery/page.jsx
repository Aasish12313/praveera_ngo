'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => formData.append('images', file));

    try {
      const res = await axios.post('http://localhost:5000/gallery/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImages([...res.data, ...images]);
      setSelectedFiles([]);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/gallery/delete/${id}`);
      setImages(images.filter((img) => img._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-8 bg-[#f8f9fc] min-h-screen">
      {/* Updated title */}
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Admin Gallery</h2>

      <div className="mb-6">
        <input type="file" multiple onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
              src={img.imageUrl}
              alt="Gallery"
              className="w-full h-48 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
