const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./src/routes/api');

const app = express();

// MIDDLEWARES
app.use(cors({
    origin : 'http://localhost:3001',
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Custom Middlewares
app.use('/v1', api);


// Handles the front-end rounting
app.get('/*', (req, res) =>{
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});











module.exports = app;