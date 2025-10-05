import axios from "axios";

// Department Admin Dashboard APIs
export const getDepartmentSummary = async (departmentId) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/summary`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department summary:", error);
    throw error;
  }
};

export const getDepartmentClasses = async (departmentId, params = {}) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/classes`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department classes:", error);
    throw error;
  }
};

export const getDepartmentStudents = async (departmentId, params = {}) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/students`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department students:", error);
    throw error;
  }
};

export const getDepartmentTeachers = async (departmentId, params = {}) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/teachers`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department teachers:", error);
    throw error;
  }
};

export const getDepartmentAttendance = async (departmentId, range = 30) => {
  try {
    const response = await axios.get(
      `/api/attendance/department/${departmentId}`,
      {
        params: { range },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department attendance:", error);
    throw error;
  }
};

// Student Management APIs
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post("/api/students/", studentData);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await axios.put(
      `/api/students/${studentId}/`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(`/api/students/${studentId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

export const getStudentProfile = async (studentId) => {
  try {
    const response = await axios.get(`/api/students/${studentId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw error;
  }
};

// Teacher Management APIs
export const createTeacher = async (teacherData) => {
  try {
    const response = await axios.post("/api/teachers/", teacherData);
    return response.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

export const updateTeacher = async (teacherId, teacherData) => {
  try {
    const response = await axios.put(
      `/api/teachers/${teacherId}/`,
      teacherData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};

export const deleteTeacher = async (teacherId) => {
  try {
    const response = await axios.delete(`/api/teachers/${teacherId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};

export const getTeacherProfile = async (teacherId) => {
  try {
    const response = await axios.get(`/api/teachers/${teacherId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    throw error;
  }
};

// Class Management APIs
export const createClass = async (classData) => {
  try {
    const response = await axios.post("/api/classes/", classData);
    return response.data;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await axios.put(`/api/classes/${classId}/`, classData);
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

export const deleteClass = async (classId) => {
  try {
    const response = await axios.delete(`/api/classes/${classId}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};

export const getClassDetails = async (classId) => {
  try {
    const response = await axios.get(`/api/classes/${classId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching class details:", error);
    throw error;
  }
};

export const getClassAttendanceStats = async (classId, startDate, endDate) => {
  try {
    const response = await axios.get(
      `/api/classes/${classId}/attendance/stats`,
      {
        params: { start_date: startDate, end_date: endDate },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching class attendance stats:", error);
    throw error;
  }
};

// Bulk Operations APIs
export const bulkUploadStudents = async (csvFile, departmentId) => {
  try {
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("department_id", departmentId);

    const response = await axios.post("/api/students/bulk-upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error bulk uploading students:", error);
    throw error;
  }
};

export const bulkUploadTeachers = async (csvFile, departmentId) => {
  try {
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("department_id", departmentId);

    const response = await axios.post("/api/teachers/bulk-upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error bulk uploading teachers:", error);
    throw error;
  }
};

export const getBulkUploadTemplate = async (type) => {
  try {
    const response = await axios.get(`/api/templates/${type}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bulk upload template:", error);
    throw error;
  }
};

// Reports APIs
export const generateDepartmentReport = async (departmentId, params) => {
  try {
    const response = await axios.get(
      `/api/reports/department/${departmentId}`,
      {
        params,
        responseType: "blob", // for PDF/Excel downloads
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating department report:", error);
    throw error;
  }
};

export const getDepartmentAnalytics = async (departmentId, params = {}) => {
  try {
    const response = await axios.get(
      `/api/analytics/department/${departmentId}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department analytics:", error);
    throw error;
  }
};

// Search APIs
export const searchDepartmentUsers = async (
  departmentId,
  query,
  type = "all"
) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/search`,
      {
        params: { query, type },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching department users:", error);
    throw error;
  }
};

// Activity Log APIs
export const getDepartmentActivities = async (departmentId, params = {}) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/activities`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department activities:", error);
    throw error;
  }
};

// Leave Management APIs
export const getPendingLeaveRequests = async (departmentId) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/leave-requests`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pending leave requests:", error);
    throw error;
  }
};

export const approveLeaveRequest = async (leaveRequestId, remarks = "") => {
  try {
    const response = await axios.put(
      `/api/leave-requests/${leaveRequestId}/approve`,
      {
        remarks,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving leave request:", error);
    throw error;
  }
};

export const rejectLeaveRequest = async (leaveRequestId, remarks = "") => {
  try {
    const response = await axios.put(
      `/api/leave-requests/${leaveRequestId}/reject`,
      {
        remarks,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting leave request:", error);
    throw error;
  }
};

// Attendance Edit APIs (Department Admin specific)
export const editAttendanceRecord = async (attendanceId, newStatus, reason) => {
  try {
    const response = await axios.put(`/api/attendance/${attendanceId}/edit`, {
      status: newStatus,
      edit_reason: reason,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing attendance record:", error);
    throw error;
  }
};

export const getAttendanceHistory = async (attendanceId) => {
  try {
    const response = await axios.get(`/api/attendance/${attendanceId}/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance history:", error);
    throw error;
  }
};

// Export Functions
export const exportDepartmentData = async (
  departmentId,
  dataType,
  format = "csv"
) => {
  try {
    const response = await axios.get(
      `/api/departments/${departmentId}/export/${dataType}`,
      {
        params: { format },
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error exporting department data:", error);
    throw error;
  }
};
