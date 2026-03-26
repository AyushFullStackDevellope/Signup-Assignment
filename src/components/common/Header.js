import { useEffect, useState } from "react";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

// A reusable header component that displays the app logo and user initials
function Header({ userInitials, userName }) {
  // Check if we are starting in dark mode by looking at the HTML tag
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  
  // Track if we are on a mobile screen for responsive layout adjustments
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Update our mobile state whenever the window gets resized
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);

    // Watch for theme changes applied to the document (e.g. from ThemeSwitcher)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup event listener and observer when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      style={{
        ...styles.header,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        padding: isMobile ? "16px" : "24px 40px",
        gap: isMobile ? "16px" : "0",
      }}
    >
      <div style={styles.brandWrapper}>
        <div style={styles.logoWrapper}>
          {/* Automatically switch between dark and light logos based on theme */}
          <img
            src={isDark ? logoDark : logoLight}
            alt="SchoolCoreOS Logo"
            style={styles.logoImage}
          />
        </div>
        <span style={styles.brandText}>SchoolCoreOS</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: isMobile ? "space-between" : "flex-end",
          width: isMobile ? "100%" : "auto"
        }}
      >
        <div title={userName || "User"} style={styles.avatar}>
          {userInitials}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 40px",
    flexWrap: "wrap",
    gap: "16px",
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoWrapper: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  brandText: {
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text-main, #111827)",
    letterSpacing: "-0.5px",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "var(--bg-card, #ffffff)",
    color: "var(--text-main, #111827)",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px var(--shadow-light, rgba(0,0,0,0.05))",
    userSelect: "none",
  },
};

export default Header;