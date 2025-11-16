import React from "react";
import ListingCard from "../components/ListingCard";

function Browse({ listings }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Browse Listings</h1>
      <p style={{ color: "#555" }}>
        These are mock listings. New listings you post will also appear here.
      </p>

      <div style={{ marginTop: "1.5rem" }}>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Browse;