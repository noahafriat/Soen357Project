import React from "react";

function Filters({
  searchText,
  onSearchTextChange,
  selectedCategory,
  onCategoryChange,
  categories
}) {
  return (
    <div className="filters">
      <div className="filters__search">
        <label className="filters__label">Search</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="Search by title or description"
          className="form__input"
        />
      </div>

      <div className="filters__category">
        <label className="filters__label">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="form__select"
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
