
    const mongoose = require('mongoose');
    const url=  process.env.MONGODB_URL 
    // asynchroneous function - returns Promise
    mongoose.connect(url)
        .then((result) => {
            console.log('database connected');
        })
        .catch((err) => {
            console.log(err);
        });

    module.exports =  mongoose;