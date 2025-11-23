import React from "react";

function Filters({
  searchText,
  onSearchTextChange,
  selectedCategory,
  onCategoryChange,
  categories
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "1rem",
        marginBottom: "1rem"
      }}
    >
      <div style={{ flex: 1, minWidth: "200px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontSize: "0.85rem",
            color: "#555"
          }}
        >
          Search
        </label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="Search by title or description..."
          style={{ width: "100%", padding: "0.4rem" }}
        />
      </div>

      <div style={{ width: "200px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontSize: "0.85rem",
            color: "#555"
          }}
        >
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ width: "100%", padding: "0.4rem" }}
        >
          <option value="All">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
