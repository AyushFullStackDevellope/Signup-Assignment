import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Persist logged in user state automatically
  const [user, setUser] = useState<User | null>(() => {
    // Check if the user is already authenticated on initial load
    const saved = localStorage.getItem("auth-user");
    return saved ? JSON.parse(saved) : null;
  });

  // Keep localStorage perfectly aligned with active user context globally
  useEffect(() => {
    if (user) {
      localStorage.setItem("auth-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth-user");
    }
  }, [user]);

  function loginUser(userData: User) {
    setUser(userData);
  }

  function logoutUser() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Read and mutate user sessions globally through this standard hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
