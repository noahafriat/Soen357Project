import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Browse from './pages/Browse';
import Listing from './pages/Listing';
import Chat from './pages/Chat';
import Post from './pages/Post';

import listingsData from "./data/listings.json";
import usersData from "./data/users.json";

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  const buildInitialListings = () =>
    listingsData.map((item) => {
      const seller = usersData.find((u) => u.id === item.sellerId);
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        price: item.price,
        description: item.description,
        imageUrl: item.imageUrl || null, 
        sellerName: seller?.name || "Unknown seller",
        sellerType: seller?.type || null
      };
    });

  const [listings, setListings] = useState(buildInitialListings);

  const handleAddListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]); // put new one at top
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ddd" }}>
        <Link to="/">Login</Link> |{" "}
        <Link to="/browse">Browse</Link> |{" "}
        <Link to="/post">Post</Link> |{" "}
        {currentUser && (
          <span style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
            Logged in as: {currentUser.name} (
            {currentUser.type})
          </span>
        )}
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login onLogin={setCurrentUser} />} />
          <Route
            path="/browse"
            element={
              currentUser ? (
                <Browse listings={listings} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/post"
            element={
              currentUser ? (
                <Post
                  onAddListing={handleAddListing}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/listing/:id"
            element={
              currentUser ? (
                <Listing listings={listings} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/chat/:listingId"
            element={
              currentUser ? (
                <Chat listings={listings} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
