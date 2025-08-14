require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;

if (!url) {
    console.error('❌ MONGODB_URL is not defined. Check your .env.local file.');
    process.exit(1);
}

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Database connected');
})
.catch((err) => {
    console.error('❌ Database connection error:', err);
});

module.exports = mongoose;
