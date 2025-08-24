'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function ActiveProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/programs');
        const formatted = res.data
          .slice(0, 3) // 👈 show only the 3 most recent
          .map((prog) => ({
            name: prog.title,
            location: prog.location || 'Unknown',
            beneficiaries: prog.beneficiariesCount || 0,
          }));
        setProjects(formatted);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-5">🚀 Active Projects</h2>

      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="mb-4 group hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-400 bg-gray-50 hover:bg-white transition-colors duration-300 shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-semibold text-blue-700 group-hover:text-blue-900 transition-colors duration-200">
                {project.name}
              </h3>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium shadow-sm group-hover:bg-blue-200 transition-all duration-200">
                📍 {project.location}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2 group-hover:text-black transition">
              👥 <strong>Beneficiaries:</strong> {project.beneficiaries}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
