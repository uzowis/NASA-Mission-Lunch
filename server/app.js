const path = require('path');
const express = require('express');
const cors = require('cors');
const { planetsRouter } = require('./src/routes/planets.route');

const app = express();

// MIDDLEWARES
app.use(cors({
    origin : 'http://localhost:3001',
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Custom Middlewares
app.use('/planets', planetsRouter)



app.get('/*', (req, res) =>{
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});











module.exports = app;