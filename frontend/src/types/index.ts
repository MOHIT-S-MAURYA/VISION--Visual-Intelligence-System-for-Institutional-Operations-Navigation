// User and Authentication Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  department?: string;
  student_id?: string;
  employee_id?: string;
  phone?: string;
  avatar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'student' | 'teacher' | 'department_admin' | 'principal_admin';

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  student_id?: string;
  employee_id?: string;
  phone?: string;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  user: User;
  date: string;
  time_in?: string;
  time_out?: string;
  status: AttendanceStatus;
  location?: string;
  device_info?: string;
  verification_method: VerificationMethod;
  confidence_score?: number;
  created_at: string;
  updated_at: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'partial';
export type VerificationMethod = 'face_recognition' | 'manual' | 'qr_code' | 'biometric';

// Department Types
export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  head_of_department?: User;
  created_at: string;
  updated_at: string;
}

// Leave Request Types
export interface LeaveRequest {
  id: string;
  user: User;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  reason: string;
  status: LeaveStatus;
  approved_by?: User;
  approved_at?: string;
  documents?: string[];
  created_at: string;
  updated_at: string;
}

export type LeaveType = 'sick' | 'vacation' | 'personal' | 'emergency' | 'medical' | 'other';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

// Analytics Types
export interface AttendanceStats {
  total_days: number;
  present_days: number;
  absent_days: number;
  late_days: number;
  attendance_percentage: number;
}

export interface DashboardStats {
  attendance_stats: AttendanceStats;
  recent_activities: Activity[];
  notifications_count: number;
  pending_leaves?: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  user?: User;
}

export type ActivityType = 'attendance' | 'leave_request' | 'leave_approval' | 'system' | 'notification';

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  created_at: string;
  action_url?: string;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Form Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isLoading: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  error?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

// Route Protection Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavigationItem[];
}

// Theme Types
export interface ThemeConfig {
  isDark: boolean;
  primaryColor: string;
  secondaryColor: string;
}

// All types are exported above and can be imported individually