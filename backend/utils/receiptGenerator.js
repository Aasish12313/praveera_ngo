

const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const Donation = require("../models/donationModel");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const generateReceiptNumber = async () => {
  const today = new Date();
  const datePart = today.toISOString().split("T")[0].replace(/-/g, "");
  const start = new Date(today.setHours(0, 0, 0, 0));
  const end = new Date(today.setHours(23, 59, 59, 999));
  const count = await Donation.countDocuments({ date: { $gte: start, $lte: end } });
  return `RECPT-${datePart}-${String(count + 1).padStart(3, "0")}`;
};

const drawTable = (doc, details, startX, startY, columnWidths) => {
  const rowHeight = 25;
  const [labelWidth, valueWidth] = columnWidths;

  details.forEach(([label, value], idx) => {
    const y = startY + idx * rowHeight;

    // Draw background stripe for even rows
    if (idx % 2 === 0) {
      doc.rect(startX, y, labelWidth + valueWidth, rowHeight).fill("#f9f9f9").fillColor("black");
    }

    // Draw borders
    doc.rect(startX, y, labelWidth, rowHeight).stroke();
    doc.rect(startX + labelWidth, y, valueWidth, rowHeight).stroke();

    // Add text
    doc.font("Helvetica-Bold").fontSize(11).text(label, startX + 8, y + 7, {
      width: labelWidth - 10,
      align: "left",
    });
    doc.font("Helvetica").fontSize(11).text(value || "—", startX + labelWidth + 8, y + 7, {
      width: valueWidth - 10,
      align: "left",
    });
  });
};

const generateAndUploadReceipt = async (donationData) => {
  const receiptNumber = await generateReceiptNumber();

  try {
    const passThroughStream = new PassThrough();
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.pipe(passThroughStream);

    // Border
    doc.lineWidth(1).strokeColor("#ccc").rect(40, 40, doc.page.width - 80, doc.page.height - 80).stroke();

    // Watermark
    // const watermarkPath = path.join(__dirname, "/assets/logo-bgg.png");
    // if (fs.existsSync(watermarkPath)) {
    //   doc.image(watermarkPath, doc.page.width / 2 - 150, doc.page.height / 2 - 150, {
    //     width: 300,
    //     opacity: 0.02,
    //   });
    // }
const watermarkPath = path.join(__dirname, "/assets/bg.png");

if (fs.existsSync(watermarkPath)) {
  doc.opacity(0.1); // Set desired opacity here (e.g., 0.1 or 0.2)
  doc.image(
    watermarkPath,
    doc.page.width / 2 - 150,
    doc.page.height / 2 - 150,
    { width: 300 }
  );
  doc.opacity(1); // Reset opacity back to full for subsequent content
}


    // Top logo
    const topLogoPath = path.join(__dirname, "/assets/bg.png");
    if (fs.existsSync(topLogoPath)) {
      doc.image(topLogoPath, doc.page.width / 2 - 40, 55, {
        width: 80,
        height: 80,
        align: "center",
        valign: "top",
      });
    }

    // Header
    doc.moveDown(6);
    doc.fontSize(20).fillColor("#0D47A1").text("Visoka Welfare Foundation", { align: "center" });
    doc.fontSize(12).fillColor("gray").text("A registered non-profit organization", { align: "center" });
    doc.moveDown(1.5);
    doc.fontSize(16).fillColor("#2E7D32").text("DONATION RECEIPT", { align: "center", underline: true });

    // Certificate sentence
    doc.moveDown(2);
    doc.fontSize(12).fillColor("black")
      .text("This is to certify that ", { continued: true })
      .font("Helvetica-Bold").text(donationData.name, { continued: true })
      .font("Helvetica").text(" has generously donated ₹     ", { continued: true })
      .font("Helvetica-Bold").text(`${donationData.amount}`, { continued: true })
      .font("Helvetica").text(" to Visoka Welfare Foundation on ", { continued: true })
      .text(`${new Date().toLocaleDateString()}.`);

    // Tabular Data
    const details = [
      ["ID", donationData._id],
      ["Receipt Number", receiptNumber],
      ["Purpose", donationData.purpose],
      ["Email", donationData.email],
      ["Phone", donationData.phone],
      ["Address", donationData.address],
      ["PAN Number", donationData.panNumber],
      ["Payment ID", donationData.paymentId],
      ["Order ID", donationData.orderId],
      ["Mode of Payment", donationData.mode?.toUpperCase() || "N/A"],
      ["Date of Donation", new Date().toLocaleString()],
    ];

    doc.moveDown(2);
    drawTable(doc, details, 60, doc.y, [160, 370]);

    // Signature line
    doc.moveDown(4);
    doc.strokeColor("#333").lineWidth(1).moveTo(doc.page.width - 180, doc.y).lineTo(doc.page.width - 60, doc.y).stroke();
    doc.fontSize(10).fillColor("#000").text("Authorized Signatory", doc.page.width - 170, doc.y + 5);

    // Footer note
    doc.moveDown(3);
    doc.fontSize(10).fillColor("gray").text("Thank you for supporting our cause and making a difference.", { align: "center" });

    doc.end();

    // Upload to S3
    const receiptKey = `receipts/${receiptNumber}.pdf`;
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: receiptKey,
      Body: passThroughStream,
      ContentType: "application/pdf",
    }).promise();

    return {
      receiptUrl: uploadResult.Location,
      receiptNumber,
    };

  } catch (err) {
    console.error("❌ Receipt generation/upload failed:", err);
    throw new Error("🚨 Receipt generation failed — see logs above.");
  }
};

module.exports = { generateAndUploadReceipt };
