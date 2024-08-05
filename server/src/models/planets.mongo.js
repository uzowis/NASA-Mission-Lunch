const mongoose = require('mongoose');

// create the database schema
const planetSchema = new mongoose.Schema({
    KeplerName : { 
        type : String, 
        required: true, 
        min : 3 
    },
});

// Create a model using the planet schema
module.exports = mongoose.model('Planet', planetSchema);