import React from 'react';
import { useParams } from 'react-router-dom';

function Listing() {
    const { id } = useParams();
    return (
        <div>
            <h1>Listing Details</h1>
            <p>Listing ID from URL: {id}</p>
            <p>This will show the full details of one listing</p>
        </div>
    )
}

export default Listing;