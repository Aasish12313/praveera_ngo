const mongoose = require('../connection');

const infoSchema = new mongoose.Schema({
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: [{ type: String }],
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Info', infoSchema);
