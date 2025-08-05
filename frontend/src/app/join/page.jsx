'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const jobs = [
  {
    title: 'Intern',
    description: 'Assist our team in daily operations and gain real-world NGO experience.',
  },
  {
    title: 'Social Media Manager',
    description: 'Manage our online presence, create engaging posts, and grow our digital community.',
  },
  {
    title: 'Fundraising Partner',
    description: 'Connect with donors and raise funds to support impactful community programs.',
  },
  {
    title: 'Field Coordinator',
    description: 'Work directly in the field to implement and monitor NGO programs effectively.',
  },
  {
    title: 'Program Lead',
    description: 'Oversee planning, execution, and evaluation of specific NGO initiatives.',
  },
];

export default function JoinUsPage() {
  return (
    <div className="min-h-screen bg-white pt-28 px-6 pb-12">
      <motion.h1
        className="text-4xl font-bold text-center text-pink-600 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Join Our Team
      </motion.h1>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            className="bg-blue-100 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">
              {job.title}
            </h2>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <Link href={`/join-form?role=${encodeURIComponent(job.title)}`}>
              <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition">
                Apply Now
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
