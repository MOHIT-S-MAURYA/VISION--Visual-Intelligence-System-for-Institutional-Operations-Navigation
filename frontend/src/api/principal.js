import axios from "axios";

// Principal Admin Dashboard APIs
export const getAdminOverview = async () => {
  try {
    const response = await axios.get("/api/admin/overview");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin overview:", error);
    throw error;
  }
};

export const getSystemStats = async () => {
  try {
    const response = await axios.get("/api/admin/system-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching system stats:", error);
    throw error;
  }
};

export const getAllDepartments = async (params = {}) => {
  try {
    const response = await axios.get("/api/departments/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const getSystemActivities = async (limit = 50) => {
  try {
    const response = await axios.get("/api/admin/activities", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching system activities:", error);
    throw error;
  }
};

export const getAuditLogs = async (params = {}) => {
  try {
    const response = await axios.get("/api/audit-logs/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};

// Department Management APIs
export const createDepartment = async (departmentData) => {
  try {
    const response = await axios.post("/api/departments/", departmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

export const updateDepartment = async (departmentId, departmentData) => {
  try {
    const response = await axios.put(
      `/api/departments/${departmentId}/`,
      departmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

export const deleteDepartment = async (departmentId) => {
  try {
    const response = await axios.delete(`/api/departments/${departmentId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};

export const getDepartmentDetails = async (departmentId) => {
  try {
    const response = await axios.get(`/api/departments/${departmentId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching department details:", error);
    throw error;
  }
};

// User Management APIs
export const getAllUsers = async (params = {}) => {
  try {
    const response = await axios.get("/api/users/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post("/api/users/", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`/api/users/${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/api/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Role and Permission Management
export const assignUserRole = async (userId, roleData) => {
  try {
    const response = await axios.put(`/api/users/${userId}/role/`, roleData);
    return response.data;
  } catch (error) {
    console.error("Error assigning user role:", error);
    throw error;
  }
};

export const getUsersByRole = async (role) => {
  try {
    const response = await axios.get("/api/users/", {
      params: { role },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw error;
  }
};

export const createDepartmentAdmin = async (adminData) => {
  try {
    const response = await axios.post(
      "/api/admin/department-admins/",
      adminData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating department admin:", error);
    throw error;
  }
};

// System Configuration APIs
export const getSystemSettings = async () => {
  try {
    const response = await axios.get("/api/admin/settings/");
    return response.data;
  } catch (error) {
    console.error("Error fetching system settings:", error);
    throw error;
  }
};

export const updateSystemSettings = async (settings) => {
  try {
    const response = await axios.put("/api/admin/settings/", settings);
    return response.data;
  } catch (error) {
    console.error("Error updating system settings:", error);
    throw error;
  }
};

export const getSystemHealth = async () => {
  try {
    const response = await axios.get("/api/admin/health/");
    return response.data;
  } catch (error) {
    console.error("Error fetching system health:", error);
    throw error;
  }
};

// Analytics APIs
export const getInstitutionAnalytics = async (params = {}) => {
  try {
    const response = await axios.get("/api/analytics/institution/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching institution analytics:", error);
    throw error;
  }
};

export const getDepartmentAnalytics = async (departmentId, params = {}) => {
  try {
    const response = await axios.get(
      `/api/analytics/department/${departmentId}/`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department analytics:", error);
    throw error;
  }
};

export const getAttendanceTrends = async (params = {}) => {
  try {
    const response = await axios.get("/api/analytics/attendance/trends/", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance trends:", error);
    throw error;
  }
};

// Reports APIs
export const generateInstitutionReport = async (params) => {
  try {
    const response = await axios.get("/api/reports/institution/", {
      params,
      responseType: "blob", // for PDF/Excel downloads
    });
    return response.data;
  } catch (error) {
    console.error("Error generating institution report:", error);
    throw error;
  }
};

export const generateSystemReport = async (reportType, params = {}) => {
  try {
    const response = await axios.get(`/api/reports/system/${reportType}/`, {
      params,
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error generating system report:", error);
    throw error;
  }
};

// Bulk Operations APIs
export const bulkUserImport = async (csvFile) => {
  try {
    const formData = new FormData();
    formData.append("file", csvFile);

    const response = await axios.post(
      "/api/admin/users/bulk-import/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error bulk importing users:", error);
    throw error;
  }
};

export const bulkDepartmentImport = async (csvFile) => {
  try {
    const formData = new FormData();
    formData.append("file", csvFile);

    const response = await axios.post(
      "/api/admin/departments/bulk-import/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error bulk importing departments:", error);
    throw error;
  }
};

// Search APIs
export const globalSearch = async (query, filters = {}) => {
  try {
    const response = await axios.get("/api/admin/search/", {
      params: { query, ...filters },
    });
    return response.data;
  } catch (error) {
    console.error("Error performing global search:", error);
    throw error;
  }
};

// Security APIs
export const getSecurityLogs = async (params = {}) => {
  try {
    const response = await axios.get("/api/admin/security/logs/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching security logs:", error);
    throw error;
  }
};

export const getLoginAttempts = async (params = {}) => {
  try {
    const response = await axios.get("/api/admin/security/login-attempts/", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching login attempts:", error);
    throw error;
  }
};

export const blockUser = async (userId, reason) => {
  try {
    const response = await axios.post(`/api/admin/security/block-user/`, {
      user_id: userId,
      reason,
    });
    return response.data;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await axios.post(`/api/admin/security/unblock-user/`, {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
};

// System Maintenance APIs
export const performSystemBackup = async () => {
  try {
    const response = await axios.post("/api/admin/maintenance/backup/");
    return response.data;
  } catch (error) {
    console.error("Error performing system backup:", error);
    throw error;
  }
};

export const getBackupHistory = async () => {
  try {
    const response = await axios.get("/api/admin/maintenance/backups/");
    return response.data;
  } catch (error) {
    console.error("Error fetching backup history:", error);
    throw error;
  }
};

export const clearSystemCache = async () => {
  try {
    const response = await axios.post("/api/admin/maintenance/clear-cache/");
    return response.data;
  } catch (error) {
    console.error("Error clearing system cache:", error);
    throw error;
  }
};

export const getSystemLogs = async (params = {}) => {
  try {
    const response = await axios.get("/api/admin/logs/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching system logs:", error);
    throw error;
  }
};
