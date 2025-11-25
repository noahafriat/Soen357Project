import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

function ListingCard({ listing, currentUser }) {
  const isOwner =
    currentUser &&
    listing.sellerEmail &&
    currentUser.email &&
    listing.sellerEmail.toLowerCase() === currentUser.email.toLowerCase();

  return (
    <Link to={`/listing/${listing.id}`} className="listing-card__link">
      <div className="listing-card">
        <div className="listing-card__image-wrapper">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="listing-card__image"
            />
          ) : (
            <div className="listing-card__no-image">No image</div>
          )}
        </div>

        <div className="listing-card__content">
          <h2 className="listing-card__title">
              {listing.title}
          </h2>

          <p className="listing-card__price">${listing.price}</p>

          <p className="listing-card__seller">
            <Link
              to={`/seller/${listing.sellerEmail}`}
              className="listing-card__seller-link"
            >
              {listing.sellerName}
            </Link>

            <div className="listing-card__badge"><Badge type={listing.sellerType} /></div>

            {isOwner && (
              <span className="listing-card__owner-label">Your Listing</span>
            )}
          </p>

          <p className="listing-card__category">{listing.category}</p>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;