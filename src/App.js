import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App; 