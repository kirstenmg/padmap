import { SearchBox } from '@mapbox/search-js-react';
const token = require('./token.js');

export function Search() {
    return (
        <form>
            <SearchBox 
                accessToken={token.MAPBOX_TOKEN} 
                onRetrieve={handleRetrieve} 
                options={{
                    proximity: [-122.30505981879918, 47.65331281821765 ]
                }}
                />
        </form>
    );
}

function handleRetrieve(response) {
    console.log(response.features[0].geometry.coordinates);
}