const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
        });
        console.log('mongoDB connected successfully')
    } catch (err) {
        console.error(err.message);
                process.exit(1);
    }
    
}

module.exports = connectDB;