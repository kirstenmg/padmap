import React, {useState} from "react";
import {getAccessMapLink} from "./directions";

// Dummy start coordinates to test AccessMap URL generation
const startObject = {longitude: -122.30505981879918, latitude: 47.65331281821765}

export function DisplayLinks({ coordinatesArray }) {
    // Assume coordinatesArray is an array of {latitude, longitude, distance, time, building} objects

    // Map over the array to create links for each set of coordinates
    const links = coordinatesArray.map(({ latitude, longitude, distance, time, building }, index) => (
        <div>
            <a
                key={index}
                href={getAccessMapLink(startObject, { latitude, longitude })}
                target="_blank"
            >
                Option {index + 1}: Directions to {building}
            </a>
            <p> Time: {time} </p>
            <p> Distance: {distance} </p>
        </div>
    ));

    return <div>{links}</div>;
}