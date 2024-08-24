import React, { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Example of getToken function
  const getToken = () => {
    // This function can retrieve the token from state or storage
    return token || localStorage.getItem("authToken");
  };

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("authToken", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, getToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
