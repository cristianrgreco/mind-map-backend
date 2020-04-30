const {connectToDatabase, getCrudRepository} = require('../db');
const {validate, fromPayload} = require('../mapDto');
const corsHeaders = require('../corsHeaders');

module.exports.handler = async event => {
    const mapId = event.pathParameters.mapId;
    console.log(`Upsert map for ID: ${mapId}`);

    const json = JSON.parse(event.body);

    const validationErrors = validate(json);

    if (validationErrors) {
        console.log(`Map upsert failed due to bad payload: ${JSON.stringify(validationErrors, null, 2)}`);

        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify(validationErrors)
        };
    }

    const map = fromPayload(json);
    const mapRepository = getCrudRepository(await connectToDatabase(), 'maps');
    await mapRepository.upsert(mapId, map);

    console.log(`Map upserted successfully with ${map.nodeList.nodes.length} nodes for ID: ${mapId}`);

    return {
        statusCode: 201,
        headers: corsHeaders
    };
};
