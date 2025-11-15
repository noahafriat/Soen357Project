import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

function ListingCard({ listing, seller }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem"
            }}
        >
            <h2 style={{ margin: 0 }}>
                <Link to={`/listing/${listing.id}`}>{listing.title}</Link>
            </h2>
            <p style={{ margin: "0.25rem 0" }}>${listing.price}</p>
            <p style={{ margin: "0.25rem 0", color: "#555" }}>
                {seller?.name}
                <Badge type={seller?.type} />
            </p>
            <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#777" }}>
                {listing.category}
            </p>
        </div>
    )
}

export default ListingCard;