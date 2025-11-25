import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Post({ onAddListing, currentUser }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Textbooks");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setImagePreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!title.trim() || !price.trim()) {
      setError("Title and price are required.");
      return;
    }

    const newListing = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      imageUrl: imagePreview || null,
      sellerName: currentUser?.name || currentUser?.email || "Unknown seller",
      sellerType: currentUser?.type || null,
      sellerEmail: currentUser?.email || null
    };

    onAddListing(newListing);
    navigate("/browse");
  };

  return (
    <div className="page">
      <h1 className="page__title">Post a Listing</h1>
      <p className="page__subtitle">
        Fill out the details below to post an item to the campus marketplace.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Title *</label>
          <input
            type="text"
            className="form__input"
            value={title}
            placeholder="e.g., COMP 348 Textbook"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Price *</label>
          <input
            type="number"
            min="0"
            className="form__input"
            value={price}
            placeholder="e.g., 40"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Category</label>
          <select
            className="form__select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Textbooks">Textbooks</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Furniture">Furniture</option>
            <option value="LabGear">Lab Gear</option>
            <option value="Supplies">Supplies</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Appliances">Appliances</option>
            <option value="Accessories">Accessories</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form__group">
          <label className="form__label">Description</label>
          <textarea
            className="form__textarea"
            value={description}
            placeholder="Add details like condition, pickup location, etc."
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label className="form__label">Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <p className="text-muted">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="listing-card__image"
              />
            </div>
          )}
        </div>

        {error && <p className="form__error">{error}</p>}

        <button type="submit" className="btn btn--primary">
          Post listing
        </button>
      </form>
    </div>
  );
}

export default Post;