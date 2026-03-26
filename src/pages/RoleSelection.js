import { useLocation, useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";
import Header from "../components/common/Header";

export default function RoleSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user and previously selected institute from routing state
  const user = location.state?.user;
  const selectedInstitute = location.state?.selectedInstitute || user?.institutes?.[0];

  // Navigate to Dashboard when a user clicks a role
  function handleRoleSelect(role) {
    navigate("/dashboard", {
      state: {
        user: user,
        selectedInstitute: selectedInstitute,
        selectedRole: role,
      },
    });
  }

  // Safety check: if no user is found, show an error message
  if (!user || !selectedInstitute) {
    return (
      <div style={styles.errorContainer}>
        <h2>Please login and select institute first</h2>
      </div>
    );
  }

  // Get user initials for the header avatar
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AR";

  // Safely get the name of the selected institute
  const instituteName =
    typeof selectedInstitute === "object" ? selectedInstitute.name : selectedInstitute;

  return (
    <div style={styles.page}>
      <Header userInitials={initials} userName={user.name} />

      <main style={styles.main}>
        <div style={styles.headerText}>
          {/* Button to go back and select a different institute */}
          <button
            onClick={() => navigate("/select-institute", { state: { user } })}
            style={styles.backBtn}
          >
            {`← Change Institute (${instituteName})`}
          </button>

          <h1 style={styles.title}>Choose your Role</h1>
          <p style={styles.subtitle}>
            Select how you would like to proceed into {instituteName}
          </p>
        </div>

        <div style={styles.list}>
          {/* Loop over available roles and create a card for each */}
          {user.roles.map((role, index) => (
            <RoleCard
              key={index}
              role={role}
              onClick={() => handleRoleSelect(role)}
            />
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        Can't find your role? Contact your institute administrator or email us at{" "}
        <a href="mailto:support@schoolcoreos.com" style={styles.footerLink}>
          support@schoolcoreos.com
        </a>
      </footer>
    </div>
  );
}

const styles = {
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    fontFamily: "'Inter', sans-serif",
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--bg-app, #f5f6f8)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 16px",
  },
  headerText: {
    textAlign: "center",
    marginBottom: "36px",
  },
  backBtn: {
    display: "inline-block",
    background: "var(--border-card, #e2e8f0)",
    borderRadius: "20px",
    padding: "6px 16px",
    border: "none",
    color: "var(--accent-color, #3b82f6)",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 800,
    color: "var(--text-title, #0c2b5e)",
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "16px",
    color: "var(--text-muted, #6b7280)",
    margin: 0,
    fontWeight: 500,
  },
  list: {
    width: "100%",
    maxWidth: "540px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footer: {
    padding: "32px 16px",
    textAlign: "center",
    fontSize: "14px",
    color: "var(--text-light, #8b949e)",
    fontWeight: 500,
  },
  footerLink: {
    color: "var(--accent-color, #3b82f6)",
    textDecoration: "none",
    fontWeight: 600,
  },
};
