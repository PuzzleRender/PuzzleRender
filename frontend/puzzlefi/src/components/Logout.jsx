import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); // Track if logout has already been called

  useEffect(() => {
    if (!hasLoggedOut.current) {
      // Only run if logout hasn't been called yet
      hasLoggedOut.current = true; // Set to true to prevent future executions
      logout();
      toast.success("Logout successful!"); // Show toast message
      navigate("/"); // Redirect to home page
    }
  }, [logout, navigate]);

  // This component doesn't render anything
  return null;
};

export default Logout;
