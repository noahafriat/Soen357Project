import React from 'react';
import { useParams } from 'react-router-dom';
import Badge from "../components/Badge";
import ChatWindow from '../components/ChatWindow';

function Chat({ listings, currentUser }) {
    const { listingId } = useParams();

    const listing = listings.find((item) => item.id === listingId);

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
            Messaging seller: {listing.sellerName}
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