import React, { useState, useMemo } from "react";
import ListingCard from "../components/ListingCard";
import Filters from "../components/Filters";

function Browse({ listings, currentUser }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set();
    listings.forEach((listing) => {
      if (listing.category) {
        set.add(listing.category);
      }
    });
    return Array.from(set);
  }, [listings]);

  const filteredListings = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return listings.filter((listing) => {
      if (selectedCategory !== "All" && listing.category !== selectedCategory) {
        return false;
      }

      if (!normalizedSearch) return true;

      const title = listing.title?.toLowerCase() || "";
      const description = listing.description?.toLowerCase() || "";

      return (
        title.includes(normalizedSearch) ||
        description.includes(normalizedSearch)
      );
    });
  }, [listings, searchText, selectedCategory]);

  return (
    <div className="page">
      <h1 className="page__title">Browse Listings</h1>
      <p className="page__subtitle">
        Use search and filters to find items posted by Concordia students and
        professors.
      </p>

      <Filters
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {filteredListings.length === 0 ? (
        <p className="text-muted">
          No listings match your filters. Try adjusting your search or category.
        </p>
      ) : (
        <div className="listings-grid">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;