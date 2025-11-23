import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Badge from "../components/Badge";

function Listing({ listings, currentUser, onUpdateListing, onDeleteListing }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const listing = listings.find((item) => String(item.id) === String(id));

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(listing?.title || "");
    const [editPrice, setEditPrice] = useState(listing?.price?.toString() || "");
    const [editDescription, setEditDescription] = useState(listing?.description || "");
    const [editImagePreview, setEditImagePreview] = useState(listing?.imageUrl || null);

    useEffect(() => {
        if (listing) {
          setEditTitle(listing.title || "");
          setEditPrice(listing.price.toString());
          setEditDescription(listing.description || "");
          setEditImagePreview(listing.imageUrl || null);
        }
      }, [listing]);

    if (!listing) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Listing not found</h1>
                <p>We couldn't find a listing with the id: {id}</p>
            </div>
        )
    }

    const isOwner = currentUser && listing.sellerEmail && currentUser.email && 
        listing.sellerEmail.toLowerCase() === currentUser.email.toLowerCase();

    const handleMessageSeller = () => {
        navigate(`/chat/${listing.id}`);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setEditImagePreview(listing.imageUrl || null);
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        setEditImagePreview(previewUrl);
    };

    const handleSaveChanges = (event) => {
        event.preventDefault();

        const updatedListing = {
            ...listing,
            title: editTitle.trim(),
            price: Number(editPrice),
            description: editDescription.trim(),
            imageUrl: editImagePreview || null,
            sellerEmail: listing.sellerEmail || currentUser?.email || null
        };

        onUpdateListing(updatedListing);
        setIsEditing(false);
    }

    const handleDeleteListing = () => {
        if (window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
            onDeleteListing(listing.id);
            navigate("/browse");
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>{listing.title}</h1>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                ${listing.price}
            </p>

            <p style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
                Seller: 
                <Link
                to={`/seller/${listing.sellerEmail}`}
                style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold", marginLeft: "10px" }}
                >
                {listing.sellerName}
                </Link>
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

            {isOwner ? (
                <div style={{ marginTop: "1rem" }}>
                    <p
                        style={{
                        color: "#1976d2",
                        fontWeight: "bold",
                        marginBottom: "0.5rem"
                        }}
                    >
                        This is your listing. You can edit the details below.
                    </p>

                    {!isEditing && (
                        <>
                        <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginBottom: "1rem",
                            marginRight: "0.5rem"
                        }}
                        >
                        Edit listing
                        </button>
                        <button
                        type="button"
                        onClick={handleDeleteListing}
                        style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#d32f2f",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginBottom: "1rem"
                        }}
                        >
                        Delete listing
                        </button>
                        </>
                    )}

                    {isEditing && (
                        <form
                        onSubmit={handleSaveChanges}
                        style={{ maxWidth: "400px", marginTop: "0.5rem" }}
                        >

                        <div style={{ marginBottom: "0.75rem" }}>
                            <label style={{ display: "block", marginBottom: "0.25rem" }}>
                            Title
                            </label>
                            <textarea
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            rows={4}
                            style={{ width: "100%", padding: "0.4rem" }}
                            />
                        </div>

                        <div style={{ marginBottom: "0.75rem" }}>
                            <label style={{ display: "block", marginBottom: "0.25rem" }}>
                            Price
                            </label>
                            <input
                            type="number"
                            min="0"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            style={{ width: "100%", padding: "0.4rem" }}
                            />
                        </div>

                        <div style={{ marginBottom: "0.75rem" }}>
                            <label style={{ display: "block", marginBottom: "0.25rem" }}>
                            Description
                            </label>
                            <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={4}
                            style={{ width: "100%", padding: "0.4rem" }}
                            />
                        </div>

                        <div style={{ marginBottom: "0.75rem" }}>
                            <label style={{ display: "block", marginBottom: "0.25rem" }}>
                            Image (optional)
                            </label>
                            <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            />
                            {editImagePreview && (
                            <div style={{ marginTop: "0.5rem" }}>
                                <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: "#555",
                                    marginBottom: "0.25rem"
                                }}
                                >
                                Preview:
                                </p>
                                <img
                                src={editImagePreview}
                                alt="Preview"
                                style={{ maxWidth: "200px", borderRadius: "8px" }}
                                />
                            </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#4caf50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginRight: "0.5rem"
                            }}
                        >
                            Save changes
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                            setIsEditing(false);
                            setEditTitle(listing.title || "");
                            setEditPrice(listing.price.toString());
                            setEditDescription(listing.description || "");
                            setEditImagePreview(listing.imageUrl || null);
                            }}
                            style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#ccc",
                            color: "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                            }}
                        >
                            Cancel
                        </button>
                        </form>
                    )}
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default Listing;