const mongoose = require('../connection');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  photo: { type: String, required: true }, // S3 URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);
