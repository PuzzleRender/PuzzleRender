import { useEffect, useState } from "react";

const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/csrf-token/");
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.csrfToken);
        }
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

export default useCsrfToken;
