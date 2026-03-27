import React, { useState } from "react";
import { Institute } from "../types";

interface InstituteCardProps {
  institute: Institute;
  onClick: () => void;
}

function InstituteCard({ institute, onClick }: InstituteCardProps) {
  const { name, city, state, type, logo } = institute;
  const [hovered, setHovered] = useState(false);

  // Added keyboard support for accessibility since we replaced <button> with <div>
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        boxShadow: hovered ? styles.cardHover.boxShadow : styles.card.boxShadow,
        transform: hovered ? styles.cardHover.transform : styles.card.transform,
      }}
    >
      <div style={styles.logoWrapper}>
        {/* Render the logo if available, otherwise show a default school icon */}
        {logo ? (
          <img src={logo} alt={name} style={styles.logoImage} />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-color, #3b82f6)" }}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        )}
      </div>

      <div style={styles.infoWrapper}>
        <h3 style={styles.name}>{name}</h3>

        <p style={styles.location}>
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0C2.68629 0 0 2.68629 0 6C0 10.5 6 14 6 14C6 14 12 10.5 12 6C12 2.68629 9.31371 0 6 0ZM6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6C8 7.10457 7.10457 8 6 8Z"
              fill="var(--text-muted, #94a3b8)"
            />
          </svg>
          {city}, {state}
        </p>
      </div>

      <div style={styles.type}>{type}</div>

      <div style={styles.chevronBox}>
        {/* Simple chevron icon pointing forward */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke="var(--text-main, #334155)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "var(--bg-card, #ffffff)",
    border: "1px solid var(--border-light, #e2e8f0)",
    borderRadius: "16px",
    boxShadow: "0 2px 6px var(--shadow-light, rgba(0,0,0,0.02))",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    transform: "translateY(0)",
    transition: "all 0.2s ease-in-out",
    gap: "16px",
    boxSizing: "border-box",
  },
  cardHover: {
    boxShadow: "0 8px 16px var(--shadow-light, rgba(0,0,0,0.06))",
    transform: "translateY(-1px)",
  },
  logoWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "var(--icon-bg, #ffffff)",
    border: "1px solid var(--border-light, #e2e8f0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
    padding: "2px",
    boxSizing: "border-box"
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "50%"
  },
  infoWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
  },
  name: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-title, #0f172a)",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  location: {
    fontSize: "13px",
    color: "var(--text-muted, #64748b)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: 500,
  },
  type: {
    fontSize: "15px",
    fontWeight: 500,
    color: "var(--text-light, #64748b)",
    flexShrink: 0,
  },
  chevronBox: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    backgroundColor: "var(--bg-card, #ffffff)",
    border: "1px solid var(--border-light, #e2e8f0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginLeft: "8px",
  },
};

export default InstituteCard;