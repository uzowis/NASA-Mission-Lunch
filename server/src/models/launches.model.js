const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber : 100,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer IS1',
    launchDate : new Date('May 29, 2026'),
    target : 'Kepler-1649 b',
    customer : ['ZTM', 'NASA', 'SPACE X'],
    upcoming : true,
    success : true
};

launches.set(launch.flightNumber, launch);

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            success : true,
            upcoming : true,
            customers : ['ZTM', 'NASA', 'SPACE X'],
            flightNumber : latestFlightNumber,
        })
    );

}

function existsWithLaunchId(launchId){
    return launches.get(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values());
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.success = false;
    aborted.upcoming = false; 
    return aborted;

}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsWithLaunchId,
    abortLaunchById
}