import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      logout();
      navigate("/"); // Redirect to home page
    };

    performLogout();
  }, [logout, navigate]);

  // This component doesn't render anything
  return null;
};

export default Logout;
