import React from 'react';
import { useParams } from 'react-router-dom';
import listingsData from "../data/listings.json";
import usersData from "../data/users.json";
import Badge from "../components/Badge";

function Chat() {
    const { listingId } = useParams();

    const listing = listingsData.find((item) => item.id === listingId);

    if(!listing) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Chat</h1>
                <p>Listing not found for id: {listingId}</p>
            </div>
        )
    }

    const seller = usersData.find((user) => user.id === listing.sellerId);

    return (
        <div style={{ padding: "2rem" }}>
          <h1>Chat about: {listing.title}</h1>
    
          {seller && (
            <p style={{ marginBottom: "1rem" }}>
              Messaging seller: {seller.name}
              <Badge type={seller.type} />
            </p>
          )}
    
          <p style={{ color: "#555", marginBottom: "1rem" }}>
            This is where the chat window will go.
          </p>
        </div>
      );
    }

export default Chat;