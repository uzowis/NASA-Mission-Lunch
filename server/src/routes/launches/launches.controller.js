const { getAllLaunches, addNewLaunch, existsWithLaunchId, abortLaunchById } = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res){
    const { limit, skip } = getPagination(req.query)
    return res.status(200).json( await getAllLaunches(limit, skip));
}

async function httpAddNewLaunches(req, res){
    const launch = req.body;
    
    // Validate the input to ensure the required fields are provided
    if(!launch.launchDate || !launch.mission || !launch.target || !launch.rocket){
        return res.status(400).json({
            error : 'All fields are required! Try again'
        });
    }
       
    launchDate = new Date(launch.launchDate);
    await addNewLaunch(launch);
    return res.status(201).json(launch);

    
}

function httpGetLaunchesById(req, res){
    const launchId = Number(req.params.id);

    if(!existsWithLaunchId(launchId)){
        return res.status(404).json({error : 'Mission doesn\'t exist'});
    }else{
        return res.status(200).json(existsWithLaunchId(launchId));
    }
    
}

async function httpAbortLaunch(req, res){
    const launchId = Number(req.params.id);

    // Check if a Launch with the LaunchId Exists
    const launchExists = await existsWithLaunchId(launchId);

    if(!launchExists){
        return res.status(404).json({
            error : 'Mission doesn\'t exist'
        });
    }
    console.log(launchExists);

    const aborted = await abortLaunchById(launchId);
    console.log(aborted);

    if(!aborted){
        return res.status(400).json({
            error : 'Launch not aborted'
        });
    }
    return res.status(200).json({
        ok : true,
    });

}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}