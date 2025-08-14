const { Schema, model } = require('../connection');

const contactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Contact', contactSchema);
