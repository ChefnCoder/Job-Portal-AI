import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export function useAuth() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [error, setError] = useState(null);

  // API Request Wrapper (Handles Token Expiry & Refresh)
  const apiRequest = async (config) => {
    let accessToken = localStorage.getItem("token");

    config.headers = { Authorization: `Bearer ${accessToken}` };

    try {
      return await axios(config);
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(" Access Token Expired. Refreshing...");
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return await axios(config);
        }
      }
      throw error;
    }
  };

  // Function to Refresh Token
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
      localStorage.setItem("token", res.data.accessToken);
      return res.data.accessToken;
    } catch (err) {
      logout(); // Logout if refresh fails
      return null;
    }
  };

  //  Signup Function (Now Uses apiRequest)
  const signup = async (formData) => {
    try {
      const res = await apiRequest({
        method: "POST",
        url: `${API_URL}/auth/register`,
        data: formData,
        withCredentials: true,
      });
      
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      return null;
    }
  };

  //  Login Function (Now Uses apiRequest)
  const login = async (formData) => {
    try {
      const res = await apiRequest({
        method: "POST",
        url: `${API_URL}/auth/login`,
        data: formData,
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      return null;
    }
  };

  // Logout Function
  const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, error, signup, login, logout, apiRequest };
}
