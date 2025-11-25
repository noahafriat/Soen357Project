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
    <div className="page">
      <h1 className="page__title">My Listings</h1>
      <p className="page__subtitle">
        Here are the items you’ve posted to the campus marketplace.
      </p>

      {myListings.length === 0 ? (
        <p className="text-muted">
          You haven’t posted any listings yet.
          Go to the <strong>Post</strong> page to add your first item.
        </p>
      ) : (
        <div className="listings-grid">
          {myListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
