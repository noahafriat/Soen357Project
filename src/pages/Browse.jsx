import React, { useState, useMemo }  from "react";
import ListingCard from "../components/ListingCard";
import Filters from "../components/Filters";

function Browse({ listings }) {
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

  const filteredListings = useMemo (() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return listings.filter((listing) => {
      if (selectedCategory !== "All" && listing.category !== selectedCategory) {
        return false;
      }

      if (!normalizedSearch) return true;

      const title = listing.title?.toLowerCase() || "";
      const description = listing.description?.toLowerCase() || "";

      return (
        title.includes(normalizedSearch) || description.includes(normalizedSearch)
      );
    });
  }, [listings, searchText, selectedCategory]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Browse Listings</h1>
      <p style={{ color: "#555", marginBottom: "0.5rem" }}>
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

      <div style={{ marginTop: "1rem" }}>
        {filteredListings.length === 0 ? (
          <p style={{ color: "#777", fontStyle: "italic" }}>
            No listings match your filters. Try adjusting your search or
            category.
          </p>
        ) : (
          filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}

export default Browse;