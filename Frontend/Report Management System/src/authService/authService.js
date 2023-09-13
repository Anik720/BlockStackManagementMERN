import axios from "axios";
import { baseURL } from "../components/utils/ApiURLS";

function useAuthService() {
  // Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      // Get the refresh token from cookies
      const refreshTokenFromCookies = localStorage.getItem("refreshToken");
      // Send a POST request to your backend API with the refresh token
      const response = await axios.post(
        baseURL + "api/auth/refresh-token",
        {
          refreshToken: refreshTokenFromCookies,
        },
      );

      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("loggedinUser", JSON.stringify(response.data.user));

    } catch (error) {
      // Handle the error (e.g., logout the user)
      console.error("Error refreshing access token:", error);
    }
  };

  return {
    refreshAccessToken,
  };
}

export default useAuthService;
