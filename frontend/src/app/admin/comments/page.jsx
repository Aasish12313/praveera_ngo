'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function AdminTestimonialPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/testimonial');
      setTestimonials(res.data);
    } catch (err) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    confirmToast('Are you sure you want to delete this testimonial?', async () => {
      try {
        await axios.delete(`http://localhost:5000/testimonial/${id}`);
        setTestimonials(testimonials.filter((t) => t._id !== id));
        toast.success('Deleted successfully');
      } catch (err) {
        toast.error('Delete failed');
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-slate-100 p-6 sm:p-10">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-center text-black">All Testimonials</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-gray-500">No testimonials available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
                <thead className="bg-slate-200 text-black text-sm">
                  <tr>
                    <th className="px-5 py-3 text-left">Name</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Comment</th>
                    <th className="px-5 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-black text-sm">
                  {testimonials.map((t) => (
                    <tr key={t._id} className="border-b hover:bg-slate-100 transition">
                      <td className="px-5 py-3 font-medium">{t.name}</td>
                      <td className="px-5 py-3">{t.email}</td>
                      <td className="px-5 py-3 max-w-md italic">“{t.comment}”</td>
                      <td className="px-5 py-3 text-center">
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
