const http = require('http');

// Custom Modules 
const app = require('./app');
const { loadPlanetsData } = require('./src/models/planets.model');

const PORT = process.env.PORT  || 8000;
const server = http.createServer(app);







async function startServer(){
    await loadPlanetsData();

    server.listen(PORT, () =>{
        console.log(`Listening at Port ${PORT}.....`);
    });
}

startServer();