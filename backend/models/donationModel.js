const { Schema, model} = require('../connection');

const donationSchema = new Schema({
 name: String,
  email: String,
  phone: String,
  amount: Number,
  purpose: String,
  address: String,
  panNumber: String,
  mode: String,
  paymentId: String,
  orderId: String,
  receiptUrl: String,
  receiptNumber: String,
  date: { type: Date, default: Date.now }
});


module.exports = model('donations', donationSchema);