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
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Post a Listing</h1>
      <p style={{ color: "#555", marginBottom: "1rem" }}>
        Fill out the details below to post an item to the campus marketplace.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.4rem" }}
            placeholder="e.g., COMP 348 Textbook"
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Price *
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "0.4rem" }}
            placeholder="e.g., 40"
          />
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "0.4rem" }}
          >
            <option value="Textbooks">Textbooks</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Furniture/Appliances">Furniture/Appliances</option>
            <option value="LabGear">Lab Gear</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: "0.4rem" }}
            placeholder="Add details like condition, pickup location, etc."
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
          {imagePreview && (
            <div style={{ marginTop: "0.5rem" }}>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: "0.75rem" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#7b1fa2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Post listing
        </button>
      </form>
    </div>
  );
}

export default Post;