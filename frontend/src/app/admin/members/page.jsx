"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function MembersAdminPage() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", photo: null });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/members");
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("position", form.position);
    if (form.photo) fd.append("photo", form.photo);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/members/${editingId}`, fd);
        toast.success("Member updated");
      } else {
        await axios.post("http://localhost:5000/members", fd);
        toast.success("Member added");
      }
      resetForm();
      fetchMembers();
    } catch (err) {
      toast.error("Error saving member");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this member?")) return;
    try {
      await axios.delete(`http://localhost:5000/members/${id}`);
      toast.success("Member deleted");
      fetchMembers();
    } catch {
      toast.error("Error deleting member");
    }
  };

  const resetForm = () => {
    setForm({ name: "", position: "", photo: null });
    setPreview(null);
    setEditingId(null);
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setForm({ name: member.name, position: member.position, photo: null }); // keep photo null unless new file chosen
    setPreview(member.photo); // show current image
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-orange-500">
        {editingId ? "Edit Member" : "Add Member"}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md">
        {/* Name */}
        <div>
          <label className="block mb-1 text-black font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter member name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full text-black placeholder-black"
            required
          />
        </div>

        {/* Position */}
        <div>
          <label className="block mb-1 text-black font-medium">Position</label>
          <input
            type="text"
            placeholder="Enter member position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="border p-2 w-full text-black placeholder-black"
            required
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-1 text-black font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setForm({ ...form, photo: file });
              if (file) {
                setPreview(URL.createObjectURL(file));
              } else {
                setPreview(editingId ? preview : null);
              }
            }}
            className="border p-2 w-full text-black"
            required={!editingId}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover rounded-full border"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Members List */}
      <h2 className="text-lg font-semibold mb-4 text-orange-500">All Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {members.map((m) => (
          <div
            key={m._id}
            className="border p-4 rounded text-center shadow-sm"
          >
            <img
              src={m.photo}
              alt={m.name}
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
            <h3 className="font-bold mt-2 text-black">{m.name}</h3>
            <p className="text-sm text-gray-600">{m.position}</p>
            <div className="mt-3 flex justify-center gap-2">
              <button
                onClick={() => handleEdit(m)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
