import { Search } from "./Search";
import { useState } from "react";
import {DisplayLinks} from "./DisplayLinks";
import { getNClosestBuildings } from "./findRestrooms";
import './DirectionOptions.css';
import BuildingCard from './BuildingCard';

export default function DirectionOptions() {
    // State to manage direction options: start coordinates, isAllGender and isADA
    const [directionOptions, setDirectionOptions] = useState({
        startLocName: "",
        startCoordinates: null, // Object with latitude and longitude
        isAllGender: false,
        isADA: false,
    });

    // State to store the set of 5 end coordinates
    const [coordinatesArray, setCoordinatesArray] = useState([]);

    // State to manage visibility of DisplayLinks component
    const [showDirections, setShowDirections] = useState(false);

    // Function to handle search box input
    // Takes in the location name and an array of [longitude, latitude]
    const handleLocation = (name, coordinates) => {
        console.log(coordinates);
        setDirectionOptions({
            ...directionOptions, 
            startLocName: name,
            startCoordinates: 
                {longitude: coordinates[0], latitude: coordinates[1]},
        });
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
    <div className="direction-options">
      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <Search 
          handleLocation={handleLocation}
          value={directionOptions.startLocName}
        />
        <div className="checkbox-group">
          <label htmlFor="all-gender-checkbox">
            <input
              type="checkbox"
              name="isAllGender"
              checked={directionOptions.isAllGender}
              onChange={handleCheckboxChange}
              id="all-gender-checkbox"
            />
            All Gender Restroom
          </label>
          <label htmlFor="ada-checkbox">
            <input
              type="checkbox"
              name="isADA"
              checked={directionOptions.isADA}
              onChange={handleCheckboxChange}
              id="ada-checkbox"
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
    </div>
  );
}