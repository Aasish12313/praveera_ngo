const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Gallery = require('../models/galleryModel');

const router = express.Router();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Multiple images upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `gallery/${Date.now()}-${file.originalname}`);
    },
  }),
});

router.post('/add', upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const galleryItems = req.files.map((file) => ({ imageUrl: file.location }));
    const saved = await Gallery.insertMany(galleryItems);

    res.status(201).json(saved);
  } catch (err) {
    console.error('Gallery upload error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
