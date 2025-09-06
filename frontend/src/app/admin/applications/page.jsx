'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Eye, Download } from 'lucide-react';

const confirmToast = (message, onConfirm) => {
  const toastId = toast(
    ({ closeToast }) => (
      <div>
        <p className="mb-2">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              onConfirm();
              toast.dismiss(toastId);
            }}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      closeOnClick: false,
      closeButton: false,
      autoClose: false,
      draggable: false,
      position: 'top-center',
    }
  );
};

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [loading, setLoading] = useState(true);

  const positions = [
    'All',
    'Community Outreach Volunteer',
    'Fundraising Intern',
    'Social Media Manager',
    'Event Coordinator',
    'Field Data Collector',
  ];

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/applications/getall`);
      setApplications(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = (id) => {
    confirmToast('Are you sure you want to delete this application?', async () => {
      try {
        toast.loading('Deleting...');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/applications/delete/${id}`);
        toast.dismiss();
        toast.success('Application deleted successfully');
        const updated = applications.filter((app) => app._id !== id);
        setApplications(updated);
        filterByPosition(selectedPosition, updated);
      } catch (err) {
        toast.dismiss();
        toast.error('Failed to delete application');
      }
    });
  };

  const filterByPosition = (position, data = applications) => {
    setSelectedPosition(position);
    if (position === 'All') {
      setFiltered(data);
    } else {
      setFiltered(data.filter((app) => app.position === position));
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-slate-100 p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-black mb-8">Job Applications</h1>

        <div className="flex justify-center mb-6">
          <select
            value={selectedPosition}
            onChange={(e) => filterByPosition(e.target.value)}
            className="text-black border border-slate-300 rounded-md px-5 py-2 bg-white shadow-sm hover:border-slate-400 transition"
          >
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-slate-200 text-black text-sm">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">Position</th>
                  <th className="px-5 py-3 text-left">Message</th>
                  <th className="px-5 py-3 text-left">Resume</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                  <th className="px-5 py-3 text-left">Reply</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app._id} className="border-b hover:bg-slate-100 transition">
                    <td className="px-5 py-3 text-black">{app.name}</td>
                    <td className="px-5 py-3 text-black">{app.email}</td>
                    <td className="px-5 py-3 text-black">{app.phone}</td>
                    <td className="px-5 py-3 text-black">{app.position}</td>
                    <td className="px-5 py-3 max-w-xs truncate text-black" title={app.message}>
                      {app.message}
                    </td>
                    <td className="px-5 py-3 space-y-1 text-black">
                      {app.resumeUrl ? (
                        <div className="flex flex-col space-y-1">
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Eye className="w-4 h-4" /> View
                          </a>
                         
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Not uploaded</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => deleteApplication(app._id)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <a
                        href={`mailto:${app.email}`}
                        className="flex items-center justify-center gap-1 border border-black rounded-md px-4 py-1.5 text-black text-sm transition duration-200 hover:bg-black hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 transition duration-200"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                          <polyline points="3 7 12 13 21 7" />
                        </svg>
                        Reply
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminApplications;
