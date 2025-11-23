import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

function ListingCard({ listing, currentUser }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        gap: "1rem"
      }}
    >
      {/* Image section */}
      <div style={{ width: "120px", height: "120px", flexShrink: 0 }}>
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              backgroundColor: "#f3f3f3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              color: "#999"
            }}
          >
            No image
          </div>
        )}
      </div>

      {/* Text section */}
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: 0 }}>
          <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
        </h2>
        <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>
          ${listing.price}
        </p>
        <p style={{ margin: "0.25rem 0", color: "#555" }}>
          {listing.sellerName}
          <Badge type={listing.sellerType} />      
          {currentUser && 
          listing.sellerEmail && 
          currentUser.email && 
          listing.sellerEmail.toLowerCase() === currentUser.email.toLowerCase() && (
            <span style={{ color: "#1976d2", fontWeight: "bold", fontSize: "0.8rem", marginLeft: "10px" }}>
              Your Listing
            </span>
          )}
        </p>
        <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#777" }}>
          {listing.category}
        </p>
      </div>
    </div>
  );
}

export default ListingCard;