import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Badge from "../components/Badge";
import ChatWindow from '../components/ChatWindow';

function Chat({ listings, currentUser }) {
    const { listingId } = useParams();
    const listingIdNumber = Number(listingId);


    const listing = listings.find((item) => item.id === listingIdNumber);

    if(!listing) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Chat</h1>
                <p>Listing not found for id: {listingId}</p>
            </div>
        )
    }

    const initialMessages = [
      {
        id: "m1",
        from: listing.sellerName,
        fromType: listing.sellerType,
        text: "Hi, thanks for your interest in this item, how can I help you?",
        timestamp: new Date().toLocaleString()
      }
    ];

    return (
        <div style={{ padding: "2rem" }}>
          <h1>Chat about: {listing.title}</h1>
    
        <p style={{ marginBottom: "1rem" }}>
            Messaging seller: 
            <Link
              to={`/seller/${listing.sellerEmail}`}
              style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold", marginLeft: "10px" }}
            >
              {listing.sellerName}
            </Link>

            <Badge type={listing.sellerType} />
        </p>
        <ChatWindow
          currentUser={currentUser}
          otherUserName={listing.sellerName}
          initialMessages={initialMessages}
        />
        </div>
      );
    }

export default Chat;