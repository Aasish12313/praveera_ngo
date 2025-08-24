const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = 5000;

require('./connection');

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// ====== Existing Routes ======
app.get('/', (req, res) => {
  res.send('response from express');
});

app.get('/add', (req, res) => {
  res.send('response from add');
});

app.get('/getall', (req, res) => {
  res.send('response from getall');
});

app.get('/delete', (req, res) => {
  res.send('response from delete');
});

// ====== Contact API Routes ======
const contactRouter = require('./routers/contactRouter');
app.use('/api/contact', contactRouter);

const memberRouter = require('./routers/memberRouter'); // ✅ Added
app.use('/members', memberRouter); // ✅ Added

const applicationUploadRouter = require('./routers/applicationUploadRouter'); 
app.use('/applications', applicationUploadRouter);

const volunteerRouter = require('./routers/volunteerRouter');
app.use('/volunteers', volunteerRouter);


const infoRouter = require('./routers/infoRouter');
app.use('/api/info', infoRouter);


const eventRouter = require('./routers/eventRouter');
app.use('/events', eventRouter);

const galleryRouter = require('./routers/galleryRouter');
app.use('/gallery', galleryRouter);

const testimonialRouter = require('./routers/testimonialRouter');
app.use('/testimonial', testimonialRouter);

const impactRouter = require('./routers/impactRouter'); // <- new
app.use('/impact', impactRouter); // <- impact endpoint

const partnerRouter = require('./routers/partnerRouter'); // Add this line
app.use('/api/partners', partnerRouter); // Add this below other `app.use(...)` lines




// ====== Start Server ======
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});

// Error Handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception thrown:', err);
});
