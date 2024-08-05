const fs = require('fs');
const path = require('path');
const Planet = require('./planets.mongo');

const { parse } = require('csv-parse');


// Checks for habitable planets conditions
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] == 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

// checks the csv file for habitable planets and saves them to the Planets DB
function loadPlanetsData(){
    return new Promise((resolve, reject) =>{
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment : '#',
                columns : true,
            }))
            .on('data', async (data) =>{
                if(isHabitablePlanet(data)){
                    //habitablePlanets.push(data);
                    savePlanet(data);
                };
            })
            .on('err', (err) =>{
                console.log(err);
                reject(err);
            })
            .on('end', async() =>{
                const countFoundPlants = (await getAllPlanets()).length;
                console.log(`${countFoundPlants} habitable planets found!`);
                resolve();
            });

    });

}

async function savePlanet(planet){
    try {
        await Planet.updateOne({
            KeplerName : planet.kepler_name,
        },{
            KeplerName : planet.kepler_name,
        },{
            upsert : true,
        })
        
    } catch (error) {
        console.error(`Could not save planet ${error}`);
        
    }
}

// Get all habitable planets
async function getAllPlanets(){
    return await Planet.find({});
}

module.exports = {
    getAllPlanets,
    loadPlanetsData,
}