const token = require('./token.js');

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')

const baseClient = mbxClient({ accessToken: token.MAPBOX_TOKEN });
const directionsService = mbxDirections(baseClient);

// Start and end are coordinates of [latitute, longitude] (TODO: confirm)
export function getNavigation(start, end) {
    const directionsRequest = {
        profile: 'walking', // Choose the appropriate profile
        waypoints: [
            {coordinates: start}, // Starting point coordinates
            {coordinates: end}     // Ending point coordinates
        ],
        steps: true, // Include step-by-step instructions
    };

    return directionsService.getDirections(directionsRequest).send().then(handleGetDirections).catch(err => {
        console.log(err.message);
    });
}

function handleGetDirections(response) {
    const directions = response.body;
    const directionStr = []
    const legs = directions.routes[0].legs;
    for (let i = 0; i < legs.length; i++) {
        const steps = legs[i].steps;
        for (let j = 0; j < steps.length; j++) {
            directionStr.push(
                {"instructions": steps[j].maneuver.instruction,
                    "distance": Math.round(steps[j].distance) + " meters"}
            );
        }
    }
    return directionStr;
}
