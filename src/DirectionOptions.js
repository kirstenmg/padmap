import { Search } from "./Search";
import { useState } from "react";
import {DisplayLinks} from "./DisplayLinks";
import { getNClosestBuildings } from "./findRestrooms";

export default function DirectionOptions() {
    // State to manage direction options: start coordinates, isAllGender and isADA
    const [directionOptions, setDirectionOptions] = useState({
        startCoordinates: null, // Object with latitude and longitude
        isAllGender: false,
        isADA: false,
    });

    // State to store the set of 5 end coordinates
    const [coordinatesArray, setCoordinatesArray] = useState([]);

    // State to manage visibility of DisplayLinks component
    const [showDirections, setShowDirections] = useState(false);

    // Function to handle search box input
    // Takes in an array of [longitude, latitude]
    const handleCoordinates = (coordinates) => {
        console.log(coordinates);
        setDirectionOptions({...directionOptions, startCoordinates: 
            {longitude: coordinates[0], latitude: coordinates[1]}});
    }

    // Function to handle checkbox changes
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setDirectionOptions((prevOptions) => ({
        ...prevOptions,
        [name]: checked,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(directionOptions);

        // Get closest buildings with restrooms satisfying the
        // given filters
        getNClosestBuildings(
            directionOptions.startCoordinates,
            directionOptions.isADA,
            directionOptions.isAllGender,
            5
        ).then((result) => {
            setCoordinatesArray(result);
            setShowDirections(true);
        }).catch((err) => console.error(err));
    }  
    
    return (
    <form onSubmit={handleSubmit} aria-labelledby="form-heading">
      <h2 id="form-heading">Restroom Finder</h2>
      <Search handleCoordinates={handleCoordinates} value="" />
      <div>
        <label htmlFor="all-gender-checkbox">
          <input
            type="checkbox"
            name="isAllGender"
            checked={directionOptions.isAllGender}
            onChange={handleCheckboxChange}
            aria-checked={directionOptions.isAllGender}
          />
          All Gender Restroom
        </label>
      </div>
      <div>
        <label htmlFor="ada-checkbox">
          <input
            type="checkbox"
            name="isADA"
            checked={directionOptions.isADA}
            onChange={handleCheckboxChange}
            aria-checked={directionOptions.isADA}
          />
          ADA Accessible Restroom
        </label>
      </div>
      <button
        disabled={!directionOptions.startCoordinates}
        type="submit"
        className="get-directions-button"
      >
        Get Directions
      </button>
      {showDirections && (
        <DisplayLinks
          coordinatesArray={coordinatesArray}
          startCoordinates={directionOptions.startCoordinates}
        />
      )}
    </form>
  );
}