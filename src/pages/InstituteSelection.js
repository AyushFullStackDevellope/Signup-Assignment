import { useLocation, useNavigate } from "react-router-dom";
import InstituteCard from "../components/InstituteCard";
import { useState } from "react";
import Header from "../components/common/Header";
import logoOne from "../assets/logo-one.png";
import logoTwo from "../assets/logo-two.png";
import logoThree from "../assets/logo-three.png";
import logoFour from "../assets/logo-four.png";
import logoFive from "../assets/logo-five.png";

export default function InstituteSelection() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get user from location state, or use a mock user for visual testing
  const user = location.state?.user || {
    name: "Alex",
    institutes: [
      { name: "North Park Academy", city: "Mumbai", state: "Maharashtra", type: "School", logo: logoOne },
      { name: "Earlyteh College", city: "Pune", state: "Maharashtra", type: "College", logo: logoTwo },
      { name: "Renaissance Academy", city: "Bangalore", state: "Karnataka", type: "Training", logo: logoThree },
      { name: "Pune University", city: "Pune", state: "Maharashtra", type: "University", logo: logoFour },
      { name: "Mount Carmel School", city: "Nagpur", state: "Maharashtra", type: "School", logo: logoFive },
      { name: "Samhita Academy", city: "Chandigarh", state: "Punjab", type: "College", logo: logoOne }
    ],
    roles: ["Student"]
  };

  // Navigates to the next page depending on how many roles the user has
  function handleInstituteSelect(institute) {
    if (user.roles.length === 1) {
      // Setup is complete, go directly to Dashboard
      navigate("/dashboard", {
        state: { user, selectedInstitute: institute, selectedRole: user.roles[0] },
      });
    } else {
      // User has multiple roles, let them pick one
      navigate("/select-role", {
        state: { user, selectedInstitute: institute },
      });
    }
  }

  // Extract the first 2 initials of the user's name for the avatar
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AR";

  const [searchTerm, setSearchTerm] = useState("");
  
  // Show the text input only if the user has 5 or more institutes to choose from
  const showSearchBar = user.institutes.length >= 5;

  const filteredInstitutes = user.institutes.filter((institute) =>
    (institute.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <Header userInitials={initials} userName={user.name} />
    
      <main style={styles.main}>
        <div style={styles.headerText}>
          <h1 style={styles.title}>
            Hi, {user.name?.split(" ")[0]} ! <span aria-label="wave">👋</span>
          </h1>
          <p style={styles.subtitle}>
            Select your institute to access your personalized dashboard
          </p>
        </div>

        <div style={styles.list}>
          {/* Conditionally render the search bar */}
          {showSearchBar && (
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search institutes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          )}

          {/* Render the filtered list of available institutes */}
          {filteredInstitutes.map((institute, index) => (
            <InstituteCard 
              key={index} 
              institute={institute} 
              onClick={() => handleInstituteSelect(institute)} 
            />
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        Can't find your institute? Contact your institute administrator or email us at{" "}
        <a href="mailto:support@schoolcoreos.com" style={styles.footerLink}>
          support@schoolcoreos.com
        </a>
      </footer>
    </div>
  );
}

const styles = {
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
  searchContainer: {
    marginBottom: "8px",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid var(--border-light, #d1d5db)",
    backgroundColor: "var(--bg-card, #ffffff)",
    color: "var(--text-main, #111827)",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
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