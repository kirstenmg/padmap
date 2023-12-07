import React from "react";
import { getAccessMapLink } from "./directions";

export function DisplayLinks({ coordinatesArray, startCoordinates }) {
        const links = coordinatesArray.map(({ latitude, longitude, distance, time, building }, index) => (
            <li key={index} className="card">
                <div className="card-number">{index + 1}</div>
                <h3>{building}</h3>
                <p>Distance: <b>{Math.round(distance)} meters</b></p>
                <a href={getAccessMapLink(startCoordinates, { latitude, longitude })} target="_blank" rel="noopener noreferrer">
                    Directions to {building}
                </a>
            </li>
        ));
    
        return <ol className="card-list">{links}</ol>;
}