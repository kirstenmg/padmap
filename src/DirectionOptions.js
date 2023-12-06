import {Search} from "./Search";
import {useState} from "react";
import {DisplayLinks} from "./DisplayLinks";
import {getNClosestBuildings} from "./findRestrooms";

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

    // State for AccessMap parameters
    const [accessMapParams, setAccessMapParams] = useState({});
    // State to manage error message
    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle resetting the page
    const handleResetPage = () => {
        setDirectionOptions({
            startLocName: "",
            startCoordinates: null,
            isAllGender: false,
            isADA: false,
        });
        setCoordinatesArray([]);
        setShowDirections(false);
        setErrorMessage("");
    };

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

        // Reset error message when the user starts typing again
        setErrorMessage("");
    }

    // Function to handle checkbox changes
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setDirectionOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Just get the access map parameters on submit.
        // We could store them as state in the component,
        // but this makes things more complicated by bypassing
        // the default input validation.
        const accessMapParams = {
            uphill: document.getElementById("uphill").value,
            downhill: document.getElementById("downhill").value,
            avoidBarriers: document.getElementById("avoid-barriers").value,
            avoidStreets : document.getElementById("avoid-streets").value,
        }

        // Check if start location is selected
        if (!directionOptions.startCoordinates) {
            setErrorMessage("Please select a start location in Seattle");
            return;
        }

        // Reset error message
        setErrorMessage("");

        // Get closest buildings with restrooms satisfying the
        // given filters
        getNClosestBuildings(
            directionOptions.startCoordinates,
            directionOptions.isADA,
            directionOptions.isAllGender,
            5
        ).then((result) => {
            setCoordinatesArray(result);
            setAccessMapParams(accessMapParams);
            setShowDirections(true);
        }).catch((err) => console.error(err));
    }

    return (

        <form onSubmit={handleSubmit} aria-labelledby="form-heading">
            <h1 id="form-heading">Pad Map</h1>
            <h2 id="form-heading">Find free menstrual products near you!</h2>
            <Search
                handleLocation={handleLocation}
                value={directionOptions.startLocName}
            />
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
            <AccessMapParams></AccessMapParams>
            <button
                type="submit"
                className="get-directions-button"
            >
                Get Directions
            </button>
            {errorMessage && (
                <p
                    className="error-message"
                    role="alert"
                    aria-live="assertive"
                    style={{
                        // Add styles for better visibility, for example, color and padding
                        color: 'red',
                        padding: '10px',
                        // Add any additional styles as needed
                    }}
                >
                    {errorMessage}
                </p>
            )}
            <br/>
            {showDirections && (
                <button type="button" class="reset-button" onClick={handleResetPage}>
                Try another start location
            </button>
            )}
            {showDirections && (
                <DisplayLinks
                    aria-live="polite"
                    coordinatesArray={coordinatesArray}
                    startCoordinates={directionOptions.startCoordinates}
                    accessMapParams={accessMapParams}
                />
            )}
        </form>
    );
}

function AccessMapParams() {
    return (
      <fieldset>
        <legend>Parameters for AccessMap directions</legend>
        <div>
        <input
          id="avoid-barriers"
          type="checkbox"
          defaultValue="false"
        ></input>
        <label htmlFor="avoid-barriers">Avoid raised curbs and stairs</label>
        </div>
        <div>
        <label htmlFor="avoid-streets">Street avoidance factor (1 = avoid streets, 0 = use streets)</label>
        <input
          id="avoid-streets" 
          type="number"
          inputMode="decimal"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0"
        ></input>
        </div>
        <div>
        <label htmlFor="uphill">Maximum uphill steepness (4-15%)</label>
        <input
          id="uphill" 
          type="number"
          inputMode="decimal"
          min="4"
          max="15"
          step="0.5"
          defaultValue="15"
        ></input>
        </div>
        
        <div>
        <label htmlFor="downhill">Maximum downhill steepness (4-15%)</label>
        <input
          id="downhill"
          type="number"
          inputMode="decimal"
          min="4"
          max="15"
          step="0.5"
          defaultValue="15"
        ></input>
        </div>
      </fieldset>
    )
}