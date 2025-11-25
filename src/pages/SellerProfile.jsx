import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Badge from "../components/Badge";
import ListingCard from "../components/ListingCard";

function SellerProfile({ listings, users, sellerRatings }) {
  const { email } = useParams();
  const emailLower = email.toLowerCase();

  const seller = users.find(
    (u) => u.email.toLowerCase() === emailLower
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
      <div className="page">
        <h1 className="page__title">Seller not found</h1>
        <p className="text-muted">No user registered with email {email}.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page__title">Seller Profile</h1>

      <div className="seller-card">
        <div className="seller-card__header">
          <h2 className="seller-card__name">
            {seller.name} <Badge type={seller.type} />
          </h2>

          <p className="seller-card__line">
            <strong>Email:</strong> {seller.email}
          </p>

          <p className="seller-card__line">
            <strong>Verified:</strong> Concordia verified {seller.type}
          </p>

          <p className="seller-card__line">
            <strong>Rating:</strong> {rating}/5 ⭐
          </p>

          <p className="seller-card__line">
            <strong>Listings posted:</strong> {sellerListings.length}
          </p>
        </div>
      </div>

      <h3 className="page__subtitle" style={{ marginTop: "1.5rem" }}>
        Listings by {seller.name}
      </h3>

     <div className="listings-grid">
        {sellerListings.length === 0 ? (
          <p className="text-muted" style={{ fontStyle: "italic" }}>
            This seller has not posted any listings yet.
          </p>
        ) : (
          sellerListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}

export default SellerProfile;