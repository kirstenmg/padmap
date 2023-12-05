import React from "react";
import {getAccessMapLink} from "./directions";

export function DisplayLinks({ coordinatesArray, startCoordinates }) {
    // Assume coordinatesArray is an array of {latitude, longitude, distance, time, building} objects

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
            <p> Distance: {distance} meters </p>
        </li>
    ));

    return <ol>{links}</ol>;
}