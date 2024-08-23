"use client";

import useAuth from "../components/AuthContext";
import AuthNavbar from "../components/AuthNavbar"
import Spinner from "../components/Spinner";


const Page = () => {

  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated) {
    return null; // or a loading spinner until redirection
  }

  if (loading) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <AuthNavbar />
      Dashboard
    </div>
  )
}

export default Page
