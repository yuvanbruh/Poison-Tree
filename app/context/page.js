"use client";
import { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const login = (token,user) => {
    localStorage.setItem("token", token); // Store token in localStorage
    setUser(user); // Set user from token
    setIsLoggedin(true); // Set login state to true
  };
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user <data value="
    // " className=""></data>
    setIsLoggedin(false); // Set login state to false
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = JSON.parse(atob(token.split(".")[1])); // Decode the token
        setUser(user); // Return user object
        setIsLoggedin(true); // Set login state to true
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setIsLoading(false); // Set loading state to false once the check is complete
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedin, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
