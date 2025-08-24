'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AdminPartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [partnerForm, setPartnerForm] = useState({ name: '', url: '', logo: null });
  const [collabForm, setCollabForm] = useState({ name: '', url: '', logo: null });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/partners');
      setPartners(res.data.filter(p => p.type === 'partner'));
      setCollaborators(res.data.filter(p => p.type === 'collaborator'));
    } catch {
      toast.error('Failed to fetch data');
    }
  };

  const handlePartnerChange = (e) => {
    if (e.target.name === 'logo') setPartnerForm({ ...partnerForm, logo: e.target.files[0] });
    else setPartnerForm({ ...partnerForm, [e.target.name]: e.target.value });
  };

  const handleCollabChange = (e) => {
    if (e.target.name === 'logo') setCollabForm({ ...collabForm, logo: e.target.files[0] });
    else setCollabForm({ ...collabForm, [e.target.name]: e.target.value });
  };

  const handleAdd = async (form, type) => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('url', form.url);
    formData.append('type', type);
    if (form.logo) formData.append('logo', form.logo);

    try {
      await axios.post('http://localhost:5000/api/partners/add', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(`${type === 'partner' ? 'Partner' : 'Collaborator'} added successfully`);
      if (type === 'partner') setPartnerForm({ name: '', url: '', logo: null });
      else setCollabForm({ name: '', url: '', logo: null });
      fetchData();
    } catch {
      toast.error('Failed to add');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/partners/delete/${id}`);
      toast.success('Deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-black">Manage Partners & Collaborators</h1>

      {/* Partner Form */}
      <section className="mb-6 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-black">Add Partner</h2>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleAdd(partnerForm, 'partner'); }}>
          <input type="text" name="name" placeholder="Name" value={partnerForm.name} onChange={handlePartnerChange} className="border p-2 rounded text-black" required />
          <input type="url" name="url" placeholder="Website URL" value={partnerForm.url} onChange={handlePartnerChange} className="border p-2 rounded text-black" />
          <input type="file" name="logo" onChange={handlePartnerChange} accept="image/*" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Partner</button>
        </form>

        {/* Display Partners */}
        {partners.length > 0 && (
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {partners.map(p => (
              <div key={p._id} className="bg-gray-50 p-4 rounded-xl shadow relative text-center">
                {p.logoUrl && <img src={p.logoUrl} alt={p.name} className="h-24 w-full object-contain mb-2 mx-auto" />}
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:underline block">{p.name}</a>
                <div className="absolute top-2 right-2">
                  <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Collaborator Form */}
      <section className="mb-6 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-black">Add Collaborator</h2>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleAdd(collabForm, 'collaborator'); }}>
          <input type="text" name="name" placeholder="Name" value={collabForm.name} onChange={handleCollabChange} className="border p-2 rounded text-black" required />
          <input type="url" name="url" placeholder="Website URL" value={collabForm.url} onChange={handleCollabChange} className="border p-2 rounded text-black" />
          <input type="file" name="logo" onChange={handleCollabChange} accept="image/*" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Collaborator</button>
        </form>

        {/* Display Collaborators */}
        {collaborators.length > 0 && (
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {collaborators.map(c => (
              <div key={c._id} className="bg-gray-50 p-4 rounded-xl shadow relative text-center">
                {c.logoUrl && <img src={c.logoUrl} alt={c.name} className="h-24 w-full object-contain mb-2 mx-auto" />}
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:underline block">{c.name}</a>
                <div className="absolute top-2 right-2">
                  <button onClick={() => handleDelete(c._id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPartnersPage;
