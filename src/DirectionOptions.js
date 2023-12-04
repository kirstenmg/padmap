import { Search } from "./Search";
import { useState } from "react";
import {DisplayLinks} from "./DisplayLinks";

export default function DirectionOptions() {
    // State to manage direction options: start coordinates, isAllGender and isADA
    const [directionOptions, setDirectionOptions] = useState({
        startCoordinates: null,
        isAllGender: false,
        isADA: false,
    });

    // State to store the set of 5 end coordinates
    const [coordinatesArray, setCoordinatesArray] = useState([]);

    // State to manage visibility of DisplayLinks component
    const [showDirections, setShowDirections] = useState(false);

    // Function to handle search box and filter inputs
    const handleCoordinates = (coordinates) => {
        const startCoordinates = {
            longitude: coordinates[0],
            latitude: coordinates[1]
        };
        setDirectionOptions({...directionOptions, startCoordinates});
    }

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(directionOptions);
        // TODO: Filter, find the closest restrooms, and display them

        // Array of 5 coordinates
        const newCoordinatesArray = [
            { latitude: 47.654660809752976, longitude: -122.31176697575529, distance: 722, time: 13, building: 'Hans Rosling Center for Population Health'},
            { latitude: 47.653475349999994, longitude: -122.30885055715963, distance: 2092, time: 5, building: 'Bagley Hall'},
        ];

        setCoordinatesArray(newCoordinatesArray);
        setShowDirections(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Search handleCoordinates={handleCoordinates} value=""/>
            <button
                disabled={!directionOptions.startCoordinates}
                type="submit"
                className="get-directions-button"
            >Get Directions</button>
            {showDirections && <DisplayLinks coordinatesArray={coordinatesArray} startCoordinates={directionOptions.startCoordinates}/>}
        </form>
    )
}