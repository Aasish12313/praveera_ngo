'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, FolderOpen, Heart, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardCards() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);

  useEffect(() => {
    fetchCardStats();
  }, []);

  const fetchCardStats = async () => {
    try {
      const donationRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/all`);
      const donations = donationRes.data.donations || [];

      const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);
      const uniqueDonors = new Set(donations.map((d) => d.email)).size;

      setTotalAmount(total);
      setDonorCount(uniqueDonors);
    } catch (err) {
      console.error('Error fetching donations:', err);
    }

    try {
      const programRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/programs`);
      const programs = programRes.data || [];

      setActiveProjects(programs.length);
      const totalBen = programs.reduce((sum, p) => sum + (p.beneficiariesCount || 0), 0);
      setTotalBeneficiaries(totalBen);
    } catch (err) {
      console.error('Error fetching programs:', err);
    }
  };

  const cardData = [
    {
      title: 'Total Donations',
      value: `₹${totalAmount.toLocaleString()}`,
      icon: <PieChart className="text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Donors',
      value: donorCount,
      icon: <Heart className="text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Active Projects',
      value: activeProjects,
      icon: <FolderOpen className="text-purple-600" />,
      bg: 'bg-purple-50',
    },
    {
      title: 'Beneficiaries Served',
      value: totalBeneficiaries,
      icon: <Users className="text-orange-600" />,
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          className={`p-5 rounded-2xl shadow-sm border border-transparent hover:border-gray-200 transition hover:shadow-xl ${card.bg}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, type: 'spring' }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="bg-white p-2 rounded-full shadow-inner"
            >
              {card.icon}
            </motion.div>
            <div>
              <h4 className="text-sm text-gray-600">{card.title}</h4>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
