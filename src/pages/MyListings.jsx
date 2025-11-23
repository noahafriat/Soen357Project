import React, { useMemo } from "react";
import ListingCard from "../components/ListingCard";

function MyListings({ listings, currentUser }) {
  const myListings = useMemo(() => {
    if (!currentUser || !currentUser.email) return [];

    const myEmail = currentUser.email.toLowerCase();

    return listings.filter((listing) => {
      if (!listing.sellerEmail) return false;
      return listing.sellerEmail.toLowerCase() === myEmail;
    });
  }, [listings, currentUser]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Listings</h1>
      <p style={{ color: "#555", marginBottom: "0.5rem" }}>
        Here are the items you’ve posted to the campus marketplace.
      </p>

      {myListings.length === 0 ? (
        <p style={{ color: "#777", marginTop: "1rem" }}>
          You haven’t posted any listings yet.
          Go to the <strong>Post</strong> page to add your first item.
        </p>
      ) : (
        <div style={{ marginTop: "1.5rem" }}>
          {myListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
