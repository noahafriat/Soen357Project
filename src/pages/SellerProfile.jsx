import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/Badge";
import ListingCard from "../components/ListingCard";

function SellerProfile({ listings, users, sellerRatings }) {
  const { email } = useParams();
  const emailLower = email.toLowerCase();

  const seller = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  const sellerListings = useMemo(() => {
    if (!seller) return [];
    return listings.filter(
      (item) =>
        item.sellerEmail &&
        item.sellerEmail.toLowerCase() === emailLower
    );
  }, [listings, emailLower, seller]);

  const rating = sellerRatings[emailLower] || "4.5";
  
  if (!seller) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Seller not found</h1>
        <p>No user registered with email {email}.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px" }}>
      <h1>Seller Profile</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>
          {seller.name} <Badge type={seller.type} />
        </h2>

        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>Verified:</strong> Concordia verified {seller.type}</p>
        <p><strong>Rating:</strong> {rating}/5 ⭐</p>
        <p><strong>Listings posted:</strong> {sellerListings.length}</p>
      </div>

      <h3>Listings by {seller.name}</h3>

      {sellerListings.length === 0 ? (
        <p style={{ color: "#777", fontStyle: "italic" }}>
          This seller has not posted any listings yet.
        </p>
      ) : (
        sellerListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      )}
    </div>
  );
}

export default SellerProfile;
