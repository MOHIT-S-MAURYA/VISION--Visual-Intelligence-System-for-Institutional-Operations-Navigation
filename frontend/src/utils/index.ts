// Export all utilities from a central location
export { cn } from './cn';
export * from './constants';
export * from './formatters';
export * from './validators';
export { storage, sessionStorage } from './storage';
export { 
  api, 
  apiClient, 
  tokenStorage, 
  uploadFile, 
  downloadFile, 
  buildQueryParams, 
  getUrl, 
  getPaginatedUrl, 
  cache, 
  cachedApiRequest, 
  checkApiHealth,
  API_BASE_URL,
  API_TIMEOUT,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  type PaginationParams 
} from './api';

// Import defaults for re-export
import { formatters } from './formatters';
import validationSchemas from './validators';
import { cn } from './cn';
import { storage, sessionStorage } from './storage';
import { api } from './api';
import {
  USER_ROLES,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
  ATTENDANCE_STATUS,
  ATTENDANCE_STATUS_LABELS,
  LEAVE_STATUS,
  LEAVE_STATUS_LABELS,
  LEAVE_TYPES,
  DATE_FORMATS,
  TIME_FORMATS,
  ERROR_MESSAGES,
} from './constants';

// Re-export commonly used utilities
export { formatters } from './formatters';
export { default as validators } from './validators';

// Utility type helpers
export type UtilityFunction<T extends (...args: unknown[]) => unknown> = T;
export type FormatterFunction = UtilityFunction<(value: unknown, ...args: unknown[]) => string>;
export type ValidatorFunction = UtilityFunction<(value: unknown) => boolean>;

// Common utility combinations
export const utils = {
  cn,
  storage,
  sessionStorage,
  api,
  formatters,
  validators: validationSchemas,
  constants: {
    USER_ROLES,
    ROLE_LABELS,
    ROLE_PERMISSIONS,
    ATTENDANCE_STATUS,
    ATTENDANCE_STATUS_LABELS,
    LEAVE_STATUS,
    LEAVE_STATUS_LABELS,
    LEAVE_TYPES,
    DATE_FORMATS,
    TIME_FORMATS,
    ERROR_MESSAGES,
  },
} as const;

export default utils;