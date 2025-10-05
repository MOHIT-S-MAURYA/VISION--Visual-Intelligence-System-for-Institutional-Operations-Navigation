import api from "./index.js";

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await api.post("/auth/login/", credentials);
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post("/auth/register/", userData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password/", { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password/", {
      token,
      new_password: newPassword,
    });
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get("/users/me/");
    return response.data;
  },

  // Logout (clear tokens)
  logout: () => {
    // Clear tokens from storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Redirect to login
    window.location.href = "/auth/login";
  },
};
