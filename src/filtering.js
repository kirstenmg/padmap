import React, { useState } from 'react';
import bathroomsData from './restroomsWithLatLong.json'; // Import the JSON file

const BathroomList = () => {
    const [showADA, setShowADA] = useState(false);
    const [showAllGender, setShowAllGender] = useState(false);

    // Convert the object to an array of bathrooms
    const bathroomsArray = Object.entries(bathroomsData).map(([name, details]) => {
        return {
            name,
            ...details
        };
    });

    const filteredBathrooms = bathroomsArray.filter(bathroom => {
        return (!showADA || bathroom.contains_ADA || bathroom.contains_ADAallgender) && 
               (!showAllGender || bathroom.contains_allgender || bathroom.contains_ADAallgender);
    });

    return (
        <div>
            <div>
                <input 
                    type="checkbox" 
                    id="ada-accessible" 
                    checked={showADA} 
                    onChange={() => setShowADA(!showADA)} 
                />
                <label htmlFor="ada-accessible">ADA Accessible Bathrooms</label>
            </div>

            <div>
                <input 
                    type="checkbox" 
                    id="all-gender" 
                    checked={showAllGender} 
                    onChange={() => setShowAllGender(!showAllGender)} 
                />
                <label htmlFor="all-gender">All Gender Bathrooms</label>
            </div>

            <div>
                {filteredBathrooms.map((bathroom, index) => (
                    <div key={index}>
                        <p>{bathroom.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BathroomList;