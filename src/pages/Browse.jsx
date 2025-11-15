import React from 'react';
import listingsData from "../data/listings.json";
import usersData from "../data/users.json";
import ListingCard from "../components/ListingCard";

function Browse() {
    const getSeller = (sellerId) =>
        usersData.find((user) => user.id === sellerId);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Browse Listings</h1>
            <p style={{ color: "#555" }}>
                Mock listings loaded from JSON for now.
            </p>

            <div style={{ marginTop: "1.5rem" }}>
                {listingsData.map((listing) => {
                const seller = getSeller(listing.sellerId);
                return (
                    <ListingCard
                    key={listing.id}
                    listing={listing}
                    seller={seller}
                    />
                );
                })}
            </div>
        </div>
    );
}

export default Browse;