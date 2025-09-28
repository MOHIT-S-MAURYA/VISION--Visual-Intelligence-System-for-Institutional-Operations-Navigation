import { format, parseISO, isValid, formatDistanceToNow, startOfDay, endOfDay } from 'date-fns';
import { 
  ATTENDANCE_STATUS_LABELS, 
  LEAVE_STATUS_LABELS, 
  ROLE_LABELS, 
  DATE_FORMATS, 
  TIME_FORMATS 
} from './constants';
import type { User, AttendanceStatus, LeaveStatus, UserRole } from '../types';

// Date Formatting
export const formatDate = (date: string | Date, formatString: string = DATE_FORMATS.DISPLAY): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

export const formatTime = (time: string | Date, formatString: string = TIME_FORMATS.DISPLAY): string => {
  try {
    const timeObj = typeof time === 'string' ? parseISO(time) : time;
    if (!isValid(timeObj)) {
      return 'Invalid Time';
    }
    return format(timeObj, formatString);
  } catch (error) {
    console.error('Time formatting error:', error);
    return 'Invalid Time';
  }
};

export const formatDateTime = (datetime: string | Date): string => {
  try {
    const dateObj = typeof datetime === 'string' ? parseISO(datetime) : datetime;
    if (!isValid(dateObj)) {
      return 'Invalid DateTime';
    }
    return `${formatDate(dateObj)} at ${formatTime(dateObj)}`;
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return 'Invalid DateTime';
  }
};

export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return 'Invalid Date';
    }
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return 'Invalid Date';
  }
};

export const formatDateForInput = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return '';
    }
    return format(dateObj, DATE_FORMATS.INPUT);
  } catch (error) {
    console.error('Date input formatting error:', error);
    return '';
  }
};

export const formatTimeForInput = (time: string | Date): string => {
  try {
    const timeObj = typeof time === 'string' ? parseISO(time) : time;
    if (!isValid(timeObj)) {
      return '';
    }
    return format(timeObj, TIME_FORMATS.INPUT);
  } catch (error) {
    console.error('Time input formatting error:', error);
    return '';
  }
};

// User Formatting
export const formatUserName = (user: User | null | undefined): string => {
  if (!user) return 'Unknown User';
  
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }
  
  if (user.first_name) return user.first_name;
  if (user.last_name) return user.last_name;
  if (user.email) return user.email;
  
  return 'Unknown User';
};

export const formatUserInitials = (user: User | null | undefined): string => {
  if (!user) return 'UU';
  
  if (user.first_name && user.last_name) {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  }
  
  if (user.first_name) return user.first_name[0].toUpperCase();
  if (user.last_name) return user.last_name[0].toUpperCase();
  if (user.email) return user.email[0].toUpperCase();
  
  return 'UU';
};

export const formatUserRole = (role: UserRole): string => {
  return ROLE_LABELS[role] || role;
};

export const formatUserEmail = (email: string): string => {
  // Mask email for privacy (show first 3 chars and domain)
  const [username, domain] = email.split('@');
  if (username.length <= 3) {
    return email;
  }
  const maskedUsername = username.substring(0, 3) + '*'.repeat(username.length - 3);
  return `${maskedUsername}@${domain}`;
};

// Status Formatting
export const formatAttendanceStatus = (status: AttendanceStatus): string => {
  return ATTENDANCE_STATUS_LABELS[status] || status;
};

export const formatLeaveStatus = (status: LeaveStatus): string => {
  return LEAVE_STATUS_LABELS[status] || status;
};

// Number Formatting
export const formatPercentage = (value: number, decimals: number = 1): string => {
  if (isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  if (isNaN(amount)) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  if (isNaN(value)) return '0';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Text Formatting
export const formatTitle = (text: string): string => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatCamelCase = (text: string): string => {
  return text
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

export const formatKebabCase = (text: string): string => {
  return text
    .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
    .replace(/^-/, '')
    .replace(/_/g, '-')
    .toLowerCase();
};

export const truncateText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - ellipsis.length) + ellipsis;
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  return text
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

// Validation Formatting
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

export const formatStudentId = (studentId: string): string => {
  // Format as: 2023-CS-001
  const cleaned = studentId.replace(/[^A-Za-z0-9]/g, '');
  if (cleaned.length >= 7) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6)}`;
  }
  return studentId;
};

export const formatEmployeeId = (employeeId: string): string => {
  // Format as: EMP-2023-001
  const cleaned = employeeId.replace(/[^A-Za-z0-9]/g, '');
  if (cleaned.length >= 7) {
    return `EMP-${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  return employeeId;
};

// Duration Formatting
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const formatWorkingHours = (timeIn: string, timeOut: string): string => {
  try {
    const timeInObj = parseISO(timeIn);
    const timeOutObj = parseISO(timeOut);
    
    if (!isValid(timeInObj) || !isValid(timeOutObj)) {
      return 'Invalid time';
    }
    
    const diffInMinutes = Math.floor((timeOutObj.getTime() - timeInObj.getTime()) / (1000 * 60));
    return formatDuration(diffInMinutes);
  } catch (error) {
    console.error('Working hours formatting error:', error);
    return 'Invalid time';
  }
};

// Attendance Statistics Formatting
export const formatAttendancePercentage = (present: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = (present / total) * 100;
  return formatPercentage(percentage);
};

// Leave Days Formatting
export const formatLeaveDays = (startDate: string, endDate: string): number => {
  try {
    const start = startOfDay(parseISO(startDate));
    const end = endOfDay(parseISO(endDate));
    
    if (!isValid(start) || !isValid(end)) {
      return 0;
    }
    
    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    
    return Math.max(1, diffInDays); // Minimum 1 day
  } catch (error) {
    console.error('Leave days calculation error:', error);
    return 0;
  }
};

// URL Formatting
export const formatUrl = (url: string): string => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  
  return url;
};

export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(formatUrl(url));
    return urlObj.hostname;
  } catch (error) {
    return url;
  }
};

// Export all formatters
export const formatters = {
  // Date and time
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatDateForInput,
  formatTimeForInput,
  
  // User
  formatUserName,
  formatUserInitials,
  formatUserRole,
  formatUserEmail,
  
  // Status
  formatAttendanceStatus,
  formatLeaveStatus,
  
  // Numbers
  formatPercentage,
  formatCurrency,
  formatNumber,
  formatFileSize,
  
  // Text
  formatTitle,
  formatCamelCase,
  formatKebabCase,
  truncateText,
  capitalizeFirst,
  capitalizeWords,
  
  // Validation
  formatPhoneNumber,
  formatStudentId,
  formatEmployeeId,
  
  // Duration
  formatDuration,
  formatWorkingHours,
  
  // Statistics
  formatAttendancePercentage,
  formatLeaveDays,
  
  // URL
  formatUrl,
  extractDomain,
} as const;

export default formatters;