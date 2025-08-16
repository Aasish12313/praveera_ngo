const express = require('express');
const router = express.Router();
const Member = require('../models/memberModel');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET = process.env.AWS_S3_BUCKET;

// 📌 Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Create member
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Photo is required' });

    const fileKey = `members/${uuidv4()}_${req.file.originalname}`;
    await s3.putObject({
      Bucket: BUCKET,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }).promise();

    const photoUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const member = new Member({
      name: req.body.name,
      position: req.body.position,
      photo: photoUrl
    });

    const saved = await member.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Update member (Replace image + delete old one)
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    let photoUrl = member.photo;

    // If new photo uploaded
    if (req.file) {
      const fileKey = `members/${uuidv4()}_${req.file.originalname}`;
      await s3.putObject({
        Bucket: BUCKET,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }).promise();

      // Delete old photo from S3
      if (member.photo) {
        const oldKey = member.photo.split('.com/')[1];
        if (oldKey) {
          await s3.deleteObject({ Bucket: BUCKET, Key: oldKey }).promise();
        }
      }

      photoUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    }

    // Update member data
    member.name = req.body.name || member.name;
    member.position = req.body.position || member.position;
    member.photo = photoUrl;

    const updated = await member.save();
    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Delete member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    if (member.photo) {
      const key = member.photo.split('.com/')[1];
      if (key) {
        await s3.deleteObject({ Bucket: BUCKET, Key: key }).promise();
      }
    }

    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
