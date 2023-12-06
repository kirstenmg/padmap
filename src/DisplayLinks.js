import React from "react";
import {getAccessMapLink} from "./directions";

// coordinatesArray: an array of {latitude, longitude, distance (m), time (s), building} objects
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
            <p> This location is approximately {Math.round(time / 60)} minutes away.
                The distance is <b> {Math.round(distance)} meters </b>. </p>
        </li>
    ));

    return <ol>{links}</ol>;
}