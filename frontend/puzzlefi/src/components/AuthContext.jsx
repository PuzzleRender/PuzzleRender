import React, { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Example of getToken function
  const getToken = () => {
    return token || localStorage.getItem("jwtToken");
  };

  const setAndUpdateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("jwtToken", userToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to local storage
    setLoading(false); // Set loading to false after login
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setLoading(false); // Set loading to false after logout
  };

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      // Validate the token with your backend API
      fetch("http://127.0.0.1:8000/api/validate-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setUser(JSON.parse(savedUser)); // Restore user from local storage
            setToken(savedToken);
          } else {
            logout();
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          logout();
        })
        .finally(() => setLoading(false)); // Set loading to false after the verification completes
      // .finally(() => {
      //   // Introduce a 5-second delay before setting loading to false
      //   setTimeout(() => setLoading(false), 5000);
      // });
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        getToken,
        login,
        logout,
        isAuthenticated,
        loading,
        setAndUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
