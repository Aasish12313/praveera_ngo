const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyAdmin = require('../middleware/adminMiddleware');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();


const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;



router.get('/verify', verifyAdmin, (req, res) => {
    res.json({ message: "Admin verified" });
    
    
  });


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  
  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Unauthorized: Invalid Email" });
  }

 
  const validPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!validPassword) {
    
    return res.status(401).json({ message: "Unauthorized: Incorrect Password" });
  }

  
  const token = jwt.sign({ email: ADMIN_EMAIL, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '20min' });

  

  res.json({ token });
});

module.exports = router;
