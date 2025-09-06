const mongoose = require('../connection');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    comment: { type: String, required: true }
  },
  {
    timestamps: true  // ➕ adds both createdAt and updatedAt automatically
  }
);


module.exports = mongoose.model('Testimonial', testimonialSchema);
