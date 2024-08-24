"use client";

import useAuth from "../components/AuthContext";
import AuthNavbar from "../components/AuthNavbar";
import Spinner from "../components/Spinner";
import AuthLayout from "../components/AuthLayout";

const Page = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{
          border: '4px solid #f3f3f3', /* Light grey */
          borderTop: '4px solid #3498db', /* Blue */
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite'
        }} />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }


  const generatePuzzle = async () => {
    try {
      const access = getCookie("access");
      const response = await fetch('http://127.0.0.1:8000/api/generate/15', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${access}` // Handle CSRF token if required
        },
        body: new URLSearchParams({ size: 15 }) // Change size as needed
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.message); // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to get CSRF token from cookies
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    console.log(cookieValue);
    return cookieValue;
  };

  return (
    <div>
      <AuthNavbar />
      Dashboard
      <button onClick={generatePuzzle}>Generate Puzzle</button>
    </div>
  )
}

Page.getLayout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
export default Page;

