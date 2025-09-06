
const express = require('express');
const Contact = require('../models/contactModel');

const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const { name, email, message , phone } = req.body;

        if (!name || !email || !message || !phone) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newContact = new Contact({ name, email, message, phone });
        await newContact.save();

        res.status(200).json({ message: 'Message submitted successfully.' });
    } catch (error) {
        console.error('Contact submission error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/getall', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve messages', error: err });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully', data: deleted });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete message', error: err });
    }
});

module.exports = router;
