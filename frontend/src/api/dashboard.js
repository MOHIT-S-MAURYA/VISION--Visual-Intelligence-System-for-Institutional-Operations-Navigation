import api from "./index.js";

// Common Dashboard API calls used across different roles
export const dashboardAPI = {
  // Get current user profile with role information
  getCurrentUser: async () => {
    const response = await api.get("/users/me/");
    return response.data;
  },

  // Get notifications for any user
  getNotifications: async (userId, filters = {}) => {
    const params = new URLSearchParams({
      user_id: userId,
      page: filters.page || 1,
      page_size: filters.pageSize || 10,
      ...(filters.unread_only && { unread_only: "true" }),
      ...(filters.type && { type: filters.type }),
    });

    const response = await api.get(`/notifications/?${params}`);
    return response.data;
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/`, {
      read: true,
    });
    return response.data;
  },

  // Mark all notifications as read
  markAllNotificationsRead: async (userId) => {
    const response = await api.post(`/notifications/mark-all-read/`, {
      user_id: userId,
    });
    return response.data;
  },

  // Get user's departments (for students/teachers)
  getUserDepartments: async (userId) => {
    const response = await api.get(`/users/${userId}/departments/`);
    return response.data;
  },

  // Get system announcements
  getAnnouncements: async (filters = {}) => {
    const params = new URLSearchParams({
      active: "true",
      page: filters.page || 1,
      page_size: filters.pageSize || 5,
    });

    const response = await api.get(`/announcements/?${params}`);
    return response.data;
  },
};
