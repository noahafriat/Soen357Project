import React from 'react';
import { useParams } from 'react-router-dom';

function Chat() {
    const { listingId } = useParams();
    return (
        <div>
            <h1>Chat</h1>
            <p>Chat about listing: {listingId}</p>
            <p>This will show the chat between the buyer and seller</p>
        </div>
    )
}

export default Chat;