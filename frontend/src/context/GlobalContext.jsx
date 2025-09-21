import React, { createContext, useContext, useReducer } from "react";

// Global State Context
const GlobalContext = createContext();

// Action Types
const GLOBAL_ACTIONS = {
  // UI State
  SET_SIDEBAR_COLLAPSED: "SET_SIDEBAR_COLLAPSED",
  SET_THEME: "SET_THEME",
  SET_LOADING: "SET_LOADING",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",

  // Data State
  SET_DEPARTMENTS: "SET_DEPARTMENTS",
  UPDATE_DEPARTMENT: "UPDATE_DEPARTMENT",
  DELETE_DEPARTMENT: "DELETE_DEPARTMENT",

  SET_CLASSES: "SET_CLASSES",
  UPDATE_CLASS: "UPDATE_CLASS",

  SET_SUBJECTS: "SET_SUBJECTS",
  UPDATE_SUBJECT: "UPDATE_SUBJECT",

  // Attendance State
  SET_ATTENDANCE_DATA: "SET_ATTENDANCE_DATA",
  UPDATE_ATTENDANCE: "UPDATE_ATTENDANCE",

  // AI State
  SET_AI_STATUS: "SET_AI_STATUS",
  SET_AI_METRICS: "SET_AI_METRICS",

  // Notification State
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  MARK_NOTIFICATION_READ: "MARK_NOTIFICATION_READ",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
};

// Initial State
const initialState = {
  // UI State
  ui: {
    sidebarCollapsed: false,
    theme: "light", // 'light' or 'dark'
    isLoading: false,
    notification: null, // { type: 'success|error|warning|info', message: '', duration: 3000 }
  },

  // Data State
  departments: [],
  classes: [],
  subjects: [],

  // Attendance State
  attendance: {
    currentSession: null,
    todayAttendance: [],
    attendanceHistory: [],
  },

  // AI State
  ai: {
    isProcessing: false,
    lastProcessedImage: null,
    recognitionResults: [],
    metrics: {
      accuracy: 0,
      processedImages: 0,
      recognizedFaces: 0,
    },
  },

  // Notification State
  notifications: [],
  unreadCount: 0,
};

// Global Reducer
function globalReducer(state, action) {
  switch (action.type) {
    // UI Actions
    case GLOBAL_ACTIONS.SET_SIDEBAR_COLLAPSED:
      return {
        ...state,
        ui: { ...state.ui, sidebarCollapsed: action.payload },
      };

    case GLOBAL_ACTIONS.SET_THEME:
      return {
        ...state,
        ui: { ...state.ui, theme: action.payload },
      };

    case GLOBAL_ACTIONS.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.payload },
      };

    case GLOBAL_ACTIONS.SET_NOTIFICATION:
      return {
        ...state,
        ui: { ...state.ui, notification: action.payload },
      };

    case GLOBAL_ACTIONS.CLEAR_NOTIFICATION:
      return {
        ...state,
        ui: { ...state.ui, notification: null },
      };

    // Department Actions
    case GLOBAL_ACTIONS.SET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case GLOBAL_ACTIONS.UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.map((dept) =>
          dept.id === action.payload.id ? { ...dept, ...action.payload } : dept
        ),
      };

    case GLOBAL_ACTIONS.DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter(
          (dept) => dept.id !== action.payload
        ),
      };

    // Class Actions
    case GLOBAL_ACTIONS.SET_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };

    case GLOBAL_ACTIONS.UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls.id === action.payload.id ? { ...cls, ...action.payload } : cls
        ),
      };

    // Subject Actions
    case GLOBAL_ACTIONS.SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };

    case GLOBAL_ACTIONS.UPDATE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.map((subj) =>
          subj.id === action.payload.id ? { ...subj, ...action.payload } : subj
        ),
      };

    // Attendance Actions
    case GLOBAL_ACTIONS.SET_ATTENDANCE_DATA:
      return {
        ...state,
        attendance: { ...state.attendance, ...action.payload },
      };

    case GLOBAL_ACTIONS.UPDATE_ATTENDANCE:
      return {
        ...state,
        attendance: {
          ...state.attendance,
          todayAttendance: state.attendance.todayAttendance.map((record) =>
            record.id === action.payload.id
              ? { ...record, ...action.payload }
              : record
          ),
        },
      };

    // AI Actions
    case GLOBAL_ACTIONS.SET_AI_STATUS:
      return {
        ...state,
        ai: { ...state.ai, ...action.payload },
      };

    case GLOBAL_ACTIONS.SET_AI_METRICS:
      return {
        ...state,
        ai: {
          ...state.ai,
          metrics: { ...state.ai.metrics, ...action.payload },
        },
      };

    // Notification Actions
    case GLOBAL_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter((n) => !n.read).length,
      };

    case GLOBAL_ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };

    case GLOBAL_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };

    default:
      return state;
  }
}

