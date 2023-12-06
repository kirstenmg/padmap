import React from "react";
import {getAccessMapLink} from "./directions";

// coordinatesArray: an array of {latitude, longitude, distance, time, building} objects
// startCoordinates: an object of {latitude, longitude}
export function DisplayLinks({ coordinatesArray, startCoordinates, accessMapParams }) {
    // Map over the array to create links for each set of coordinates
    const links = coordinatesArray.map(({ latitude, longitude, distance, time, building }, index) => (
        <li>
            <a
                key={index}
                href={getAccessMapLink(startCoordinates, { latitude, longitude }, accessMapParams)}
                target="_blank"
            >
                Directions to {building}
            </a>
            <p> Time: {time} </p>
            <p> Distance: {Math.round(distance)} meters </p>
        </li>
    ));

    return <ol>{links}</ol>;
}