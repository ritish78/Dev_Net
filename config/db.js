const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectMongo = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB!');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
        //Exit the process if we can't connect to MongoDB.
        process.exit(1);
    }
}

module.exports = connectMongo;