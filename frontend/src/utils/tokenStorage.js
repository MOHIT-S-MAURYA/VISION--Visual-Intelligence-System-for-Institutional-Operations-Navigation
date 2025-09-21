// Token storage utility functions for VISION frontend

const TOKEN_KEY = "vision_auth_token";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error("Error setting token:", error);
    return false;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error("Error removing token:", error);
    return false;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Simple JWT payload extraction (without verification)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

export default {
  getToken,
  setToken,
  removeToken,
  isTokenExpired,
};
