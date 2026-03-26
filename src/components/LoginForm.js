import { useState } from "react";

// Form component that handles capturing the user credentials
function LoginForm({ onLogin }) {
  // Store the user inputs locally before submitting
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Prevent default page reload and handle validation
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter username and password");
      return;
    }

    // Pass the credentials up to the parent component (LoginPage)
    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>

      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        Continue
      </button>

    </form>
  );
}

const styles = {
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid var(--border-light, #d1d5db)",
    backgroundColor: "var(--bg-card, #ffffff)",
    color: "var(--text-main, #111827)",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    padding: "14px",
    backgroundColor: "#3d7a6e",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default LoginForm;