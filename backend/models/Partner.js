const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true }, // AWS S3 URL
  url: { type: String, required: true },
  type: { type: String, enum: ['partner', 'collaborator'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);
