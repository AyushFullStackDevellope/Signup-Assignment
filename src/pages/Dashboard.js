import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Manage responsive layout by checking screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Track if we're in dark mode to display the right logo
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    // Update state when window resizes
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    
    // Watch for theme changes on the html tag
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // Retrieve user data passed from previous pages
  const user = location.state?.user;
  const selectedInstitute = location.state?.selectedInstitute || user?.institutes?.[0];
  const selectedRole = location.state?.selectedRole || user?.roles?.[0];

  // Safety check: if standard data is missing, show an error
  if (!user || !selectedInstitute || !selectedRole) {
    return (
      <div style={styles.errorContainer}>
        <h2>No dashboard data found. Please log in again.</h2>
      </div>
    );
  }

  // Get user initials for the avatar icon
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AR";

  const instituteName =
    typeof selectedInstitute === "object" ? selectedInstitute.name : selectedInstitute;

  return (
    <div style={styles.page}>
      {/* Custom dynamic header for Dashboard */}
      <header
        style={{
          ...styles.header,
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          padding: isMobile ? "16px" : "24px 40px",
          gap: isMobile ? "16px" : "0",
        }}
      >
        <div style={styles.brand}>
          <div style={styles.logoWrapper}>
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
            ...styles.headerRight,
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-end",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? "12px" : "16px",
          }}
        >
          <div
            style={{
              ...styles.userInfo,
              textAlign: isMobile ? "left" : "right",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <p style={styles.userName}>{user.name}</p>
            <p style={styles.userMeta}>
              {selectedRole} at {instituteName}
            </p>
          </div>

          <div title={user.name} style={styles.avatar}>
            {initials}
          </div>

          {/* Simple logout - routes back to login screen */}
          <button onClick={() => navigate("/")} style={styles.logoutBtn}>
            Log Out
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main
        style={{
          ...styles.main,
          padding: isMobile ? "20px 16px" : "40px",
        }}
      >
        <div style={styles.topSection}>
          <h1
            style={{
              ...styles.title,
              fontSize: isMobile ? "24px" : "32px",
            }}
          >
            Welcome back, {user.name?.split(" ")[0]}!
          </h1>
          <p
            style={{
              ...styles.subtitle,
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Here is what's happening at {instituteName} today.
          </p>
        </div>

        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {/* Left card: Profile details */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Profile Overview</h3>
            <ul style={styles.list}>
              <li
                style={{
                  ...styles.listItem,
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "4px" : "0",
                }}
              >
                <span style={styles.label}>Name</span>
                <span style={styles.value}>{user.name}</span>
              </li>

              <li
                style={{
                  ...styles.listItem,
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "4px" : "0",
                }}
              >
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{user.email}</span>
              </li>

              <li
                style={{
                  ...styles.listItem,
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "4px" : "0",
                }}
              >
                <span style={styles.label}>Current Role</span>
                <span style={{ ...styles.roleBadge, color: isDark ? "#ffffff" : "#0284c7" }}>
                  {selectedRole}
                </span>
              </li>

              <li
                style={{
                  ...styles.listItem,
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "4px" : "0",
                }}
              >
                <span style={styles.label}>Institute</span>
                <span
                  style={{
                    ...styles.value,
                    textAlign: isMobile ? "left" : "right",
                    wordBreak: "break-word",
                  }}
                >
                  {instituteName}
                </span>
              </li>
            </ul>
          </div>

          {/* Right card: Welcome message */}
          <div style={styles.cardCenter}>
            <div style={styles.iconCircle}>🚀</div>
            <h3 style={styles.cardTitle}>Ready to go!</h3>
            <p style={styles.centerText}>
              Your dashboard is configured for your role as a{" "}
              <strong>{selectedRole.toLowerCase()}</strong>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    fontFamily: "'Inter', sans-serif",
    padding: "0 16px",
    textAlign: "center",
  },

  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--bg-app, #f5f6f8)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "var(--header-bg, #ffffff)",
    boxShadow: "0 1px 3px var(--shadow-light, rgba(0,0,0,0.05))",
  },

  brand: {
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
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
  },

  userInfo: {},

  userName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--text-main, #111827)",
  },

  userMeta: {
    margin: 0,
    fontSize: "12px",
    color: "var(--text-muted, #64748b)",
    wordBreak: "break-word",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "var(--bg-page, #f1f5f9)",
    color: "var(--accent-color, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    flexShrink: 0,
  },

  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    flexShrink: 0,
  },

  main: {
    flex: 1,
  },

  topSection: {
    maxWidth: "1200px",
    margin: "0 auto 32px",
  },

  title: {
    fontWeight: 800,
    color: "var(--text-title, #0c2b5e)",
    marginBottom: "8px",
  },

  subtitle: {
    color: "var(--text-muted, #6b7280)",
  },

  grid: {
    display: "grid",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  card: {
    backgroundColor: "var(--bg-card, #ffffff)",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px var(--shadow-light, rgba(0,0,0,0.02))",
  },

  cardCenter: {
    backgroundColor: "var(--bg-card, #ffffff)",
    padding: "24px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 2px 10px var(--shadow-light, rgba(0,0,0,0.02))",
  },

  cardTitle: {
    marginBottom: "16px",
    fontSize: "18px",
    color: "var(--text-main, #111827)",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },

  label: {
    color: "var(--text-subtitle, #64748b)",
  },

  value: {
    fontWeight: 600,
    color: "var(--text-main, #0f172a)",
  },

  roleBadge: {
    backgroundColor: "var(--icon-bg, #ffffff)",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
  },

  iconCircle: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    backgroundColor: "var(--bg-page, #fef3c7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    fontSize: "24px",
  },

  centerText: {
    textAlign: "center",
    fontSize: "14px",
    color: "var(--text-muted, #64748b)",
    lineHeight: "1.6",
  },
};

export default Dashboard;