// Global Provider Component
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // UI Actions
  const toggleSidebar = () => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_SIDEBAR_COLLAPSED,
      payload: !state.ui.sidebarCollapsed,
    });
  };

  const setTheme = (theme) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_THEME,
      payload: theme,
    });
    // Store theme preference in localStorage
    localStorage.setItem("theme", theme);
  };

  const setLoading = (isLoading) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_LOADING,
      payload: isLoading,
    });
  };

  const showNotification = (type, message, duration = 3000) => {
    const notification = { type, message, duration };
    dispatch({
      type: GLOBAL_ACTIONS.SET_NOTIFICATION,
      payload: notification,
    });

    // Auto-clear notification
    if (duration > 0) {
      setTimeout(() => {
        dispatch({ type: GLOBAL_ACTIONS.CLEAR_NOTIFICATION });
      }, duration);
    }
  };

  const clearNotification = () => {
    dispatch({ type: GLOBAL_ACTIONS.CLEAR_NOTIFICATION });
  };

  // Data Actions
  const setDepartments = (departments) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_DEPARTMENTS,
      payload: departments,
    });
  };

  const updateDepartment = (department) => {
    dispatch({
      type: GLOBAL_ACTIONS.UPDATE_DEPARTMENT,
      payload: department,
    });
  };

  const deleteDepartment = (departmentId) => {
    dispatch({
      type: GLOBAL_ACTIONS.DELETE_DEPARTMENT,
      payload: departmentId,
    });
  };

  const setClasses = (classes) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_CLASSES,
      payload: classes,
    });
  };

  const setSubjects = (subjects) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_SUBJECTS,
      payload: subjects,
    });
  };

  // Attendance Actions
  const setAttendanceData = (data) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_ATTENDANCE_DATA,
      payload: data,
    });
  };

  const updateAttendance = (attendanceRecord) => {
    dispatch({
      type: GLOBAL_ACTIONS.UPDATE_ATTENDANCE,
      payload: attendanceRecord,
    });
  };

  // AI Actions
  const setAIStatus = (status) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_AI_STATUS,
      payload: status,
    });
  };

  const setAIMetrics = (metrics) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_AI_METRICS,
      payload: metrics,
    });
  };

  // Notification Actions
  const setNotifications = (notifications) => {
    dispatch({
      type: GLOBAL_ACTIONS.SET_NOTIFICATIONS,
      payload: notifications,
    });
  };

  const markNotificationRead = (notificationId) => {
    dispatch({
      type: GLOBAL_ACTIONS.MARK_NOTIFICATION_READ,
      payload: notificationId,
    });
  };

  const addNotification = (notification) => {
    dispatch({
      type: GLOBAL_ACTIONS.ADD_NOTIFICATION,
      payload: {
        id: Date.now(),
        timestamp: new Date(),
        read: false,
        ...notification,
      },
    });
  };

  // Context value
  const value = {
    // State
    ...state,

    // UI Actions
    toggleSidebar,
    setTheme,
    setLoading,
    showNotification,
    clearNotification,

    // Data Actions
    setDepartments,
    updateDepartment,
    deleteDepartment,
    setClasses,
    setSubjects,

    // Attendance Actions
    setAttendanceData,
    updateAttendance,

    // AI Actions
    setAIStatus,
    setAIMetrics,

    // Notification Actions
    setNotifications,
    markNotificationRead,
    addNotification,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

// Custom hook to use global context
export function useGlobal() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }

  return context;
}

export default GlobalContext;
