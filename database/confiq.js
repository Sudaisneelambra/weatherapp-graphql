const mongoose = require('mongoose');
require('dotenv').config()
const db_url=process.env.DB_URL
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(db_url)
        console.log("mongodb connected")
    } catch (error) {
        console.log("failed to connect with mongodb", error)
    }
}

module.exports = {
    connectDB,
};