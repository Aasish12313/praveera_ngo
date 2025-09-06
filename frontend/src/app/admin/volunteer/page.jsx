'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'lucide-react';

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

const AdminVolunteerApplications = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/volunteers/getall`);
      setVolunteers(res.data);
    } catch (err) {
      toast.error('Failed to fetch volunteer applications');
    } finally {
      setLoading(false);
    }
  };

  const deleteVolunteer = (id) => {
    confirmToast('Are you sure you want to delete this volunteer application?', async () => {
      try {
        toast.loading('Deleting...');
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/volunteers/delete/${id}`);
        toast.dismiss();
        toast.success('Volunteer deleted successfully');
        setVolunteers((prev) => prev.filter((v) => v._id !== id));
      } catch (err) {
        toast.dismiss();
        toast.error('Failed to delete');
      }
    });
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-slate-100 p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Volunteer Applications
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading volunteer applications...</div>
        ) : volunteers.length === 0 ? (
          <div className="text-center text-gray-500">No volunteer applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-slate-200 text-black text-sm">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">Area</th>
                  <th className="px-5 py-3 text-left">Message</th>
                  <th className="px-5 py-3 text-left">Date & Time</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                  <th className="px-5 py-3 text-left">Reply</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((v) => (
                  <tr key={v._id} className="border-b hover:bg-slate-100 transition">
                    <td className="px-5 py-3 text-black">{v.name}</td>
                    <td className="px-5 py-3 text-black">{v.email}</td>
                    <td className="px-5 py-3 text-black">{v.phone}</td>
                    <td className="px-5 py-3 text-black">{v.area}</td>
                    <td
                      className="px-5 py-3 max-w-xs truncate text-black"
                      title={v.message}
                    >
                      {v.message}
                    </td>
                    <td className="px-5 py-3 text-black">
                      {new Date(v.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => deleteVolunteer(v._id)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <a
                        href={`mailto:${v.email}`}
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

export default AdminVolunteerApplications;
