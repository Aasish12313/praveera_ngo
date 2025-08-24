'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AdminImpactPage = () => {
  const [cards, setCards] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [cardForm, setCardForm] = useState({ title: '', description: '', image: null });
  const [storyForm, setStoryForm] = useState({ name: '', story: '', image: null });

  // Edit states
  const [editingCardId, setEditingCardId] = useState(null);
  const [editingStoryId, setEditingStoryId] = useState(null);

  useEffect(() => {
    fetchImpact();
  }, []);

  const fetchImpact = async () => {
    try {
      const res = await axios.get('http://localhost:5000/impact');
      setCards(res.data.cards);
      setStories(res.data.stories);
    } catch (err) {
      console.error('Fetch impact failed:', err);
      toast.error('Failed to load impact data');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleCardChange = (e) => {
    if (e.target.name === 'image') {
      setCardForm({ ...cardForm, image: e.target.files[0] });
    } else {
      setCardForm({ ...cardForm, [e.target.name]: e.target.value });
    }
  };

  const handleStoryChange = (e) => {
    if (e.target.name === 'image') {
      setStoryForm({ ...storyForm, image: e.target.files[0] });
    } else {
      setStoryForm({ ...storyForm, [e.target.name]: e.target.value });
    }
  };

  // Add or Update Card
  const submitCard = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', cardForm.title);
    formData.append('description', cardForm.description);
    if (cardForm.image) formData.append('image', cardForm.image);

    try {
      if (editingCardId) {
        const res = await axios.put(`http://localhost:5000/impact/cards/update/${editingCardId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCards(cards.map(c => c._id === editingCardId ? res.data : c));
        toast.success('Card updated successfully');
        setEditingCardId(null);
      } else {
        const res = await axios.post('http://localhost:5000/impact/cards/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCards([res.data, ...cards]);
        toast.success('Card added successfully');
      }
      setCardForm({ title: '', description: '', image: null });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit card');
    }
  };

  // Add or Update Story
  const submitStory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', storyForm.name);
    formData.append('story', storyForm.story);
    if (storyForm.image) formData.append('image', storyForm.image);

    try {
      if (editingStoryId) {
        const res = await axios.put(`http://localhost:5000/impact/stories/update/${editingStoryId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setStories(stories.map(s => s._id === editingStoryId ? res.data : s));
        toast.success('Story updated successfully');
        setEditingStoryId(null);
      } else {
        const res = await axios.post('http://localhost:5000/impact/stories/add', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setStories([res.data, ...stories]);
        toast.success('Story added successfully');
      }
      setStoryForm({ name: '', story: '', image: null });
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit story');
    }
  };

  // Delete Card with toast confirmation
  const deleteCard = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to delete this card?</span>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:5000/impact/cards/delete/${id}`);
                setCards(cards.filter(c => c._id !== id));
                toast.success('Card deleted');
              } catch (err) {
                console.error(err);
                toast.error('Failed to delete card');
              }
              toast.dismiss(t.id);
            }}
            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  // Delete Story with toast confirmation
  const deleteStory = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to delete this story?</span>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:5000/impact/stories/delete/${id}`);
                setStories(stories.filter(s => s._id !== id));
                toast.success('Story deleted');
              } catch (err) {
                console.error(err);
                toast.error('Failed to delete story');
              }
              toast.dismiss(t.id);
            }}
            className="bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  // Edit functions
  const editCard = (card) => {
    setCardForm({ title: card.title, description: card.description, image: null });
    setEditingCardId(card._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const editStory = (story) => {
    setStoryForm({ name: story.name, story: story.story, image: null });
    setEditingStoryId(story._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <p className="text-center mt-20 font-bold text-black">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-black">Impact Management</h1>

      {/* ====== Card Form ====== */}
      <section className="mb-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {editingCardId ? 'Edit Card' : 'Add New Card'}
        </h2>
        <form onSubmit={submitCard} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Card Title"
            value={cardForm.title}
            onChange={handleCardChange}
            className="border p-2 rounded font-bold text-black"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={cardForm.description}
            onChange={handleCardChange}
            className="border p-2 rounded font-bold text-black"
            required
          />
          <input type="file" name="image" onChange={handleCardChange} accept="image/*" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">
            {editingCardId ? 'Update Card' : 'Add Card'}
          </button>
        </form>

        {/* Existing Cards */}
        {cards.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {cards.map((card) => (
              <div key={card._id} className="bg-white p-4 rounded-xl shadow-md relative">
                <img src={card.imageUrl} alt={card.title} className="h-40 w-full object-cover rounded" />
                <h3 className="mt-2 font-bold text-black">{card.title}</h3>
                <p className="text-black font-bold">{card.description}</p>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => editCard(card)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCard(card._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ====== Story Form ====== */}
      <section className="mb-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-black">
          {editingStoryId ? 'Edit Story' : 'Add New Story'}
        </h2>
        <form onSubmit={submitStory} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={storyForm.name}
            onChange={handleStoryChange}
            className="border p-2 rounded font-bold text-black"
            required
          />
          <textarea
            name="story"
            placeholder="Story"
            value={storyForm.story}
            onChange={handleStoryChange}
            className="border p-2 rounded font-bold text-black"
            required
          />
          <input type="file" name="image" onChange={handleStoryChange} accept="image/*" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold">
            {editingStoryId ? 'Update Story' : 'Add Story'}
          </button>
        </form>

        {/* Existing Stories */}
        {stories.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {stories.map((story) => (
              <div key={story._id} className="bg-white p-4 rounded-xl shadow-md relative">
                <img src={story.imageUrl} alt={story.name} className="h-40 w-full object-cover rounded" />
                <h3 className="mt-2 font-bold text-black">{story.name}</h3>
                <p className="text-black font-bold">{story.story}</p>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => editStory(story)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStory(story._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminImpactPage;
