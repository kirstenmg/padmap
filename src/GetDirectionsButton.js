import React from 'react';

const GetDirectionsButton = ({ onClick }) => {
    return (
        <button type="submit" className="get-directions-button" onClick={onClick}>
            Get Directions
        </button>
    );
};

export default GetDirectionsButton;