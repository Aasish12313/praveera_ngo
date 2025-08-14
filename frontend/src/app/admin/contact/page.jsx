'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminContactPage() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error('Failed to fetch messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <div>
        <p className="mb-2">Are you sure you want to delete this message?</p>
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:5000/api/contact/${id}`);
                setMessages((prev) => prev.filter((msg) => msg._id !== id));
                toast.dismiss(t.id);
                toast.success('Message deleted successfully');
              } catch (err) {
                console.error('Error deleting message:', err);
                toast.error('Failed to delete message');
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const handleReply = (email, subject) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-bold mb-4 text-pink-600">
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <p className="text-black">No messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm border border-black border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-black">
                <th className="py-2 px-4 border border-black">Name</th>
                <th className="py-2 px-4 border border-black">Email</th>
                <th className="py-2 px-4 border border-black">Subject</th>
                <th className="py-2 px-4 border border-black">Message</th>
                <th className="py-2 px-4 border border-black">Date</th>
                <th className="py-2 px-4 border border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="text-black hover:bg-gray-50 transition">
                  <td className="py-2 px-4 border border-black">{msg.name}</td>
                  <td className="py-2 px-4 border border-black">{msg.email}</td>
                  <td className="py-2 px-4 border border-black">{msg.subject}</td>
                  <td className="py-2 px-4 border border-black">{msg.message}</td>
                  <td className="py-2 px-4 border border-black">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border border-black">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(msg.email, msg.subject)}
                        className="bg-pink-500 text-white px-3 py-1 rounded shadow-md hover:bg-pink-600 hover:shadow-lg transition"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 hover:shadow-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
