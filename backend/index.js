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

app.listen(port, () => {
console.log( `✅ Server started on http://localhost:${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UnhaNdled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception thrown:', err);

});