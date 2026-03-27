import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { users } from "../data/mockUsers";
import { getNextStep } from "../utils/flowHandler";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

import { APP_CONSTANTS } from "../utils/constants";

function LoginPage() {
  const { showToast } = useToast();
  const { loginUser } = useAuth();
  // Get live theme state from ThemeContext — no DOM observation needed
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navigate = useNavigate();

  // Handle what happens when the user clicks the login button
  function handleLogin(email: string, password: string) {
    // Find the user in our mock database
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    // Get the next route based on how many institutes/roles the user has
    const result = getNextStep(user);

    if (result.path === "error") {
      showToast(APP_CONSTANTS.ERROR_INVALID_CREDS, "error");
      return;
    }

    if (result.path === "no-institute") {
      showToast(APP_CONSTANTS.ERROR_NO_INSTITUTE, "error");
      return;
    }

    // Persist session to localStorage via AuthContext
    loginUser(user!);

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
      <ThemeSwitcher />

      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <img
            src={isDark ? logoDark : logoLight}
            alt={APP_CONSTANTS.ALT_LOGO}
            style={styles.logoImage}
          />
        </div>

        <h2 style={styles.title}>{APP_CONSTANTS.LOGIN_TITLE}</h2>

        <LoginForm onLogin={handleLogin} />
      </div>

      <p style={styles.footer}>
        {APP_CONSTANTS.LOGIN_TERMS}
      </p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
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