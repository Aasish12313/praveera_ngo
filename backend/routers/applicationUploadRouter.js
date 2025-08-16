const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Application = require('../models/applicationModel');

const router = express.Router();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    contentDisposition: 'inline', 
    key: function (req, file, cb) {
      cb(null, `resumes/${Date.now()}-${file.originalname}`);
    }
  })
});


router.post('/add', upload.single('resume'), async (req, res) => {
  console.log('Received POST /applications/add');
  try {
    const { name, email, phone, message, position } = req.body;

    if (!req.file) {
      console.error('No file received');
      return res.status(400).json({ message: 'Resume file missing' });
    }

    const resumeUrl = req.file.location;
    const newApp = new Application({ name, email, phone, message, position, resumeUrl });
    const saved = await newApp.save();

    res.status(200).json(saved);
  } catch (err) {
    console.error('Application upload error:', err);
    console.error('Request body:', req.body);
    console.error('Request file:', req.file);
    res.status(500).json({ message: 'Server error', error: err.message || err });
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

