
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/donationModel");
const { generateAndUploadReceipt } = require("../utils/receiptGenerator");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "donation_rcpt_" + Date.now(),
    });
    console.log("✅ Razorpay Order Created:", order);
    res.json({ success: true, order });
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// router.post("/verify", async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     name,
//     email,
//     phone,
//     amount,
//     purpose,
//     address,
//     panNumber,
//   } = req.body;

//   console.log("🔍 Incoming verification request:", req.body);

//   try {
//     const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//     hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const generatedSignature = hmac.digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       console.error("❌ Signature mismatch");
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     console.log("✅ Signature verified");

//     const payment = await razorpay.payments.fetch(razorpay_payment_id);
//     console.log("✅ Payment details fetched:", payment);

//     const mode = payment.method || "N/A";

//     const donationData = {
//       name: name.trim(),
//       email: email.trim(),
//       phone: phone.trim(),
//       amount: Number(amount),
//       purpose,
//       address,
//       panNumber: panNumber?.trim(),
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//       mode,
//     };

//     console.log("📝 Donation data to use:", donationData);

//     const { receiptUrl, receiptNumber } = await generateAndUploadReceipt(donationData);
//     console.log("📎 Receipt generated:", { receiptUrl, receiptNumber });

//     const donation = new Donation({
//       ...donationData,
//       receiptUrl,
//       receiptNumber,
//     });

//     try {
//       await donation.save();
//       console.log("✅ Donation saved in DB:", donation);
//     } catch (saveErr) {
//       console.error("❌ Error saving donation to DB:", saveErr.message, saveErr);
//       return res.status(500).json({ success: false, message: "DB Save Failed" });
//     }

//     res.json({ success: true, receiptUrl, receiptNumber });

//   } catch (err) {
//     console.error("❌ General error in /verify:", err.message, err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });
// router.post("/verify", async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     name,
//     email,
//     phone,
//     amount,
//     purpose,
//     address,
//     panNumber,
//   } = req.body;

//   console.log("🔍 Incoming verification request:", req.body);

//   try {
//     const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//     hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const generatedSignature = hmac.digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       console.error("❌ Signature mismatch");
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     console.log("✅ Signature verified");

//     // Fetch full payment details from Razorpay
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);
//     console.log("✅ Payment details fetched:", payment);

//     const mode = payment.method || "N/A";

//     // 🔥 Pull notes directly from Razorpay payment if available
//     const donationData = {
//       name: name?.trim() || payment.notes?.name,
//       email: email?.trim() || payment.email,
//       phone: phone?.trim() || payment.contact,
//       amount: Number(amount) || payment.amount / 100,
//       purpose: payment.notes?.purpose || purpose,
//       address: payment.notes?.address || address,
//       panNumber: payment.notes?.panNumber || panNumber,
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//       mode,
//     };

//     console.log("📝 Donation data to use:", donationData);

//     // Generate receipt
//     const { receiptUrl, receiptNumber } = await generateAndUploadReceipt(donationData);
//     console.log("📎 Receipt generated:", { receiptUrl, receiptNumber });

//     // Save in DB
//     const donation = new Donation({
//       ...donationData,
//       receiptUrl,
//       receiptNumber,
//     });

//     await donation.save();
//     console.log("✅ Donation saved in DB:", donation);

//     res.json({ success: true, receiptUrl, receiptNumber });

//   } catch (err) {
//     console.error("❌ General error in /verify:", err.message, err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });
router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    phone,
    amount,
    purpose,
    address,
    panNumber,
  } = req.body;

  console.log("🔍 Incoming verification request:", req.body);

  try {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("❌ Signature mismatch");
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    console.log("✅ Signature verified");

    // Fetch full payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    console.log("✅ Payment details fetched:", payment);

    const mode = payment.method || "N/A";

    // Pull notes directly from Razorpay payment if available
    const donationData = {
      name: name?.trim() || payment.notes?.name,
      email: email?.trim() || payment.email,
      phone: phone?.trim() || payment.contact,
      amount: Number(amount) || payment.amount / 100,
      purpose: payment.notes?.purpose || purpose,
      address: payment.notes?.address || address,
      panNumber: payment.notes?.panNumber || panNumber,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      mode,
    };

    console.log("📝 Donation data to save first:", donationData);

    // ✅ Step 1: Save donation first so MongoDB generates _id
    const donation = new Donation(donationData);
    await donation.save();

    // ✅ Step 2: Generate receipt with donation._id
    const { receiptUrl, receiptNumber } = await generateAndUploadReceipt(donation.toObject());
    console.log("📎 Receipt generated:", { receiptUrl, receiptNumber });

    // ✅ Step 3: Update donation with receipt details
    donation.receiptUrl = receiptUrl;
    donation.receiptNumber = receiptNumber;
    await donation.save();

    console.log("✅ Donation saved in DB with receipt:", donation);

    res.json({ success: true, receiptUrl, receiptNumber });

  } catch (err) {
    console.error("❌ General error in /verify:", err.message, err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.json({ success: true, donations });
  } catch (err) {
    console.error("❌ Admin Fetch Error:", err);
    res.status(500).json({ success: false, message: "Could not fetch donations" });
  }
});

module.exports = router;
