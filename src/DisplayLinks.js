/*import React from "react";
import {getAccessMapLink} from "./directions";

// coordinatesArray: an array of {latitude, longitude, distance, time, building} objects
// startCoordinates: an object of {latitude, longitude}
export function DisplayLinks({ coordinatesArray, startCoordinates }) {
    // Map over the array to create links for each set of coordinates
    const links = coordinatesArray.map(({ latitude, longitude, distance, time, building }, index) => (
        <li>
            <a
                key={index}
                href={getAccessMapLink(startCoordinates, { latitude, longitude })}
                target="_blank"
            >
                Directions to {building}
            </a>
            <p> Time: {time} </p>
            <p> Distance: {Math.round(distance)} meters </p>
        </li>
    ));

    return <ol>{links}</ol>;
}*/

import React from "react";
import BuildingCard from './BuildingCard'; // Import the BuildingCard component
import { getAccessMapLink } from "./directions";

// coordinatesArray: an array of {latitude, longitude, distance, time, building} objects
// startCoordinates: an object of {latitude, longitude}
export function DisplayLinks({ coordinatesArray, startCoordinates }) {
    // Map over the array to create BuildingCard components for each building
    const buildingCards = coordinatesArray.map((building, index) => (
        <BuildingCard
            key={index}
            name={building.building}
            link={getAccessMapLink(startCoordinates, { latitude: building.latitude, longitude: building.longitude })}
            distance={Math.round(building.distance)} // Assuming distance is in meters
            // Optionally, you can include the time attribute if you plan to display it
            // time={building.time}
        />
    ));

    return <div className="building-cards-container">{buildingCards}</div>;
}
