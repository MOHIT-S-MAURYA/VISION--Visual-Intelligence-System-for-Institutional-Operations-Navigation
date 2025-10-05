import axios from "axios";

// Teacher Dashboard APIs
export const getTeacherSessions = async (teacherId, date = null) => {
  try {
    const params = date ? { date } : {};
    const response = await axios.get(`/api/teacher/${teacherId}/sessions`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher sessions:", error);
    throw error;
  }
};

export const getTeacherStats = async (teacherId) => {
  try {
    const response = await axios.get(`/api/teacher/${teacherId}/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher stats:", error);
    throw error;
  }
};

export const getAIRecognitionResults = async (teacherId, limit = 10) => {
  try {
    const response = await axios.get(`/api/teacher/${teacherId}/ai-results`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching AI recognition results:", error);
    throw error;
  }
};

export const getPendingLeaveRequests = async (teacherId) => {
  try {
    const response = await axios.get(
      `/api/teacher/${teacherId}/leave-requests`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
};

// Attendance Management APIs
export const startAttendanceSession = async (sessionId, attendanceData) => {
  try {
    const response = await axios.post(
      `/api/sessions/${sessionId}/attendance/start`,
      attendanceData
    );
    return response.data;
  } catch (error) {
    console.error("Error starting attendance session:", error);
    throw error;
  }
};

export const submitAIAttendance = async (sessionId, imageData) => {
  try {
    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("image", imageData);

    const response = await axios.post(
      `/api/sessions/${sessionId}/attendance/ai`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting AI attendance:", error);
    throw error;
  }
};

export const submitManualAttendance = async (sessionId, attendanceData) => {
  try {
    const response = await axios.post(
      `/api/sessions/${sessionId}/attendance/manual`,
      attendanceData
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting manual attendance:", error);
    throw error;
  }
};

export const getSessionAttendance = async (sessionId) => {
  try {
    const response = await axios.get(`/api/sessions/${sessionId}/attendance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session attendance:", error);
    throw error;
  }
};

// Leave Request Management APIs
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

// Class Management APIs
export const getTeacherClasses = async (teacherId) => {
  try {
    const response = await axios.get(`/api/teacher/${teacherId}/classes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher classes:", error);
    throw error;
  }
};

export const getClassStudents = async (classId) => {
  try {
    const response = await axios.get(`/api/classes/${classId}/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching class students:", error);
    throw error;
  }
};

export const updateSessionStatus = async (sessionId, status) => {
  try {
    const response = await axios.put(`/api/sessions/${sessionId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating session status:", error);
    throw error;
  }
};

// Reports APIs
export const generateAttendanceReport = async (teacherId, params) => {
  try {
    const response = await axios.get(
      `/api/teacher/${teacherId}/reports/attendance`,
      {
        params,
        responseType: "blob", // for PDF/Excel downloads
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating attendance report:", error);
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

// Real-time AI Processing Status
export const getAIProcessingStatus = async (sessionId) => {
  try {
    const response = await axios.get(`/api/sessions/${sessionId}/ai-status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching AI processing status:", error);
    throw error;
  }
};

export const cancelAIProcessing = async (sessionId) => {
  try {
    const response = await axios.post(`/api/sessions/${sessionId}/ai-cancel`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling AI processing:", error);
    throw error;
  }
};
