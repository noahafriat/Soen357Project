import React from 'react';
import { useParams } from 'react-router-dom';
import Badge from "../components/Badge";

function Chat({ listings }) {
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

    return (
        <div style={{ padding: "2rem" }}>
          <h1>Chat about: {listing.title}</h1>
    
        <p style={{ marginBottom: "1rem" }}>
            Messaging seller: {listing.sellerName}
            <Badge type={listing.sellerType} />
        </p>
         
          <p style={{ color: "#555", marginBottom: "1rem" }}>
            This is where the chat window will go.
          </p>
        </div>
      );
    }

export default Chat;