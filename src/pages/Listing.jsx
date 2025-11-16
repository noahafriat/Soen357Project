import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Badge from "../components/Badge";

function Listing({ listings }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const listing = listings.find((item) => item.id === id);

    if (!listing) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Listing not found</h1>
                <p>We couldn't find a listing with the id: {id}</p>
            </div>
        )
    }

    const handleMessageSeller = () => {
        navigate(`/chat/${listing.id}`);
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>{listing.title}</h1>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                ${listing.price}
            </p>

            <p style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                Seller: {listing.sellerName}
                <Badge type={listing.sellerType} />
            </p>

            {listing.imageUrl && (
                <div style={{ marginBottom: "1rem" }}>
                <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    style={{ maxWidth: "300px", borderRadius: "8px" }}
                />
                </div>
            )}

            <p style={{ maxWidth: "600px", marginBottom: "1rem" }}>
                {listing.description}
            </p>
                
            <p style={{ color: "#555", marginBottom: "1.5rem" }}>
                Category: {listing.category}
            </p>
                
            <button
                onClick={handleMessageSeller}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}   
            >
                Message seller
            </button>
        </div>
    );
}

export default Listing;