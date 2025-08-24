'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar';

export default function DonationTrendsChart() {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchDonationTrends = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/all`);
        if (data.success) {
          const donations = data.donations;

          // Initialize 12 months
          const monthlyTotals = Array(12).fill(0);
          donations.forEach((d) => {
            const monthIndex = new Date(d.date).getMonth();
            monthlyTotals[monthIndex] += d.amount;
          });

          const formattedData = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ].map((month, i) => ({
            month,
            donations: monthlyTotals[i],
          }));

          setBarData(formattedData);
        }
      } catch (err) {
        console.error('❌ Error fetching donation trends:', err.message);
      }
    };

    fetchDonationTrends();
  }, []);

  return (
    <div className="h-[420px] bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-blue-50">
      <h2 className="text-xl font-extrabold text-gray-800 mb-1">📈 Monthly Donation Trends</h2>
      <p className="text-gray-500 text-sm mb-4">
        Track donation patterns over the last 12 months
      </p>
      <div className="h-[320px]">
        <ResponsiveBar
          data={barData}
          keys={['donations']}
          indexBy="month"
          margin={{ top: 30, right: 30, bottom: 50, left: 70 }}
          padding={0.4}
          colors={{ scheme: 'set2' }}
          borderRadius={4}
          enableLabel={false}
          axisBottom={{
            tickSize: 6,
            tickPadding: 8,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 6,
            tickPadding: 6,
            legend: 'Donations (₹)',
            legendPosition: 'middle',
            legendOffset: -60,
            format: (value) => `₹${(value / 1000).toFixed(0)}k`,
          }}
          animate
          motionConfig="gentle"
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: '#555',
                },
              },
              legend: {
                text: {
                  fill: '#666',
                  fontSize: 13,
                  fontWeight: 600,
                },
              },
            },
            tooltip: {
              container: {
                background: '#ffffff',
                color: '#000',
                fontSize: 13,
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              },
            },
            labels: {
              text: {
                fill: '#111',
              },
            },
          }}
          tooltip={({ id, value, indexValue }) => (
            <strong className="text-sm text-black">
              {indexValue}: ₹{value.toLocaleString()}
            </strong>
          )}
        />
      </div>
    </div>
  );
}
