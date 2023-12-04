import { SearchBox } from '@mapbox/search-js-react';
const token = require('./token.js');

// Takes in a handleRetrieve function called when the user selects a location
// and a value prop to store the user's input
export function Search(props) {
    return (
            <SearchBox 
                accessToken={token.MAPBOX_TOKEN}
                onRetrieve={
                    (response) => {
                        props.handleCoordinates(response.features[0].geometry.coordinates)
                        console.log("handled coords");
                    }
                } 
                options={{
                    proximity: [-122.30505981879918, 47.65331281821765 ]
                }}
                // TODO: make sure the search box maintains the input after submission
                value={props.value}
                />
    );
}
