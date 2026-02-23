'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Download, Eye, FileDown } from "lucide-react";
import { CSVLink } from "react-csv";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('');
  const [panSearch, setPanSearch] = useState('');
  const [receiptSearch, setReceiptSearch] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/all`);
        if (data.success) {
          setDonations(data.donations);
          setFiltered(data.donations);
          const total = data.donations.reduce((sum, d) => sum + Number(d.amount), 0);
          setTotalAmount(total);
        }
      } catch (err) {
        console.error('❌ Error fetching donations:', err.message);
      }
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    let result = donations;

    // 🔍 Universal search (name/email/id)
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((d) =>
        d.name?.toLowerCase().includes(lower) ||
        d.email?.toLowerCase().includes(lower) ||
        d._id?.toLowerCase().includes(lower)
      );
    }

    // 🎯 Purpose filter
    if (purposeFilter) {
      result = result.filter((d) => d.purpose === purposeFilter);
    }

    // 🔍 PAN search
    if (panSearch) {
      const lower = panSearch.toLowerCase();
      result = result.filter((d) => d.panNumber?.toLowerCase().includes(lower));
    }

    // 🔍 Receipt search
    if (receiptSearch) {
      const lower = receiptSearch.toLowerCase();
      result = result.filter((d) => d.receiptUrl?.toLowerCase().includes(lower));
    }

    setFiltered(result);
  }, [search, purposeFilter, panSearch, receiptSearch, donations]);

  const csvData = filtered.map((d) => ({
    ID: d._id,
    Name: d.name,
    Email: d.email,
    Address: d.address || "",
    PAN: d.panNumber || "",
    Amount: d.amount,
    Purpose: d.purpose,
    Mode: d.mode,
    Date: new Date(d.date).toLocaleString(),
    PaymentID: d.paymentId,
    OrderID: d.orderId,
  }));

  const pieData = [...new Set(filtered.map((d) => d.purpose))].map((purpose, i) => ({
    id: purpose,
    label: purpose,
    value: filtered
      .filter((d) => d.purpose === purpose)
      .reduce((sum, d) => sum + d.amount, 0),
    color: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f6'][i % 5],
  }));

  const monthlyData = Array(12).fill(0);
  filtered.forEach((d) => {
    const month = new Date(d.date).getMonth();
    monthlyData[month] += d.amount;
  });

  const barData = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ].map((month, i) => ({
    month,
    donations: monthlyData[i],
  }));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">🛠 Admin Dashboard</h1>

      {/* Top Filters */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded">
          <h1 className="text-xl font-semibold text-black">Total Amount</h1>
          <p className="text-2xl text-green-600">₹{totalAmount.toLocaleString()}</p>
        </div>

        {/* Universal Search */}
        <div className="p-4 bg-gray shadow rounded">
          <input
            type="text"
            placeholder="🔍 Search by Name, Email, ID"
            className="w-full p-2 border rounded text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Purpose Filter */}
        <div className="p-4 bg-white shadow rounded">
          <select
            className="w-full p-2 border rounded text-black"
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
          >
            <option value="">All Purposes</option>
            <option>Education</option>
            <option>Food</option>
            <option>Medical Aid</option>
            <option>Emergency Relief</option>
            <option>Community Development</option>
            <option>Other</option>
          </select>
        </div>

        {/* PAN Search */}
        <div className="p-4 bg-white shadow rounded">
          <input
            type="text"
            placeholder="🔍 Search by PAN Number"
            className="w-full p-2 border rounded text-black"
            value={panSearch}
            onChange={(e) => setPanSearch(e.target.value)}
          />
        </div>

        {/* Receipt Search */}
        <div className="p-4 bg-white shadow rounded">
          <input
            type="text"
            placeholder="🔍 Search by Receipt Number"
            className="w-full p-2 border rounded text-black"
            value={receiptSearch}
            onChange={(e) => setReceiptSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Donation Records */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-700">📋 Donation Records</h1>
        <CSVLink data={csvData} filename="donations.csv">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow mb-8">
        <table className="min-w-full text-sm text-left text-black">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">PAN No.</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Purpose</th>
              <th className="py-2 px-4">Mode</th>
              <th className="py-2 px-4">Payment ID</th>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((don, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-xs text-gray-600">{don._id}</td>
                <td className="py-2 px-4">{don.name}</td>
                <td className="py-2 px-4">{don.email}</td>
                <td className="py-2 px-4">{don.address || "—"}</td>
                <td className="py-2 px-4">{don.panNumber || "—"}</td>
                <td className="py-2 px-4">₹{don.amount}</td>
                <td className="py-2 px-4">{don.purpose}</td>
                <td className="py-2 px-4 capitalize">{don.mode}</td>
                <td className="py-2 px-4 text-xs text-gray-600">{don.paymentId}</td>
                <td className="py-2 px-4 text-xs text-gray-600">{don.orderId}</td>
                <td className="py-2 px-4">{new Date(don.date).toLocaleString()}</td>
                <td className="py-2 px-4 flex gap-2">
                  <a href={don.receiptUrl} target="_blank" rel="noreferrer" title="View">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </a>
                  <a href={don.receiptUrl} download target="_blank" rel="noreferrer" title="Download">
                    <Download className="w-5 h-5 text-green-600" />
                  </a>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-500">
                  No matching donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow h-[420px]">
          <h1 className="text-md font-semibold mb-2 text-black">📈 Donations by Purpose</h1>
          <div className="h-[360px]">
            <ResponsivePie
              data={pieData}
              margin={{ top: 20, right: 140, bottom: 40, left: 0 }}
              innerRadius={0.5}
              padAngle={1}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ datum: 'data.color' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#000"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#000"
              tooltip={({ datum }) => (
                <div style={{
                  background: '#fff',
                  color: '#000',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {datum.label}: ₹{datum.value.toLocaleString()}
                </div>
              )}
              legends={[
                {
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  itemsSpacing: 10,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemTextColor: '#333',
                  itemDirection: 'left-to-right',
                  symbolSize: 14,
                  symbolShape: 'circle',
                },
              ]}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow h-[420px]">
          <h1 className="text-md font-semibold mb-2 text-black">📊 Monthly Donations</h1>
          <div className="h-[360px]">
            <ResponsiveBar
              data={barData}
              keys={['donations']}
              indexBy="month"
              margin={{ top: 30, right: 30, bottom: 50, left: 70 }}
              padding={0.4}
              colors={{ scheme: 'set2' }}
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
                legend: 'Donations',
                legendPosition: 'middle',
                legendOffset: -60,
                format: (value) => `₹${(value / 1000).toFixed(0)}k`,
              }}
              tooltip={({ id, value, indexValue }) => (
                <div style={{
                  background: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  color: '#000',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {indexValue}: ₹{value.toLocaleString()}
                </div>
              )}
              animate
              motionConfig="gentle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
