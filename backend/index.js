const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = 5000;

require('./connection');

// Middleware
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());


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


const contactRouter = require('./routers/contactRouter');
app.use('/contacts', contactRouter);

const memberRouter = require('./routers/memberRouter'); 
app.use('/members', memberRouter);

const applicationUploadRouter = require('./routers/applicationUploadRouter'); 
app.use('/applications', applicationUploadRouter);

const volunteerRouter = require('./routers/volunteerRouter');
app.use('/volunteers', volunteerRouter);



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
