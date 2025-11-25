import React, { useState, useEffect, useRef } from "react";

function ChatWindow({ currentUser, otherUserName, initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const messagesContainerRef = useRef(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage = {
      id: Date.now().toString(),
      from: currentUser?.name || "Me",
      fromType: currentUser?.type || "student",
      text: trimmed,
      timestamp: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleSuggestedClick = (text) => {
    setInput(text);
  };

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-window__messages" ref={messagesContainerRef}>
        {messages.length === 0 && (
          <p className="chat-window__empty text-muted">
            Start the conversation with {otherUserName}.
          </p>
        )}

        {messages.map((msg) => {
          const isMe = msg.from === (currentUser?.name || "Me");

          return (
            <div
              key={msg.id}
              className={
                "chat-window__message-row " +
                (isMe
                  ? "chat-window__message-row--me"
                  : "chat-window__message-row--other")
              }
            >
              <div
                className={
                  "chat-window__bubble " +
                  (isMe
                    ? "chat-window__bubble--me"
                    : "chat-window__bubble--other")
                }
              >
                <div className="chat-window__sender">
                  {isMe ? "You" : msg.from}
                </div>
                <div className="chat-window__text">{msg.text}</div>
                <div className="chat-window__timestamp">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-window__suggested">
        <p className="chat-window__suggested-label">
          Suggested safe meetup messages:
        </p>
        <div className="chat-window__suggested-buttons">
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() =>
              handleSuggestedClick(
                "Hi! Can we meet at Webster Library during the day on campus?"
              )
            }
          >
            Meet at Webster Library
          </button>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() =>
              handleSuggestedClick(
                "Hi! Would you be okay meeting in the Hall Building first floor?"
              )
            }
          >
            Meet in Hall Building
          </button>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() =>
              handleSuggestedClick(
                "Can we meet somewhere on campus in one of the buildings?"
              )
            }
          >
            General safe meetup
          </button>
        </div>
      </div>

      <div className="chat-window__input-row">
        <input
          type="text"
          className="form__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${otherUserName}...`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="button"
          className="btn btn--primary"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
