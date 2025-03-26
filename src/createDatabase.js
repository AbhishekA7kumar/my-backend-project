// const mongoose = require('mongoose')
// const subscriberModel = require('./models/subscribers')
// const data = require('./data')

// // Connect to DATABASE
// const DATABASE_URL = "mongodb+srv://abhishekkumar:uf9ce9FwUe1IUS4N@cluster0.ch2s7.mongodb.net/";
// mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection
// db.on('error', (err) => console.log(err))
// db.once('open', () => console.log('Database created...'))

// const refreshAll = async () => {
//     await subscriberModel.deleteMany({})
//     // console.log(connection)
//     await subscriberModel.insertMany(data)
//     await mongoose.disconnect();
// }
// refreshAll()
const mongoose = require('mongoose');
const subscriberModel = require('./models/subscribers');
const data = require('./data');

// Connect to DATABASE
const DATABASE_URL = "mongodb+srv://abhishekkumar:uf9ce9FwUe1IUS4N@cluster0.ch2s7.mongodb.net/";

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
    .then(() => console.log('Database connected...'))
    .catch((err) => console.error('Database connection error:', err));

const db = mongoose.connection;

// Handle connection errors
db.on('error', (err) => console.error('MongoDB connection error:', err));

// Refresh data in the subscribers collection
const refreshAll = async () => {
    try {
        // Delete all existing records in the subscribers collection
        await subscriberModel.deleteMany({});
        console.log('Deleted all existing subscribers.');

        // Insert new data into the subscribers collection
        await subscriberModel.insertMany(data);
        console.log('Inserted new data into subscribers collection.');

        // Disconnect from the database
        await mongoose.disconnect();
        console.log('Disconnected from the database.');
    } catch (error) {
        console.error('Error refreshing data:', error);
        process.exit(1); // Exit the process with an error code
    }
};

// Execute the refreshAll function
refreshAll();