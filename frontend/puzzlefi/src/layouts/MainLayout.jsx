import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NavBarAuth from "../components/NavBarAuth";
import { useAuth } from "../components/AuthContext";

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      {isAuthenticated ? <NavBarAuth /> : <NavBar />}
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default MainLayout;
