// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: 'vision_auth_token',
  REFRESH_TOKEN_KEY: 'vision_refresh_token',
  USER_KEY: 'vision_user_data',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes buffer before actual expiry
  AUTO_REFRESH_INTERVAL: 15 * 60 * 1000, // Check token every 15 minutes
} as const;

// User Roles and Permissions
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  DEPARTMENT_ADMIN: 'department_admin',
  PRINCIPAL_ADMIN: 'principal_admin',
} as const;

export const ROLE_HIERARCHY = {
  [USER_ROLES.STUDENT]: 1,
  [USER_ROLES.TEACHER]: 2,
  [USER_ROLES.DEPARTMENT_ADMIN]: 3,
  [USER_ROLES.PRINCIPAL_ADMIN]: 4,
} as const;

export const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: 'Student',
  [USER_ROLES.TEACHER]: 'Teacher',
  [USER_ROLES.DEPARTMENT_ADMIN]: 'Department Admin',
  [USER_ROLES.PRINCIPAL_ADMIN]: 'Principal Admin',
} as const;

// Permissions by Role
export const PERMISSIONS = {
  // General permissions
  VIEW_PROFILE: 'view_profile',
  UPDATE_PROFILE: 'update_profile',
  CHANGE_PASSWORD: 'change_password',
  
  // Attendance permissions
  VIEW_OWN_ATTENDANCE: 'view_own_attendance',
  MARK_ATTENDANCE: 'mark_attendance',
  VIEW_ALL_ATTENDANCE: 'view_all_attendance',
  EDIT_ATTENDANCE: 'edit_attendance',
  EXPORT_ATTENDANCE: 'export_attendance',
  
  // Leave permissions
  REQUEST_LEAVE: 'request_leave',
  VIEW_OWN_LEAVES: 'view_own_leaves',
  APPROVE_LEAVES: 'approve_leaves',
  VIEW_ALL_LEAVES: 'view_all_leaves',
  
  // User management
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  UPDATE_USERS: 'update_users',
  DELETE_USERS: 'delete_users',
  
  // Department management
  VIEW_DEPARTMENTS: 'view_departments',
  MANAGE_DEPARTMENTS: 'manage_departments',
  
  // Analytics and reports
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  
  // System administration
  SYSTEM_SETTINGS: 'system_settings',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_NOTIFICATIONS: 'manage_notifications',
} as const;

export const ROLE_PERMISSIONS = {
  [USER_ROLES.STUDENT]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_OWN_ATTENDANCE,
    PERMISSIONS.REQUEST_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
  ],
  [USER_ROLES.TEACHER]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_OWN_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.VIEW_ALL_ATTENDANCE,
    PERMISSIONS.REQUEST_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    PERMISSIONS.APPROVE_LEAVES,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [USER_ROLES.DEPARTMENT_ADMIN]: [
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.UPDATE_PROFILE,
    PERMISSIONS.CHANGE_PASSWORD,
    PERMISSIONS.VIEW_OWN_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.VIEW_ALL_ATTENDANCE,
    PERMISSIONS.EDIT_ATTENDANCE,
    PERMISSIONS.EXPORT_ATTENDANCE,
    PERMISSIONS.REQUEST_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    PERMISSIONS.APPROVE_LEAVES,
    PERMISSIONS.VIEW_ALL_LEAVES,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.UPDATE_USERS,
    PERMISSIONS.VIEW_DEPARTMENTS,
    PERMISSIONS.MANAGE_DEPARTMENTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.MANAGE_NOTIFICATIONS,
  ],
  [USER_ROLES.PRINCIPAL_ADMIN]: [
    // Principal admin has all permissions
    ...Object.values(PERMISSIONS),
  ],
} as const;

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused',
  PARTIAL: 'partial',
} as const;

export const ATTENDANCE_STATUS_LABELS = {
  [ATTENDANCE_STATUS.PRESENT]: 'Present',
  [ATTENDANCE_STATUS.ABSENT]: 'Absent',
  [ATTENDANCE_STATUS.LATE]: 'Late',
  [ATTENDANCE_STATUS.EXCUSED]: 'Excused',
  [ATTENDANCE_STATUS.PARTIAL]: 'Partial',
} as const;

export const ATTENDANCE_STATUS_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
  [ATTENDANCE_STATUS.ABSENT]: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20',
  [ATTENDANCE_STATUS.LATE]: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
  [ATTENDANCE_STATUS.EXCUSED]: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
  [ATTENDANCE_STATUS.PARTIAL]: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20',
} as const;

