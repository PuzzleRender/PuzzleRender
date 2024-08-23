"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie('access'); // Replace 'access' with your cookie name
      setToken(token);
      try {
        if (!token) {
          setIsAuthenticated(false);
          router.push('/signin'); // redirect to login if not authenticated
        } else {
          const response = await axios.get('http://127.0.0.1:8000/api/check-auth/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
            router.push('/dashboard');
          } else {
            setIsAuthenticated(false);
            router.push('/signin');
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push('/signin');
      } finally {
        setLoading(false); // set loading to false after check completes
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, loading };
};

export default useAuth;
