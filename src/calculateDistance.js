const token = require('./token.js');

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')

const baseClient = mbxClient({ accessToken: token.MAPBOX_TOKEN });
const directionsService = mbxDirections(baseClient);

/**
 * Takes in start and end coordinates, each a list of [longitude, latitude].
 * Returns a Promise with the distance for the shortest route between start and end
 */
export async function calculateDist(start, end) {
    // Construct request for MapBox to get directions, which will contain a distance
    const directionsRequest = {
        profile: 'walking',
        waypoints: [
            {coordinates: start},
            {coordinates: end}
        ],
    };

    try {
        // See https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#getdirections
        // for documentation of getDirections
        let directionsResponse = await directionsService.getDirections(directionsRequest).send();

        // TODO: could handle the case where no route is found
        return directionsResponse.body.routes[0].distance;
    } catch (err) {
        console.error(err.message);
    }
}
