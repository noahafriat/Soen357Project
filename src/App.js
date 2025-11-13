import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
import Browse from './pages/Browse';
import Listing from './pages/Listing';
import Chat from './pages/Chat';
import Post from './pages/Post';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Login</Link> |{" "}
        <Link to="/browse">Browse</Link> |{" "}
        <Link to="/post">Post</Link> |{" "}
        <Link to="/listing/123">Example Listings</Link> |{" "}
        <Link to="/chat/123">Example Chat</Link>
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login />} />
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
