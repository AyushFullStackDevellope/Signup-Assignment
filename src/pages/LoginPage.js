import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { users } from "../data/mockUsers";
import { getNextStep } from "../utils/flowHandler";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

function LoginPage() {
  const [error, setError] = useState("");
  // Track if we are in dark mode to display the correct logo
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  const navigate = useNavigate();

  // Listen for theme changes from the ThemeSwitcher
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Handle what happens when the user clicks the login button
  function handleLogin(email, password) {
    // Find the user in our mock database
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    // Get the next route based on how many institutes/roles the user has
    const result = getNextStep(user);

    if (result.path === "error") {
      setError("Incorrect credentials");
      return;
    }

    if (result.path === "no-institute") {
      setError("User not associated with any institute");
      return;
    }

    // Clear any previous errors on successful login
    setError("");

    // Route the user to their initial destination and pass the user config
    if (result.path === "dashboard") {
      navigate("/dashboard", { state: { user } });
    } else if (result.path === "select-role") {
      navigate("/select-role", { state: { user } });
    } else if (result.path === "select-institute") {
      navigate("/select-institute", { state: { user } });
    }
  }

  return (
    <div style={styles.page}>
      <div style={{ position: "absolute", top: "24px", right: "24px" }}>
        <ThemeSwitcher />
      </div>

      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <img
            src={isDark ? logoDark : logoLight}
            alt="logo"
            style={styles.logoImage}
          />
        </div>

        <h2 style={styles.title}>SchoolCoreOS</h2>

        <LoginForm onLogin={handleLogin} />
        
        {/* Show error message if login failed */}
        {error && <p style={styles.error}>{error}</p>}
      </div>

      <p style={styles.footer}>
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}

const styles = {
  error: {
    color: "#dc2626",
    fontSize: "14px",
    marginBottom: "10px",
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--bg-page, #e8e9eb)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "16px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "var(--bg-card, #fff)",
    borderRadius: "16px",
    padding: "40px 32px",
    boxShadow: "0 2px 20px var(--shadow-light, rgba(0,0,0,0.08))",
    textAlign: "center",
    boxSizing: "border-box",
  },
  logoWrapper: {
    width: "70px",
    height: "70px",
    margin: "0 auto 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  title: {
    marginBottom: "20px",
    color: "var(--text-main, #111827)",
  },
  footer: {
    marginTop: "20px",
    fontSize: "13px",
    color: "var(--text-light, #888)",
  },
};

export default LoginPage;