'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardCards from '../../../components/DashboardCards';
import DonationTrendsChart from '../../../components/DonationTrendsChart';
import ProjectCategoryChart from '../../../components/ProjectCategoryChart';
import FundAllocationChart from '../../../components/FundAllocationChart';
import ActiveProjects from '../../../components/ActiveProjects';
import RecentEventsBox from '../../../components/RecentEventsBox';
import FooterEditor from '../../../components/FooterEditor';

export default function AdminDashboard() {
  return (
    <motion.div className="space-y-10 animate-fade-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.div className="bg-gradient-to-r from-blue-50 to-purple-100 p-6 rounded-xl shadow-md border flex flex-col gap-2 overflow-hidden" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
        <motion.h1 className="text-3xl font-extrabold text-gray-800 tracking-tight" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          🎉 Dashboard Overview
        </motion.h1>
        <motion.p className="text-gray-600 text-base" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          Welcome back! Here’s what’s happening with your NGO today.
        </motion.p>
      </motion.div>

      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <DashboardCards />
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <DonationTrendsChart />
        <ProjectCategoryChart />
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="grid md:grid-cols-2 gap-6">
          <FundAllocationChart />
          <FooterEditor />
        </div>
      </motion.div>

      

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <ActiveProjects />
        <RecentEventsBox />
      </motion.div>
    </motion.div>
  );
}
