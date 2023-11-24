const token = require('./token.js');

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')

const baseClient = mbxClient({ accessToken: token.MAPBOX_TOKEN });
const directionsService = mbxDirections(baseClient);


const directionsRequest = {
    profile: 'walking', // Choose the appropriate profile
    waypoints: [
        {coordinates:  [-122.30505981879918, 47.65331281821765 ]}, // Starting point coordinates
        {coordinates: [-122.31176697575529, 47.654660809752976 ]}     // Ending point coordinates
    ],
    steps: true, // Include step-by-step instructions
};

directionsService.getDirections(directionsRequest).send().then(response => {
    const directions = response.body;

    const legs = directions.routes[0].legs;
    for (let i = 0; i < legs.length; i++) {
        const steps = legs[i].steps;
        for (let j = 0; j < steps.length; j++) {
            console.log(steps[j].maneuver.instruction);
            console.log(Math.round(steps[j].distance) + " meters\n");
        }
    }
}).catch(err => {
    console.log(err.message);
});