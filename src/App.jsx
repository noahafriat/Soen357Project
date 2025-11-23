import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Browse from './pages/Browse';
import Listing from './pages/Listing';
import Chat from './pages/Chat';
import Post from './pages/Post';
import MyListings from './pages/MyListings';
import SellerProfile from './pages/SellerProfile';

import listingsData from "./data/listings.json";
import usersData from "./data/users.json";

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(usersData);

  const handleLogin = (user) => {
    setCurrentUser(user);
  
    setUsers((prevUsers) => {
      const emailKey = user.email.toLowerCase();
  
      const exists = prevUsers.some(
        (u) => u.email.toLowerCase() === emailKey
      );
      if (!exists) {
        setSellerRatings((prevRatings) => {
          if (prevRatings[emailKey]) return prevRatings;
  
          return {
            ...prevRatings,
            [emailKey]: (Math.random() * 1.5 + 3.5).toFixed(1),
          };
        });
  
        return [...prevUsers, user];
      }
  
      return prevUsers;
    });
  };
  

  const handleLogout = () => {
    setCurrentUser(null);
  }
  
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
        sellerType: seller?.type || null,
        sellerEmail: seller?.email || null
      };
    });

  const [listings, setListings] = useState(buildInitialListings);

  const buildInitialRatings = () => {
    const ratings = {};
    usersData.forEach((u) => {
      const key = u.email.toLowerCase();
      ratings[key] = (Math.random() * 1.5 + 3.5).toFixed(1);
    });
    return ratings;
  };
  
  const [sellerRatings, setSellerRatings] = useState(buildInitialRatings);


  const handleUpdateListing = (updatedListing) => {
    setListings((prev) => 
      prev.map((listing) => 
        listing.id === updatedListing.id ? updatedListing : listing
      )
    );
  };

  const handleAddListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]); 
  };

  const handleDeleteListing = (listingId) => {
    setListings((prev) => prev.filter((listing) => listing.id !== listingId));
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: "0.5rem 1rem", borderBottom: "1px solid #ddd" }}>
        <Link to="/">Login</Link> |{" "}
        <Link to="/browse">Browse</Link> |{" "}
        <Link to="/post">Post</Link> |{" "}
        <Link to="/my-listings">My Listings</Link> |{" "}
        {currentUser && (
          <span style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>
            Logged in as: {currentUser.name} ({currentUser.type}) {" "}
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "0.75rem",
                padding: "0.25rem 0.5rem",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.85rem"
              }}
            >
              Logout
            </button>
          </span>
        )}
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/browse"
            element={
              currentUser ? (
                <Browse listings={listings} currentUser={currentUser} />
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
                <Listing 
                  listings={listings} 
                  currentUser={currentUser}
                  onUpdateListing={handleUpdateListing}
                  onDeleteListing={handleDeleteListing}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/chat/:listingId"
            element={
              currentUser ? (
                <Chat listings={listings} currentUser={currentUser} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/my-listings"
            element={
              currentUser ? (
                <MyListings listings={listings} currentUser={currentUser} />
              ) : (
                <Navigate to ='/' replace />
              )
            }
          />

          <Route
            path="/seller/:email"
            element={
              currentUser ? (
                <SellerProfile listings={listings} users={users} sellerRatings={sellerRatings} />
              ) : (
                <Navigate to ='/' replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
