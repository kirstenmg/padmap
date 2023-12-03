const token = require('./token.js');

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')

const baseClient = mbxClient({ accessToken: token.MAPBOX_TOKEN });
const directionsService = mbxDirections(baseClient);

/**
 * 
 * @param { } start
 * @param { } end
//  * @param {Boolean} isAllGender - if false, single-gender
//  * @param {Boolean} isADA - 
 */


export function calculateDist(start, end) {  // isAllGender, isADA - separate into separate fxn for filtering
    const directionsRequest = {
        profile: 'walking',
        waypoints: [
            {coordinates: start},
            {coordinates: end}
        ],
    };

    return directionsService.getDirections(directionsRequest).send().then(handleCalcDistance).catch(err => {   // why are we returning?
        console.error(err.message);
    });
}

function handleCalcDistance(response) {
    const directions = response.body;
    console.log(directions.routes[0].distance);
}