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
  const [editDescription, setEditDescription] = useState(
    listing?.description || ""
  );
  const [editImagePreview, setEditImagePreview] = useState(
    listing?.imageUrl || null
  );

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
      <div className="page">
        <h1 className="page__title">Listing not found</h1>
        <p className="text-muted">
          We couldn't find a listing with the id: <strong>{id}</strong>.
        </p>
      </div>
    );
  }

  const isOwner =
    currentUser &&
    listing.sellerEmail &&
    currentUser.email &&
    listing.sellerEmail.toLowerCase() === currentUser.email.toLowerCase();

  const handleMessageSeller = () => {
    navigate(`/chat/${listing.id}`);
  };

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
      sellerEmail: listing.sellerEmail || currentUser?.email || null,
    };

    onUpdateListing(updatedListing);
    setIsEditing(false);
  };

  const handleDeleteListing = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this listing? This action cannot be undone."
      )
    ) {
      onDeleteListing(listing.id);
      navigate("/browse");
    }
  };

  return (
    <div className="listing-page">
      <h1 className="listing-page__title">{listing.title}</h1>
      <p className="listing-page__price">${listing.price}</p>
  
      <p className="listing-page__seller-row">
        Seller:
        <Link
          to={`/seller/${listing.sellerEmail}`}
          className="listing-card__seller-link"
        >
          {listing.sellerName}
        </Link>
        <Badge type={listing.sellerType} />
      </p>
  
      {listing.imageUrl && (
        <div className="listing-page__image-wrapper">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="listing-page__image"
          />
        </div>
      )}
  
      <p className="listing-page__description">{listing.description}</p>
  
      <p className="listing-page__category">
        Category: {listing.category}
      </p>
  
      {/* Owner section */}
      {isOwner ? (
        <div>
          <p className="listing-page__owner-message">
            This is your listing. You can edit the details below.
          </p>
  
          {!isEditing && (
            <>
              <button
                className="btn btn--primary"
                onClick={() => setIsEditing(true)}
                style={{ marginRight: "0.5rem" }}
              >
                Edit listing
              </button>
  
              <button
                className="btn btn--danger"
                onClick={handleDeleteListing}
              >
                Delete listing
              </button>
            </>
          )}
  
          {isEditing && (
            <form
              onSubmit={handleSaveChanges}
              className="listing-page__edit-form form"
            >
              <div className="form__group">
                <label className="form__label">Title</label>
                <input
                  className="form__input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
  
              <div className="form__group">
                <label className="form__label">Price</label>
                <input
                  type="number"
                  className="form__input"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </div>
  
              <div className="form__group">
                <label className="form__label">Description</label>
                <textarea
                  className="form__textarea"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
  
              <div className="form__group">
                <label className="form__label">Image (optional)</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
  
              {editImagePreview && (
                <div className="listing-page__image-wrapper">
                  <img
                    src={editImagePreview}
                    alt="Preview"
                    className="listing-page__image"
                  />
                </div>
              )}
  
              <button className="btn btn--primary" type="submit">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(listing.title);
                  setEditPrice(listing.price.toString());
                  setEditDescription(listing.description);
                  setEditImagePreview(listing.imageUrl);
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      ) : (
        <button className="btn btn--primary" onClick={handleMessageSeller}>
          Message seller
        </button>
      )}
    </div>
  );  
}

export default Listing;