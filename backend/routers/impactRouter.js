const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const ImpactCard = require('../models/impactCardModel');
const Story = require('../models/storyModel');

const router = express.Router();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Multer S3 upload
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `impact/${Date.now()}-${file.originalname}`);
    }
  })
});

// ==================== Impact Cards ====================

// Add Card
router.post('/cards/add', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const newCard = new ImpactCard({
      title,
      description,
      imageUrl: req.file.location
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    console.error('Add card error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all Cards
router.get('/cards', async (req, res) => {
  try {
    const cards = await ImpactCard.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Fetch cards failed' });
  }
});

// Delete Card
router.delete('/cards/delete/:id', async (req, res) => {
  try {
    const deleted = await ImpactCard.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Card deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Update Card
router.put('/cards/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      updateData.imageUrl = req.file.location; // Update image only if new file uploaded
    }

    const updatedCard = await ImpactCard.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedCard);
  } catch (err) {
    console.error('Update card error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// ==================== Stories ====================

// Add Story
router.post('/stories/add', upload.single('image'), async (req, res) => {
  try {
    const { name, story } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const newStory = new Story({
      name,
      story,
      imageUrl: req.file.location
    });

    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    console.error('Add story error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all Stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Fetch stories failed' });
  }
});

// Delete Story
router.delete('/stories/delete/:id', async (req, res) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Story deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Update Story
router.put('/stories/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, story } = req.body;
    const updateData = { name, story };

    if (req.file) {
      updateData.imageUrl = req.file.location; // Update image only if new file uploaded
    }

    const updatedStory = await Story.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedStory);
  } catch (err) {
    console.error('Update story error:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// ==================== Combined Get for Frontend ====================

router.get('/', async (req, res) => {
  try {
    const cards = await ImpactCard.find().sort({ createdAt: -1 });
    const stories = await Story.find().sort({ createdAt: -1 });
    res.status(200).json({ cards, stories });
  } catch (err) {
    res.status(500).json({ message: 'Fetch impact failed' });
  }
});

module.exports = router;
