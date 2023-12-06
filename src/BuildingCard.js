// BuildingCard.js
import React from 'react';
import './BuildingCard.css'; // Make sure to create a separate CSS file for styling

function BuildingCard({ name, link, distance, time }) { // Include time if you plan to use it
    console.log(name); 
    return (
        <div className="building-card">
             <h2 className="building-name">{name}</h2>
            <p className="building-distance">Distance is {distance} meters </p>
            {/* Include this if you're displaying time */}
            {/* <p className="building-time">Time: {time} minutes</p> */}
            <a href={link} target="_blank" rel="noopener noreferrer" className="building-link">Directions to {name}</a>
        </div>
    );
}

export default BuildingCard;

