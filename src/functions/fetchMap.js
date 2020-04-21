const {connectToDatabase, getCrudRepository} = require('../db');
const corsHeaders = require('../corsHeaders');

module.exports.handler = async event => {
    const mapId = event.pathParameters.mapId;

    console.log(`Fetch map for ID: ${mapId}`);

    const mapRepository = getCrudRepository(await connectToDatabase(), 'maps');

    const map = await mapRepository.find(mapId);

    if (!map) {
        console.log(`No map found for ID: ${mapId}`);

        return {
            statusCode: 404,
            headers: corsHeaders,
        };
    }

    console.log(`Map found for ID: ${mapId}`);

    return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(map)
    };
};
