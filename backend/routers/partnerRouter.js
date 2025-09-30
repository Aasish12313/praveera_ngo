const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Partner = require('../models/Partner');

const router = express.Router();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Multer + S3 setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `partners/${Date.now()}-${file.originalname}`);
    }
  })
});

// ===== GET all =====
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== ADD =====
// router.post('/add', upload.single('logo'), async (req, res) => {
//   try {
//     const { name, url, type } = req.body;
//     const logoUrl = req.file ? req.file.location : '';
//     const newItem = new Partner({ name, url, type, logoUrl });
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.post('/add', upload.single('logo'), async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const { name, url, type } = req.body;
    const logoUrl = req.file ? req.file.location : '';
    const newItem = new Partner({ name, url, type, logoUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error in /api/partners/add:", err); // add this
    res.status(500).json({ message: err.message });
  }
});

// ===== UPDATE =====
router.put('/update/:id', upload.single('logo'), async (req, res) => {
  try {
    const item = await Partner.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const { name, url, type } = req.body;
    if (name) item.name = name;
    if (url) item.url = url;
    if (type) item.type = type;
    if (req.file) item.logoUrl = req.file.location;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===== DELETE =====
router.delete('/delete/:id', async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
