
const { Schema, model} = require('../connection');

const contactSchema = new Schema({
    name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Enter valid 10-digit phone number'],
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

module.exports = model('contacts', contactSchema);