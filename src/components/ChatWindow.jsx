import React, {useState} from "react";

function ChatWindow({ currentUser, otherUserName, initialMessages = [] }) {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const newMessage = {
            id: Date.now().toString(),
            from: currentUser?.name || "Me",
            fromType: currentUser?.type || "student",
            text: trimmed,
            timestamp: new Date().toLocaleString()
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
    };

    const handleSuggestedClick = (text) => {
        setInput(text);
    };

    return (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            maxWidth: "600px"
          }}
        >
          {/* Messages list will go here */}
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              marginBottom: "1rem",
              paddingRight: "0.5rem"
            }}
          >
            {messages.length === 0 && (
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Start the conversation with {otherUserName}.
              </p>
            )}
    
            {messages.map((msg) => {
              const isMe = msg.from === (currentUser?.name || "Me");
    
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    marginBottom: "0.5rem"
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "12px",
                      backgroundColor: isMe ? "#e3f2fd" : "#f3f3f3",
                      fontSize: "0.9rem"
                    }}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                      {isMe ? "You" : msg.from}
                    </div>
                    <div>{msg.text}</div>
                    <div
                      style={{
                        marginTop: "0.25rem",
                        fontSize: "0.7rem",
                        color: "#777",
                        textAlign: "right"
                      }}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
    
          {/* Safe suggested meetup buttons */}
          <div style={{ marginBottom: "0.75rem" }}>
            <p style={{ fontSize: "0.85rem", marginBottom: "0.25rem" }}>
              Suggested safe meetup messages:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() =>
                  handleSuggestedClick(
                    "Hi! Can we meet at Webster Library during the day on campus?"
                  )
                }
                style={suggestedButtonStyle}
              >
                Meet at Webster Library
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSuggestedClick(
                    "Hi! Would you be okay meeting in the Hall Building first floor?"
                  )
                }
                style={suggestedButtonStyle}
              >
                Meet in Hall Building
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSuggestedClick(
                    "Can we meet somewhere on campus in one of the buildings?"
                  )
                }
                style={suggestedButtonStyle}
              >
                General safe meetup
              </button>
            </div>
          </div>
    
          {/* Input + send */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${otherUserName}...`}
              style={{ flex: 1, padding: "0.5rem" }}
            />
            <button
              type="button"
              onClick={handleSend}
              style={{
                padding: "0.5rem 0.75rem",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      );
    }
    
    const suggestedButtonStyle = {
      padding: "0.25rem 0.5rem",
      borderRadius: "999px",
      border: "1px solid #aaa",
      backgroundColor: "white",
      fontSize: "0.75rem",
      cursor: "pointer"
    };
    
    export default ChatWindow;