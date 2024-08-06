const http = require('http');

// Custom Modules 
const app = require('./app');
const { loadPlanetsData } = require('./src/models/planets.model');
const { mongoConnet } = require('./src/services/mongo');
const { loadLaunchesData } = require('./src/models/launches.model');

const PORT = process.env.PORT  || 8000;
const server = http.createServer(app);







async function startServer(){
    await mongoConnet();
    await loadPlanetsData();
    await loadLaunchesData();
    

    server.listen(PORT, () =>{
        console.log(`Listening at Port ${PORT}.....`);
    });
}

startServer();