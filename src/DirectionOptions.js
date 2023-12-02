import { Search } from "./Search";
import { useState } from "react";
import GetDirectionsButton from "./GetDirectionsButton";
import { getAccessMapLink } from './directions';
import {DisplayLinks} from "./DisplayLinks";

// Dummy start and end to test AccessMap URL generation
const startObject = {longitude: -122.30505981879918, latitude: 47.65331281821765}
const endObject = {longitude:-122.31176697575529, latitude: 47.654660809752976}

export default function DirectionOptions() {
    // State to manage direction options: start coordinates, isAllGender and isADA
    const [directionOptions, setDirectionOptions] = useState({
        startCoordinates: [],
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

    // Function to handle search box and filter inputs
    const handleCoordinates = (coordinates) => {
        setDirectionOptions({...directionOptions, startCoordinates: coordinates});
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
            <Search handleCoordinates={handleCoordinates}/>
            <GetDirectionsButton onClick={handleGetDirectionsClick}/>
            {showDirections && <DisplayLinks coordinatesArray={coordinatesArray}/>}
        </form>
    )
}