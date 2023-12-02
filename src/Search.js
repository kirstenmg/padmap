import { SearchBox } from '@mapbox/search-js-react';
const token = require('./token.js');

// Takes in a handleRetrieve function called when the user selects a location
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
                value=""
                />
    );
}
<<<<<<< HEAD

function handleRetrieve(response) {
    console.log(response.features[0].geometry.coordinates);
}
=======
>>>>>>> 42f245d32164a989a807b65a64d486c6f0a1767c
