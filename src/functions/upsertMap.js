const {connectToDatabase, getCrudRepository} = require('../db');
const corsHeaders = require('../corsHeaders');

module.exports.handler = async event => {
    const mapId = event.pathParameters.mapId;
    const map = JSON.parse(event.body); // todo sanitise/add size limits

    console.log(`Upsert map for ID: ${mapId}, map: ${JSON.stringify(map, null, 2)}`);

    const mapRepository = getCrudRepository(await connectToDatabase(), 'maps');
    await mapRepository.upsert(mapId, map);

    console.log(`Map upserted successfully for ID: ${mapId}`);

    return {
        statusCode: 201,
        headers: corsHeaders
    };
};
