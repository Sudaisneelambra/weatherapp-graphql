const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/weatherapp')
        console.log("mongodb connected")
    } catch (error) {
        console.log("failed to connect with mongodb", error)
    }
}

module.exports = {
    connectDB,
};