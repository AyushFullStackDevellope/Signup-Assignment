import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InstituteCard from "../components/InstituteCard";
import Header from "../components/common/Header";
import logoOne from "../assets/logo-one.png";
import logoTwo from "../assets/logo-two.png";
import logoThree from "../assets/logo-three.png";
import logoFour from "../assets/logo-four.png";
import { Institute } from "../types";

import { APP_CONSTANTS } from "../utils/constants";

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
      { name: "Mount Carmel School", city: "Nagpur", state: "Maharashtra", type: "School", logo: logoOne },
      { name: "Samhita Academy", city: "Chandigarh", state: "Punjab", type: "College", logo: logoOne }
    ],
    roles: ["Student"]
  };

  // Navigates to the next page depending on how many roles the user has
  function handleInstituteSelect(institute: Institute) {
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
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AR";

  const [searchTerm, setSearchTerm] = useState("");
  
  // Show the text input only if the user has 5 or more institutes to choose from
  const showSearchBar = user.institutes.length >= 5;

  const filteredInstitutes = user.institutes.filter((institute: Institute) =>
    (institute.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <Header userInitials={initials} userName={user.name} />
    
      <main style={styles.main}>
        <div style={styles.headerText}>
          <h1 style={styles.title}>
            {APP_CONSTANTS.INSTITUTE_SELECT_TITLE.replace("{name}", user.name?.split(" ")[0])}
          </h1>
          <p style={styles.subtitle}>
            {APP_CONSTANTS.INSTITUTE_SELECT_SUBTITLE}
          </p>
        </div>

        <div style={styles.list}>
          {/* Conditionally render the search bar */}
          {showSearchBar && (
            <div style={styles.searchContainer}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={styles.searchIcon}>
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.3-4.3"/>
              </svg>
              <input
                type="text"
                placeholder={APP_CONSTANTS.SEARCH_PLACEHOLDER}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          )}

          {/* Render the filtered list of available institutes */}
          {filteredInstitutes.map((institute: Institute, index: number) => (
            <InstituteCard 
              key={index} 
              institute={institute} 
              onClick={() => handleInstituteSelect(institute)} 
            />
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        {APP_CONSTANTS.FOOTER_SUPPORT_INSTITUTE}
        <a href={`mailto:${APP_CONSTANTS.SUPPORT_EMAIL}`} style={styles.footerLink}>
          {APP_CONSTANTS.SUPPORT_EMAIL}
        </a>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--bg-app, #f4f5f6)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 16px 40px",
    width: "100%",
    boxSizing: "border-box",
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
    color: "var(--text-muted, #64748b)",
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
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
  },
  searchInput: {
    width: "100%",
    padding: "16px 20px 16px 48px",
    borderRadius: "12px",
    border: "1px solid var(--border-light, #cbd5e1)",
    backgroundColor: "transparent",
    color: "var(--text-main, #0f172a)",
    fontSize: "18px",
    outline: "none",
    boxSizing: "border-box",
  },
  footer: {
    padding: "32px 16px",
    textAlign: "center",
    fontSize: "13px",
    color: "var(--text-muted, #64748b)",
    fontWeight: 500,
  },
  footerLink: {
    color: "var(--accent-color, #3b82f6)",
    textDecoration: "none",
    fontWeight: 500,
  },
};