import restroomData from "./restroomsWithLatLong.json";

const token = require('./token.js');

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions')

const baseClient = mbxClient({ accessToken: token.MAPBOX_TOKEN });
const directionsService = mbxDirections(baseClient);

/**
 * Calculate restroom distances and return the n closest buildings with
 * restrooms meeting user requirements.
 * @param {*} startLocation object containing latitude and longitude
 * @param {*} requireADA whether to require ADA restroom
 * @param {*} requireAllGender whether to require all-gender restroom
 * @param {*} nClosest number of buildings to return
 */
export async function getNClosestBuildings(startLocation, requireADA, requireAllGender, nClosest) {
    // Filter buildings by restroom
    const buildings = filterRestrooms(requireADA, requireAllGender);

    // Calculate restroom distances
    // Since this involves an API call, we create a list of Promises for
    // each of these API calls and then wait for all of them to resolve.
    const restroomPromises = buildings.map(([_, data]) => {
        return calculateDist(
                startLocation,
                {longitude: data.longitude, latitude: data.latitude}
            )
        }
    );
    const restroomDistances = await Promise.all(restroomPromises);
    
    const restroomsWithDistances = buildings.map(([name, buildingData], i) => {
        return {
            building: name,   
            latitude: buildingData.latitude,
            longitude: buildingData.longitude,
            distance: restroomDistances[i],
            time: 0 // TODO: decide whether to include time
        }
    })

    restroomsWithDistances.sort((a, b) => a.distance - b.distance);

    return restroomsWithDistances.slice(0, nClosest);
}

function filterRestrooms(requireADA, requireAllGender) {
    // Turn the dictionary into a list of entries
    var restroomDataList = Object.entries(restroomData);

    // Filter out buildings for which we don't have coordinates
    restroomDataList = restroomDataList.filter(([_, data]) => {
        return 'longitude' in data
    });
    
    // Filter out buildings that don't meet the user criteria
    restroomDataList = restroomDataList.filter(([_, data]) => {
        return (!requireADA || data.contains_ADA)
        && (!requireAllGender || data.contains_allgender)
        && (!(requireADA && requireAllGender) || data.contains_ADAallgender)
    });

    return restroomDataList;
}

/**
 * Takes in start and end coordinates, each an object of {longitude, latitude}.
 * Returns a Promise with the distance for the shortest route between start and end
 */
export async function calculateDist(start, end) {
    // Construct request for MapBox to get directions, which will contain a distance
    const directionsRequest = {
        profile: 'walking',
        waypoints: [
            {coordinates: [start.longitude, start.latitude]},
            {coordinates: [end.longitude, end.latitude]}
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