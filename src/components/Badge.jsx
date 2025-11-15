import React from "react";

function Badge({ type }) {
    if (!type) return null;

    const label = (type === "student" ? "Concordia verified student" : "Concordia verified professor");

    return (
        <span
            style={{
                marginLeft: "0.5rem",
                padding: "0.1rem 0.4rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                backgroundColor: "#e0f7ea",
                color: "#0b8a4a",
                border: "1px solid #0b8a4a"
            }}
        >
            {label}
        </span>
    )
}

export default Badge;