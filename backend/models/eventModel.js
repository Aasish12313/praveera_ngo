const mongoose = require('../connection');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  location: { type: String, required: true },  // ✅ Added location field
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
