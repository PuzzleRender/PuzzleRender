import axios from 'axios';
import cookie from 'js-cookie'; // You can use js-cookie or any other library to handle cookies in the browser

export const checkAuthStatus = async () => {
  try {
    // Get the access token from the cookie
    const accessToken = cookie.get('access');
    console.log(accessToken);

    if (!accessToken) {
      // If the token doesn't exist, return false
      return false;
    }

    // Make the request with the Authorization header
    const response = await axios.get('http://localhost:8000/api/check-auth/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200 && response.data.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};
