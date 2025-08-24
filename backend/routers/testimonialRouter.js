const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonialModel');


router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/recent', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(3);
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const newTestimonial = new Testimonial({ name, email, comment });
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
