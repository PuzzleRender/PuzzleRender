import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Your AuthContext hook

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
