const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  story: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
