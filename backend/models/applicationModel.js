const { Schema, model} = require('../connection');

const applicationSchema = new Schema({
   name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  position: { type: String },
  resumeUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = model('applications', applicationSchema);