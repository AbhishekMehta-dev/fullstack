import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../api/Auth.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

 
  // Log in a user
  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      setUser(data.user); 
      localStorage.setItem('user', JSON.stringify(data.user)); 
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  };

  // Log out the user
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('user'); 
      localStorage.removeItem('accessToken'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} {/* Ensure the app doesn't render until loading is complete */}
    </AuthContext.Provider>
  );
};
