import React from "react";
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
                Option {index + 1}: Directions to {building}
            </a>
            <p> Time: {time} </p>
            <p> Distance: {distance} </p>
        </li>
    ));

    return <ol>{links}</ol>;
}