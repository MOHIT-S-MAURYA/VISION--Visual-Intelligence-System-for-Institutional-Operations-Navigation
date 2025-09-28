import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import type { APIResponse, AuthTokens } from '../types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const API_TIMEOUT = 30000; // 30 seconds

// Token storage keys
const ACCESS_TOKEN_KEY = 'vision_access_token';
const REFRESH_TOKEN_KEY = 'vision_refresh_token';

// Token management utilities
export const tokenStorage = {
  get: (): AuthTokens | null => {
    try {
      const access = localStorage.getItem(ACCESS_TOKEN_KEY);
      const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
      
      if (access && refresh) {
        return { access, refresh };
      }
      return null;
    } catch (error) {
      console.error('Error reading tokens from storage:', error);
      return null;
    }
  },

  set: (tokens: AuthTokens): void => {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
    } catch (error) {
      console.error('Error storing tokens:', error);
      toast.error('Failed to store authentication tokens');
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  },

  isValid: (token: string): boolean => {
    if (!token) return false;
    
    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      
      return payload.exp > now;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }
};

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config) => {
      const tokens = tokenStorage.get();
      if (tokens?.access && tokenStorage.isValid(tokens.access)) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }
      
      // Add request timestamp for debugging
      (config as any).metadata = { startTime: Date.now() };
      
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for token refresh and error handling
  client.interceptors.response.use(
    (response) => {
      // Log response time for debugging
      const endTime = Date.now();
      const startTime = (response.config as any).metadata?.startTime;
      if (startTime) {
        console.debug(`API ${response.config.method?.toUpperCase()} ${response.config.url}: ${endTime - startTime}ms`);
      }
      
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true;
        
        try {
          const tokens = tokenStorage.get();
          if (tokens?.refresh) {
            // Attempt to refresh token
            const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refresh_token: tokens.refresh,
            });
            
            const newTokens: AuthTokens = refreshResponse.data.data;
            tokenStorage.set(newTokens);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          tokenStorage.clear();
          
          // Redirect to login if not already there
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      }
      
      // Handle other error responses
      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return client;
};

// Create API client instance
export const apiClient = createApiClient();

// Error handling utility
const handleApiError = (error: AxiosError): void => {
  console.error('API Error:', error);
  
  if (!error.response) {
    toast.error('Network error. Please check your connection.');
    return;
  }
  
  const { status, data } = error.response;
  const message = (data as any)?.message || 'An unexpected error occurred';
  
  switch (status) {
    case 400:
      toast.error(`Bad Request: ${message}`);
      break;
    case 401:
      toast.error('Authentication required. Please log in.');
      break;
    case 403:
      toast.error('Access denied. You don\'t have permission to perform this action.');
      break;
    case 404:
      toast.error('Resource not found.');
      break;
    case 422:
      // Validation errors - handle specially
      if ((data as any)?.errors) {
        const errors = (data as any).errors;
        Object.keys(errors).forEach(field => {
          const fieldErrors = errors[field];
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach(err => toast.error(`${field}: ${err}`));
          }
        });
      } else {
        toast.error(`Validation Error: ${message}`);
      }
      break;
    case 429:
      toast.error('Too many requests. Please try again later.');
      break;
    case 500:
      toast.error('Server error. Please try again later.');
      break;
    default:
      toast.error(message);
  }
};

// Generic API request wrapper
const apiRequest = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse<APIResponse<T>> = await apiClient.request({
      method,
      url,
      data,
      ...config,
    });
    
    return response.data;
  } catch (error) {
    console.error(`API ${method} ${url} failed:`, error);
    throw error;
  }
};

// HTTP method helpers
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
    apiRequest<T>('GET', url, undefined, config),
    
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
    apiRequest<T>('POST', url, data, config),
    
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
    apiRequest<T>('PUT', url, data, config),
    
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
    apiRequest<T>('PATCH', url, data, config),
    
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
    apiRequest<T>('DELETE', url, undefined, config),
};

// File upload helper
export const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<APIResponse<{ url: string; filename: string }>> => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
};

// Download file helper
export const downloadFile = async (url: string, filename?: string): Promise<void> => {
  try {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(downloadUrl);
    toast.success('File downloaded successfully');
  } catch (error) {
    console.error('Download failed:', error);
    toast.error('Failed to download file');
  }
};

// Query parameter helpers
export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
};

export const getUrl = (endpoint: string, params?: Record<string, any>): string => {
  const queryString = params ? buildQueryParams(params) : '';
  return queryString ? `${endpoint}?${queryString}` : endpoint;
};

// Pagination helpers
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
}

export const getPaginatedUrl = (
  endpoint: string,
  pagination: PaginationParams = {},
  filters?: Record<string, any>
): string => {
  const params = {
    page: pagination.page || 1,
    limit: pagination.limit || 10,
    ...(pagination.sort_by && { sort_by: pagination.sort_by }),
    ...(pagination.sort_order && { sort_order: pagination.sort_order }),
    ...(pagination.search && { search: pagination.search }),
    ...filters,
  };
  
  return getUrl(endpoint, params);
};

// Cache management utilities
export const cache = {
  // Simple in-memory cache for API responses
  _storage: new Map<string, { data: any; timestamp: number; ttl: number }>(),
  
  set: (key: string, data: any, ttlInMs: number = 300000): void => { // 5 minutes default
    cache._storage.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlInMs,
    });
  },
  
  get: (key: string): any | null => {
    const cached = cache._storage.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > cached.ttl) {
      cache._storage.delete(key);
      return null;
    }
    
    return cached.data;
  },
  
  invalidate: (pattern?: RegExp): void => {
    if (!pattern) {
      cache._storage.clear();
      return;
    }
    
    for (const key of cache._storage.keys()) {
      if (pattern.test(key)) {
        cache._storage.delete(key);
      }
    }
  },
  
  generateKey: (url: string, params?: any): string => {
    return `${url}:${JSON.stringify(params || {})}`;
  },
};

// Cached API request
export const cachedApiRequest = async <T>(
  url: string,
  params?: any,
  ttlInMs: number = 300000
): Promise<APIResponse<T>> => {
  const cacheKey = cache.generateKey(url, params);
  const cached = cache.get(cacheKey);
  
  if (cached) {
    console.debug(`Cache hit for ${cacheKey}`);
    return cached;
  }
  
  console.debug(`Cache miss for ${cacheKey}`);
  const response = await api.get<T>(getUrl(url, params));
  cache.set(cacheKey, response, ttlInMs);
  
  return response;
};

// API health check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Export utilities
export {
  API_BASE_URL,
  API_TIMEOUT,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
};

export default api;