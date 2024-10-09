import React, { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check local storage on initial load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
