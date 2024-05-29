const { httpGetAllLaunches } = require('./launches.controller');

const express = require('express');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);



module.exports ={
    launchesRouter,
}