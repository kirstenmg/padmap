import { Search } from "./Search";
import { useState } from "react";
import GetDirectionsButton from "./GetDirectionsButton";

export default function DirectionOptions() {
    const [directionOptions, setDirectionOptions] = useState({
        coordinates: [],
        isAllGender: false,
        isADA: false,
    });

    const handleCoordinates = (coordinates) => {
        setDirectionOptions({...directionOptions, coordinates: coordinates});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(directionOptions);
        // TODO: Filter, find the closest restrooms, and display them
    }

    return (
        <form onSubmit={handleSubmit}>
            <Search handleCoordinates={handleCoordinates}/>
            <GetDirectionsButton/>
        </form>
    )
}