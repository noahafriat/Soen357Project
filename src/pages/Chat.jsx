import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Badge from "../components/Badge";
import ChatWindow from '../components/ChatWindow';

function Chat({ listings, currentUser }) {
  const { listingId } = useParams();
  const listingIdNumber = Number(listingId);

  const listing = listings.find((item) => item.id === listingIdNumber);

  if (!listing) {
    return (
      <div className="page">
        <h1 className="page__title">Chat</h1>
        <p className="text-muted">Listing not found for id: {listingId}</p>
      </div>
    );
  }

  const initialMessages = [
    {
      id: "m1",
      from: listing.sellerName,
      fromType: listing.sellerType,
      text: "Hi, thanks for your interest in this item! How can I help you?",
      timestamp: new Date().toLocaleString(),
    }
  ];

  return (
    <div className="page">
      <h1 className="page__title">Chat about: {listing.title}</h1>

      <p className="page__subtitle">
        Messaging seller:{" "}
        <Link
          to={`/seller/${listing.sellerEmail}`}
          className="listing-card__seller-link"
        >
          {listing.sellerName}
        </Link>{" "}
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