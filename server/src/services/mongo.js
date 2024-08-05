const mongoose = require('mongoose');
require('dotenv').config();


// Get the Mongodb Connection URL
const Mongo_URL = process.env.MONGO_URL;

// Handle database connection events.
mongoose.connection.once('open', () =>{
    console.log('MongoDB connection is ready');
});

mongoose.connection.on('error', (err) =>{
    console.error(`Error connecting to DB: ${err}`);
})

// Connect to Mongodb using mongoose
async function mongoConnet (){
    await mongoose.connect(Mongo_URL);
}

// Terminate DB connection
async function mongoDisconnet (){
    await mongoose.disconnect(Mongo_URL);
}

// Export the connection functions
module.exports = {
    mongoConnet,
    mongoDisconnet,
}