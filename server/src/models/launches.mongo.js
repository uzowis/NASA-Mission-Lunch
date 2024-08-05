const mongoose = require('mongoose');

// Create the Launch schema
const LaunchesSchema = new mongoose.Schema({
    flightNumber : { 
        type : Number,
        required : true,
    },
    launchDate : {
        type : Date,
        required : true,
    },
    mission : {
        type : String,
        required : true,
    },
    rocket : {
        type : String,
        required : true,
    },
    target : {
        type : String,
    },
    customer : [ String ],
    upcoming : {
        type : Boolean,
        required : true,
        default : true,
    },
    success : {
        type : Boolean,
        required : true,
        default : true,
    }

    
});

// Generate a Launches Model using the schema.
module.exports = mongoose.model('Launch', LaunchesSchema);