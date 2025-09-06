const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');


router.get('/all', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/add', async (req, res) => {
  try {
    const { name, date, targetAmount, location } = req.body;
    const newEvent = new Event({ name, date, targetAmount, location });
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          date: req.body.date,
          targetAmount: req.body.targetAmount,
          location: req.body.location,
        },
      },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id/complete', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.isCompleted = !event.isCompleted;
    const updated = await event.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
