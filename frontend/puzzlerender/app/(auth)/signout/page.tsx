"use client";

"use client";

import React, { useEffect } from 'react';
import axios from 'axios';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const SignOut = () => {
  useEffect(() => {
    const signOut = async () => {
      try {
        // Retrieve the refresh token from cookies
        const refreshToken = getCookie('refresh');
        
        if (!refreshToken) {
          console.warn('No refresh token found. Redirecting to sign-in.');
          // Redirect to sign-in page if no refresh token is found
          window.location.href = '/signin';
          return;
        }
        
        // Make an API call to sign out on the server
        await axios.post(
          'http://127.0.0.1:8000/signout/',
          { refresh: refreshToken }, // Send refresh token in the body
          { withCredentials: true } // Ensure cookies are sent with the request
        );

        // Delete cookies
        deleteCookie('access');
        deleteCookie('refresh');

        // Redirect or update UI after sign out
        window.location.href = '/signin'; // Redirect to sign-in page
      } catch (error) {
        console.error('Error signing out:', error);
        // Optionally redirect or show a message to the user
        window.location.href = '/signin';
      }
    };

    signOut();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        marginBottom: '20px',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        Signing out...
      </h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
    </div>
  );
  
};

export default SignOut;
