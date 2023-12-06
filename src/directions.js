const token = require('./token.js');

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')

const baseClient = mbxClient({ accessToken: token.MAPBOX_TOKEN });
const directionsService = mbxDirections(baseClient);

// Start and end are objects of {latitute, longitude}
// accessMapParams contains {uphill, downhill, avoidBarriers, avoidStreets})
export function getAccessMapLink(start, end, accessMapParams) {
    console.log(accessMapParams.avoidBarriers);
    return "https://www.accessmap.app/dir?wp="
        + start.longitude + "_" + start.latitude // Start
        + "%27"
        + end.longitude + "_" + end.latitude // End
        + "&region=wa.seattle"
        + "&sa=" + accessMapParams.avoidStreets // Street avoidance
        + "&mu=" + (accessMapParams.uphill / 100) // Maximum uphill steepness
        + "&md=" + (accessMapParams.downhill / 100) // Maximum downhill steepness
        + "&ab=" + (accessMapParams.avoidBarriers == "true" ? 1 : 0); // Avoid barriers
}

export function getNavigation(start, end) {
    const directionsRequest = {
        profile: 'walking',
        waypoints: [
            {coordinates: start},
            {coordinates: end}
        ],
        steps: true, // Include step-by-step instructions
    };

    return directionsService.getDirections(directionsRequest).send().then(handleGetDirections).catch(err => {
        console.error(err.message);
    });
}

function handleGetDirections(response) {
    const directions = response.body;
    console.log("b\n");
    console.log(response.body);
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
    // console.log(directionStr);
    return directionStr;
}
