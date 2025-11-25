import React from "react";

function Badge({ type }) {
  if (!type) return null;

  const label =
    type === "student"
      ? "Concordia verified student"
      : "Concordia verified professor";

  return (
    <span className={`badge ${type === "student" ? "badge--student" : "badge--professor"}`}>
      {label}
    </span>
  );
}

export default Badge;