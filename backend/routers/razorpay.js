const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/Donation");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const router = express.Router();
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});
    console.log("Razorpay initialized with key ID: ",  process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay key secret:", process.env.RAZORPAY_KEY_SECRET);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

    console.log("email transporter created with user: ", process.env.EMAIL_USER);
    console.log("email transporter created with pass: ", process.env.EMAIL_PASS);

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "donation_rcpt_" + Date.now()
  });
  res.json({ success: true, order });
});

router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    phone,
    amount,
    purpose
  } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  const donation = new Donation({
    name,
    email,
    phone,
    amount,
    purpose,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id
  });
  await donation.save();

  const receiptPath = path.join(__dirname, `../receipts/${razorpay_payment_id}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(receiptPath));
  doc.fontSize(20).text("Donation Receipt", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Phone: ${phone}`);
  doc.text(`Amount: ₹${amount}`);
  doc.text(`Purpose: ${purpose}`);
  doc.text(`Payment ID: ${razorpay_payment_id}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);
  doc.end();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    cc: process.env.EMAIL_USER, // CC to admin
    subject: "Thank You for Your Donation - Receipt Included",
    html: `<p>Dear ${name},</p><p>Thank you for donating ₹${amount} towards ${purpose}. Your support means a lot!</p>`,
    attachments: [
      {
        filename: "receipt.pdf",
        path: receiptPath
      }
    ]
  });

  res.json({ success: true, message: "Donation verified and receipt sent" });
});

router.get("/all", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;