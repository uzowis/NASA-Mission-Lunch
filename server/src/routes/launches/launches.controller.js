const { getAllLaunches, addNewLaunch, existsWithLaunchId, abortLaunchById } = require('../../models/launches.model');

function httpGetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, res){
    const launch = req.body;
    
    // Validate the input to ensure the required fields are provided
    if(!launch.launchDate || !launch.mission || !launch.target || !launch.rocket){
        return res.status(400).json({error : 'All fields are required! Try again'});
    }else{
        launchDate = new Date(launch.launchDate);
        addNewLaunch(launch);
        return res.status(201).json(launch);

    }
}

function httpGetLaunchesById(req, res){
    const launchId = Number(req.params.id);

    if(!existsWithLaunchId(launchId)){
        return res.status(404).json({error : 'Mission doesn\'t exist'});
    }else{
        return res.status(200).json(existsWithLaunchId(launchId));
    }
    
}

function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);

    if(!existsWithLaunchId(launchId)){
        return res.status(404).json({error : 'Mission doesn\'t exist'});
    }else{
        const aborted = abortLaunchById(launchId);
        return res.status(200).json(aborted);
    }
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}