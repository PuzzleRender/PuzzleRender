import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
