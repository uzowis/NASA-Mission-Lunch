const Launches = require('./launches.mongo');
const Planets = require('./planets.mongo');

// const launches = new Map();

const DEFAULT_FLIGHTNUMBER = 100;

// Program flow;
// Preset Launch data
const launch = {
    flightNumber : 100,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer IS1',
    launchDate : new Date('August 29, 2026'),
    target : 'Kepler-1652 b',
    customer : ['ZTM', 'NASA', 'SPACE X'],
    upcoming : true,
    success : true
};

// Function to save the preset Launch data
async function saveLaunch (launch) {

        // Check if the target planet exists in the planet collection
        const planetExists = await Planets.findOne({
            KeplerName : launch.target,
        },);

        if(!planetExists){
            throw new Error('The target Planet does not exist');
            
        }

        await Launches.findOneAndUpdate({
            flightNumber : launch.flightNumber,
        }, launch, {
            upsert : true,
        });

   
}

// Save First Launch
saveLaunch(launch);

// Check for the latest flightNumber 
async function getLatestFlightNumber(){
    const latestLaunch = await Launches.findOne()
        .sort('-flightNumber');

        if(!latestLaunch){
            return DEFAULT_FLIGHTNUMBER;
        }

        return latestLaunch.flightNumber;
}

// Schedule a subsequent new Launch from the request data, with an incremented flightNumber
async function addNewLaunch(launch){
    try {
        const newFlightNumber = await getLatestFlightNumber() + 1;
     
        const newLaunch = Object.assign(launch, {
            flightNumber : newFlightNumber,
            success : true,
            upcoming : true,
            customer : ['SpaceX', 'ZTM', 'NASA']
        });

        await saveLaunch(newLaunch);

    } catch (error) {
        console.error(`Could not save new launch: ${error}`);
    }
}


// Function to abort an existing lauch by updating success to false, upcoming to false.
async function abortLaunchById (launchId){
    try {
        return await Launches.updateOne({
            flightNumber : launchId,
        }, {
            success : false,
            upcoming : false,
        });
    } catch (error) {
        throw new Error(`Could not abort Launch ${error}`)
    }
}


async function existsWithLaunchId(launchId){
    return await Launches.findOne({
        flightNumber : launchId,
    });
    
}

async function getAllLaunches(){
    return await Launches.find({},
        {'__v' : 0, '_id': 0},
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsWithLaunchId,
    abortLaunchById
}