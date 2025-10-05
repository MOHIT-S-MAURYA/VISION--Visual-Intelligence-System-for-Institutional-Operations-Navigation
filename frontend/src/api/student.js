import api from "./index.js";

// Student Dashboard API calls
export const studentAPI = {
  // Get student attendance data
  getAttendance: async (studentId, range = 30) => {
    const response = await api.get(
      `/attendance/student/${studentId}?range=${range}`
    );
    return response.data;
  },

  // Get student notifications
  getNotifications: async (userId, page = 1, pageSize = 10) => {
    const response = await api.get(
      `/notifications/?user_id=${userId}&page=${page}&page_size=${pageSize}`
    );
    return response.data;
  },

  // Get today's sessions for student
  getTodaySessions: async (studentId) => {
    const today = new Date().toISOString().split("T")[0];
    const response = await api.get(
      `/students/${studentId}/sessions?date=${today}`
    );
    return response.data;
  },

  // Download attendance report
  downloadReport: async (studentId, format = "pdf") => {
    const response = await api.get(
      `/reports/student/${studentId}?format=${format}`,
      {
        responseType: "blob",
      }
    );
    return response.data;
  },

  // Get student profile
  getProfile: async (studentId) => {
    const response = await api.get(`/students/${studentId}/profile`);
    return response.data;
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/`, {
      read: true,
    });
    return response.data;
  },
};
