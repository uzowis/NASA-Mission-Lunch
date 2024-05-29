const launches = new Map();

const launch = {
    flightNumber : 100,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer IS1',
    launchDate : new Date('May 29, 2026'),
    destination : 'Kepler-1649 b',
    customer : ['ZTM', 'NASA', 'SPACE X'],
    upcoming : true,
    success : true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches(){
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches,
}