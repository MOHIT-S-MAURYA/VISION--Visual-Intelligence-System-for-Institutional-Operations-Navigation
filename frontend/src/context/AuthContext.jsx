import React, { createContext, useContext, useReducer, useEffect } from "react";
import { userAPI } from "../api/user";
import { getToken, setToken, removeToken } from "../utils/tokenStorage";

// Auth Context
const AuthContext = createContext();

// Action Types
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_LOADING: "SET_LOADING",
};

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth Reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    default:
      return state;
  }
}

// Auth Provider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Verify token and get user data
      verifyToken(token);
    } else {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
        payload: { isLoading: false },
      });
    }
  }, []);

  // Verify token with server
  const verifyToken = async (token) => {
    try {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
        payload: { isLoading: true },
      });

      // Set token in API headers
      const response = await userAPI.verifyToken(token);

      if (response.data.user) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: response.data.user,
            token: token,
          },
        });
      } else {
        // Token invalid, remove it
        removeToken();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      removeToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } finally {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
        payload: { isLoading: false },
      });
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      const response = await userAPI.login(credentials);
      const { user, token } = response.data;

      // Store token
      setToken(token);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token },
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";

      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: errorMessage },
      });

      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API if needed
      await userAPI.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local state
      removeToken();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      const response = await userAPI.register(userData);
      const { user, token } = response.data;

      // Store token
      setToken(token);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token },
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";

      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: errorMessage },
      });

      return { success: false, error: errorMessage };
    }
  };

  // Update user profile
  const updateUser = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: { user: userData },
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user?.role === role;
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return state.user?.permissions?.includes(permission) || false;
  };

  // Get user role
  const getUserRole = () => {
    return state.user?.role || null;
  };

  // Context value
  const value = {
    // State
    ...state,

    // Actions
    login,
    logout,
    register,
    updateUser,
    clearError,

    // Utilities
    hasRole,
    hasPermission,
    getUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Role constants
export const ROLES = {
  PRINCIPAL_ADMIN: "PrincipalAdmin",
  DEPARTMENT_ADMIN: "DeptAdmin",
  TEACHER: "Teacher",
  STUDENT: "Student",
};

// Permission constants
export const PERMISSIONS = {
  // Department permissions
  CREATE_DEPARTMENT: "create_department",
  EDIT_DEPARTMENT: "edit_department",
  DELETE_DEPARTMENT: "delete_department",

  // User management permissions
  CREATE_USER: "create_user",
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",

  // Attendance permissions
  MARK_ATTENDANCE: "mark_attendance",
  EDIT_ATTENDANCE: "edit_attendance",
  VIEW_ATTENDANCE: "view_attendance",

  // Report permissions
  VIEW_REPORTS: "view_reports",
  GENERATE_REPORTS: "generate_reports",

  // Admin permissions
  MANAGE_SYSTEM: "manage_system",
  VIEW_AUDIT_LOGS: "view_audit_logs",
};

export default AuthContext;
