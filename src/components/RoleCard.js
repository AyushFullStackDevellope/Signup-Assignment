import { useState } from "react";

// Displays a selectable role with a hover animation
function RoleCard({ role, onClick }) {
  // Track hover state so we can apply a subtle lifting effect
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        boxShadow: hovered ? styles.cardHover.boxShadow : styles.card.boxShadow,
        transform: hovered ? styles.cardHover.transform : styles.card.transform,
      }}
    >
      <div style={styles.iconWrapper}>
        <span style={styles.iconText}>
          {/* Simple avatar: Just take the first letter of the role */}
          {role?.[0]?.toUpperCase()}
        </span>
      </div>

      <div style={styles.infoWrapper}>
        <h3 style={styles.roleName}>{role}</h3>
        <p style={styles.subText}>Select this role to continue</p>
      </div>

      <div style={styles.chevronBox}>
        {/* Simple chevron pointing right */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke="var(--text-main, #475569)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

const styles = {
  card: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "var(--bg-card, #ffffff)",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 2px 6px var(--shadow-light, rgba(0,0,0,0.04))",
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
  iconWrapper: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "var(--icon-bg, #f0fdf4)",
    border: "1px solid var(--border-light, #bbf7d0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconText: {
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--accent-color, #166534)",
  },
  infoWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
  },
  roleName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text-main, #0f172a)",
    margin: 0,
  },
  subText: {
    fontSize: "13px",
    color: "var(--text-muted, #64748b)",
    margin: 0,
  },
  chevronBox: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    backgroundColor: "var(--bg-page, #f1f5f9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginLeft: "8px",
  },
};

export default RoleCard;