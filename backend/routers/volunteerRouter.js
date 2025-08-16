const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Volunteer = require('../models/volunteerModel');

router.post('/add', async (req, res) => {
  try {
    const { name, email, phone, message, area } = req.body;
    const newVolunteer = new Volunteer({ name, email, phone, message, area });
    const saved = await newVolunteer.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/getall', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Volunteer not found' });
    res.status(200).json({ message: 'Deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
