const express = require('express');
const router = express.Router();
const Info = require('../models/infoModel');


router.get('/', async (req, res) => {
  try {
    const info = await Info.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/', async (req, res) => {
  try {
    let info = await Info.findOne();
    if (!info) {
      info = new Info();
    }
    info.address = req.body.address;
    info.email = req.body.email;
    info.phone = req.body.phone;
    info.socialLinks = req.body.socialLinks;
    const saved = await info.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
