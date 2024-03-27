const mongoose = require('mongoose');

exports.connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected");
    } catch (error) {
        console.log(error);
    }
};