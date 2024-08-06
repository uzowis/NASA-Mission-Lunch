const axios = require('axios');

const Launches = require('./launches.mongo');
const Planets = require('./planets.mongo');


const DEFAULT_FLIGHTNUMBER = 100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';


// popuplate launches data from spaceX API
async function populateLaunches(){
    const response =  await axios.post(SPACEX_API_URL, {
        query : {},
        options : {
            pagination : false,
            populate : [
                {
                    path : 'rocket',
                    select : {
                        name : 1
                    }
                },
                {
                    path : 'payloads',
                    select : {
                        customers : 1
                    }
                },

            ]
        }
    });

    // check if the request was successful
    if(response.status !== 200){
        console.log('Problem downloading Launch Data');
        throw new Error('Launch Data failed to load');

    }

    // Map the spacex data into our DB
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) =>{
            return payload['customers'];
        });

        
        const launch = {
            flightNumber : launchDoc['flight_number'],
            mission : launchDoc['name'],
            rocket : launchDoc['rocket']['name'],
            launchDate : launchDoc['date_local'], 
            customer: customers,
            upcoming : launchDoc['upcoming'], // upcoming
            success : launchDoc['success'], // success
    
        }

        console.log(`${launch.flightNumber} ${launch.mission}`);
        saveLaunch(launch);
    }


    
    
}


// load the populated data into our local API Launches database.
async function loadLaunchesData(){
    // check if Launches data is already loaded
    const checkFirstLaunch = await findLaunch({
        flightNumber : 1,
        rocket : 'Falcon 1',
        mission : 'FalconSat',
    });

    if(checkFirstLaunch){
        console.log('Launches Data is already loaded into Database');
    }

    await populateLaunches();
}

// Find Launch Function
async function findLaunch(query){
    return await Launches.findOne(query);
}

// Function to save the preset Launch data
async function saveLaunch (launch) {
    await Launches.findOneAndUpdate({
        flightNumber : launch.flightNumber,
    }, launch, {
        upsert : true,
    });

   
}



// Check for the latest flightNumber 
async function getLatestFlightNumber(){
    const latestLaunch = await Launches.findOne()
        .sort('-flightNumber');

        if(!latestLaunch){
            return DEFAULT_FLIGHTNUMBER;
        }

        return latestLaunch.flightNumber;
}

// check if planet exists 
async function checkPlanet(launch){
    // Check if the target planet exists in the planet collection
    const planetExists = await Planets.findOne({
        KeplerName : launch.target,
    },);

    if(!planetExists){
        throw new Error('The target Planet does not exist');
        
    }

}
// Schedule a subsequent new Launch from the request data, with an incremented flightNumber
async function addNewLaunch(launch){
    try {
        checkPlanet(launch);

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

async function getAllLaunches(limit, skip){
    return await Launches.find({},
        {'__v' : 0, '_id': 0},
    )
    .sort({
        flightNumber : 1,
    })
    .limit(limit)
    .skip(skip);
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsWithLaunchId,
    abortLaunchById, 
    loadLaunchesData,
}