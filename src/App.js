import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
import Browse from './pages/Browse';
import Listing from './pages/Listing';
import Chat from './pages/Chat';
import Post from './pages/Post';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
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
          <Route path="/browse" element={<Browse />} />
          <Route path="/post" element={<Post />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/chat/:listingId" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
