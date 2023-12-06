import { SearchBox } from '@mapbox/search-js-react';
const token = require('./token.js');

// Takes in a handleLocation function called when the user selects a location
// and a value prop to store the user's input
// handleLocation takes in (name, coordinates) for the selected location
export function Search(props) {
    return (
            <SearchBox 
                accessToken={token.MAPBOX_TOKEN}
                onRetrieve={
                    (response) => {
                        console.log(response)
                        props.handleLocation(
                            response.features[0].properties.name,
                            response.features[0].geometry.coordinates
                        )
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
