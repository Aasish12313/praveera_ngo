const express = require('express');
const Application = require('../models/applicationModel');

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { name, email, phone, message, position, resumeUrl } = req.body;
    if (!resumeUrl) return res.status(400).json({ message: 'Resume URL missing' });

    const newApp = new Application({ name, email, phone, message, position, resumeUrl });
    const saved = await newApp.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/getall', async (req, res) => {
  try {
    const data = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
