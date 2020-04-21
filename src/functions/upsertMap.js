const {connectToDatabase, getCrudRepository} = require('../db');
const corsHeaders = require('../corsHeaders');

module.exports.handler = async event => {
    const mapRepository = getCrudRepository(await connectToDatabase(), 'maps');

    const mapId = event.pathParameters.mapId;
    const map = JSON.parse(event.body); // todo sanitise/add size limits

    await mapRepository.update(mapId, map);

    return {
        statusCode: 201,
        headers: corsHeaders
    };
};
