
const mongoose=require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;

const db_connect = async () => {

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error('Connection failed: ',err);
        process.exit(1);
    }
};

module.exports = db_connect;