import { Search } from "./Search";
import { useState } from "react";
import GetDirectionsButton from "./GetDirectionsButton";
import {DisplayLinks} from "./DisplayLinks";
import { filterRestrooms, getNClosestBuildings } from "./filterRestrooms";

export default function DirectionOptions() {
    // State to manage direction options: start coordinates, isAllGender and isADA
    const [directionOptions, setDirectionOptions] = useState({
        startCoordinates: {}, // Object with latitude and longitude
        isAllGender: false,
        isADA: false,
    });

    // State to store the set of 5 end coordinates
    const [coordinatesArray, setCoordinatesArray] = useState([]);

    // State to manage visibility of DisplayLinks component
    const [showDirections, setShowDirections] = useState(false);

    // Function to handle DisplayLink visibility
    const handleGetDirectionsClick = () => {
        setShowDirections(true);
    };

    // Function to handle search box input
    // Takes in an array of [longitude, latitude]
    const handleCoordinates = (coordinates) => {
        console.log(coordinates);
        setDirectionOptions({...directionOptions, startCoordinates: 
            {longitude: coordinates[0], latitude: coordinates[1]}});
    }

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(directionOptions);

        // TODO: Filter, find the closest restrooms, and display them
        const closestBuildings = getNClosestBuildings(
            directionOptions.startCoordinates,
            directionOptions.isADA,
            directionOptions.isAllGender,
            5
        ).then((result) => {
            setCoordinatesArray(result);
            setShowDirections(true);
        }).catch((err) => console.error(err));

        // Array of 5 coordinates
        const newCoordinatesArray = [
            { latitude: 47.654660809752976, longitude: -122.31176697575529, distance: 722, time: 13, building: 'Hans Rosling Center for Population Health'},
            { latitude: 47.653475349999994, longitude: -122.30885055715963, distance: 2092, time: 5, building: 'Bagley Hall'},
        ];
    }

    return (
        <form onSubmit={handleSubmit}>
            <Search handleCoordinates={handleCoordinates}/>
            <GetDirectionsButton onClick={handleGetDirectionsClick}/>
            {showDirections && <DisplayLinks coordinatesArray={coordinatesArray} startCoordinates={directionOptions.startCoordinates}/>}
        </form>
    )
}