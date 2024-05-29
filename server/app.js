const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { planetsRouter } = require('./src/routes/planets.route');
const { launchesRouter } = require('./src/routes/launches.route');


const app = express();

// MIDDLEWARES
app.use(cors({
    origin : 'http://localhost:3001',
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Custom Middlewares
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);



app.get('/*', (req, res) =>{
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});











module.exports = app;