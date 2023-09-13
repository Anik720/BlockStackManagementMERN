// axiosMiddleware.js

import axios from "axios";
import useAuthService from "../authService/authService";

const axiosMiddleware = async (config) => {
  let axiosConfig;

  const { refreshAccessToken } = useAuthService();

  try {
    await refreshAccessToken(); // Refresh the access token
    // Update the request headers with the new access token
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Set your token here
    };
    axiosConfig = { ...config };
  } catch (error) {
    // Handle the error (e.g., logout the user)
    console.error("Error refreshing access token:", error);
    throw error; // Propagate the error
  }
  //   }

  // Make the API request with the updated configuration
  return axios(axiosConfig);
};

export default axiosMiddleware;