// Leave Types
export const LEAVE_TYPES = {
  SICK: 'sick',
  VACATION: 'vacation',
  PERSONAL: 'personal',
  EMERGENCY: 'emergency',
  MEDICAL: 'medical',
  OTHER: 'other',
} as const;

export const LEAVE_TYPE_LABELS = {
  [LEAVE_TYPES.SICK]: 'Sick Leave',
  [LEAVE_TYPES.VACATION]: 'Vacation',
  [LEAVE_TYPES.PERSONAL]: 'Personal Leave',
  [LEAVE_TYPES.EMERGENCY]: 'Emergency Leave',
  [LEAVE_TYPES.MEDICAL]: 'Medical Leave',
  [LEAVE_TYPES.OTHER]: 'Other',
} as const;

// Leave Status
export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

export const LEAVE_STATUS_LABELS = {
  [LEAVE_STATUS.PENDING]: 'Pending',
  [LEAVE_STATUS.APPROVED]: 'Approved',
  [LEAVE_STATUS.REJECTED]: 'Rejected',
  [LEAVE_STATUS.CANCELLED]: 'Cancelled',
} as const;

export const LEAVE_STATUS_COLORS = {
  [LEAVE_STATUS.PENDING]: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
  [LEAVE_STATUS.APPROVED]: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
  [LEAVE_STATUS.REJECTED]: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20',
  [LEAVE_STATUS.CANCELLED]: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const NOTIFICATION_COLORS = {
  [NOTIFICATION_TYPES.INFO]: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
  [NOTIFICATION_TYPES.SUCCESS]: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
  [NOTIFICATION_TYPES.WARNING]: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
  [NOTIFICATION_TYPES.ERROR]: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20',
} as const;

// Verification Methods
export const VERIFICATION_METHODS = {
  FACE_RECOGNITION: 'face_recognition',
  MANUAL: 'manual',
  QR_CODE: 'qr_code',
  BIOMETRIC: 'biometric',
} as const;

export const VERIFICATION_METHOD_LABELS = {
  [VERIFICATION_METHODS.FACE_RECOGNITION]: 'Face Recognition',
  [VERIFICATION_METHODS.MANUAL]: 'Manual Entry',
  [VERIFICATION_METHODS.QR_CODE]: 'QR Code',
  [VERIFICATION_METHODS.BIOMETRIC]: 'Biometric',
} as const;

// Date and Time Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  ISO: 'yyyy-MM-dd',
  FULL: 'EEEE, MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
} as const;

export const TIME_FORMATS = {
  DISPLAY: 'hh:mm a',
  INPUT: 'HH:mm',
  FULL: 'hh:mm:ss a',
  ISO: 'HH:mm:ss',
} as const;

// UI Constants
export const UI_CONFIG = {
  SIDEBAR_WIDTH: 280,
  NAVBAR_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.pdf'],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back! You have successfully signed in.',
  LOGOUT: 'You have been successfully signed out.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  PASSWORD_CHANGED: 'Your password has been changed successfully.',
  ATTENDANCE_MARKED: 'Attendance has been marked successfully.',
  LEAVE_REQUESTED: 'Your leave request has been submitted successfully.',
  LEAVE_APPROVED: 'Leave request has been approved.',
  LEAVE_REJECTED: 'Leave request has been rejected.',
  DATA_SAVED: 'Data has been saved successfully.',
  DATA_DELETED: 'Data has been deleted successfully.',
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Export all constants as a single object for convenience
export const CONSTANTS = {
  API_CONFIG,
  AUTH_CONFIG,
  USER_ROLES,
  ROLE_HIERARCHY,
  ROLE_LABELS,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ATTENDANCE_STATUS,
  ATTENDANCE_STATUS_LABELS,
  ATTENDANCE_STATUS_COLORS,
  LEAVE_TYPES,
  LEAVE_TYPE_LABELS,
  LEAVE_STATUS,
  LEAVE_STATUS_LABELS,
  LEAVE_STATUS_COLORS,
  NOTIFICATION_TYPES,
  NOTIFICATION_COLORS,
  VERIFICATION_METHODS,
  VERIFICATION_METHOD_LABELS,
  DATE_FORMATS,
  TIME_FORMATS,
  UI_CONFIG,
  FILE_UPLOAD,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ANIMATION_DURATION,
} as const;

export default CONSTANTS;