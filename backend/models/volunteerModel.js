const { Schema, model} = require('../connection');

const volunteerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  area: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = model('volunteers', volunteerSchema);