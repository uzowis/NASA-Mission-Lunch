const express = require('express');
const { planetsRouter } = require('./src/routes/planets.route');

const app = express();

// MIDDLEWARES
app.use(express.json());

// Custom Middlewares
app.use('/planets', planetsRouter)


app.get('/', (req, res) =>{
    res.send('Hello, Wizzy is the baddest Programmer Ever!!!');
});











module.exports = app;