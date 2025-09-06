'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const FooterEditor = () => {
  const [info, setInfo] = useState({
    address: '',
    email: '',
    phone: ['', ''],
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/info');
      setInfo(
        res.data || {
          address: '',
          email: '',
          phone: ['', ''],
          socialLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch footer info');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:5000/api/info', info);
      toast.success('✅ Footer Info Updated Successfully');
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to update footer info');
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-[360px] border border-gray-100 flex flex-col items-center justify-center">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-lg font-bold text-gray-800 mb-2">📝 Edit Footer Details</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl"
      >
        Edit
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg space-y-4 relative border border-gray-300">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h2 className="text-lg font-bold text-black">📝 Edit Footer Contact Info</h2>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-black">Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded text-black"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
              />

              <label className="block text-sm font-semibold text-black">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded text-black"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />

              <label className="block text-sm font-semibold text-black">Phone 1</label>
              <input
                type="tel"
                className="w-full p-2 border rounded text-black"
                value={info.phone[0]}
                onChange={(e) =>
                  setInfo({ ...info, phone: [e.target.value, info.phone[1]] })
                }
              />

              <label className="block text-sm font-semibold text-black">Phone 2</label>
              <input
                type="tel"
                className="w-full p-2 border rounded text-black"
                value={info.phone[1]}
                onChange={(e) =>
                  setInfo({ ...info, phone: [info.phone[0], e.target.value] })
                }
              />
            </div>

            <h3 className="font-semibold mt-4 text-black">Social Links</h3>
            <div className="space-y-3">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-black">
                    {key.charAt(0).toUpperCase() + key.slice(1)} URL
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black"
                    value={info.socialLinks[key]}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        socialLinks: { ...info.socialLinks, [key]: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterEditor;
