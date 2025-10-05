import * as yup from 'yup';
import { USER_ROLES, LEAVE_TYPES } from './constants';

// Common validation patterns
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Custom validation messages
const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PHONE_INVALID: 'Please enter a valid phone number',
  DATE_INVALID: 'Please enter a valid date',
  DATE_FUTURE: 'Date cannot be in the future',
  DATE_PAST: 'Date cannot be in the past',
  FILE_SIZE_TOO_LARGE: 'File size must be less than 5MB',
  FILE_TYPE_INVALID: 'Invalid file type. Only images and PDFs are allowed',
} as const;

// Authentication Schemas
export const loginSchema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Email'))
    .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL_INVALID),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Password'))
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
});

export const signupSchema = yup.object({
  first_name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('First name'))
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  last_name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Last name'))
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Email'))
    .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL_INVALID),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Password'))
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .matches(PASSWORD_REGEX, VALIDATION_MESSAGES.PASSWORD_WEAK),
  confirm_password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Confirm password'))
    .oneOf([yup.ref('password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH),
  role: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Role'))
    .oneOf(Object.values(USER_ROLES), 'Please select a valid role'),
  department: yup
    .string()
    .when('role', {
      is: (role: string) => role !== USER_ROLES.PRINCIPAL_ADMIN,
      then: (schema) => schema.required(VALIDATION_MESSAGES.REQUIRED('Department')),
      otherwise: (schema) => schema.notRequired(),
    }),
  student_id: yup
    .string()
    .when('role', {
      is: USER_ROLES.STUDENT,
      then: (schema) => schema.required(VALIDATION_MESSAGES.REQUIRED('Student ID')),
      otherwise: (schema) => schema.notRequired(),
    }),
  employee_id: yup
    .string()
    .when('role', {
      is: (role: string) => role === USER_ROLES.TEACHER || role === USER_ROLES.DEPARTMENT_ADMIN,
      then: (schema) => schema.required(VALIDATION_MESSAGES.REQUIRED('Employee ID')),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup
    .string()
    .matches(PHONE_REGEX, VALIDATION_MESSAGES.PHONE_INVALID)
    .notRequired(),
  terms_accepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Email'))
    .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL_INVALID),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Password'))
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .matches(PASSWORD_REGEX, VALIDATION_MESSAGES.PASSWORD_WEAK),
  confirm_password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Confirm password'))
    .oneOf([yup.ref('password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH),
});

export const changePasswordSchema = yup.object({
  current_password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Current password')),
  new_password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('New password'))
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .matches(PASSWORD_REGEX, VALIDATION_MESSAGES.PASSWORD_WEAK),
  confirm_password: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Confirm password'))
    .oneOf([yup.ref('new_password')], VALIDATION_MESSAGES.PASSWORD_MISMATCH),
});

// Profile Schemas
export const profileUpdateSchema = yup.object({
  first_name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('First name'))
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  last_name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Last name'))
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Email'))
    .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL_INVALID),
  phone: yup
    .string()
    .matches(PHONE_REGEX, VALIDATION_MESSAGES.PHONE_INVALID)
    .notRequired(),
  department: yup
    .string()
    .notRequired(),
});

// Leave Request Schema
export const leaveRequestSchema = yup.object({
  leave_type: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Leave type'))
    .oneOf(Object.values(LEAVE_TYPES), 'Please select a valid leave type'),
  start_date: yup
    .date()
    .required(VALIDATION_MESSAGES.REQUIRED('Start date'))
    .min(new Date(), 'Start date cannot be in the past'),
  end_date: yup
    .date()
    .required(VALIDATION_MESSAGES.REQUIRED('End date'))
    .min(yup.ref('start_date'), 'End date cannot be before start date'),
  reason: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Reason'))
    .min(10, 'Reason must be at least 10 characters')
    .max(500, 'Reason must not exceed 500 characters'),
  supporting_documents: yup
    .array()
    .of(
      yup.object({
        file: yup
          .mixed()
          .test('fileSize', VALIDATION_MESSAGES.FILE_SIZE_TOO_LARGE, (value: any) => {
            return !value || (value && value.size <= 5 * 1024 * 1024); // 5MB
          })
          .test('fileType', VALIDATION_MESSAGES.FILE_TYPE_INVALID, (value: any) => {
            return !value || (value && ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(value.type));
          }),
      })
    )
    .notRequired(),
});

// User Management Schema (for admins)
export const userCreateSchema = yup.object({
  first_name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('First name'))
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  last_name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Last name'))
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Email'))
    .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL_INVALID),
  role: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Role'))
    .oneOf(Object.values(USER_ROLES), 'Please select a valid role'),
  department: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Department')),
  student_id: yup
    .string()
    .when('role', {
      is: USER_ROLES.STUDENT,
      then: (schema) => schema.required(VALIDATION_MESSAGES.REQUIRED('Student ID')),
      otherwise: (schema) => schema.notRequired(),
    }),
  employee_id: yup
    .string()
    .when('role', {
      is: (role: string) => role === USER_ROLES.TEACHER || role === USER_ROLES.DEPARTMENT_ADMIN,
      then: (schema) => schema.required(VALIDATION_MESSAGES.REQUIRED('Employee ID')),
      otherwise: (schema) => schema.notRequired(),
    }),
  phone: yup
    .string()
    .matches(PHONE_REGEX, VALIDATION_MESSAGES.PHONE_INVALID)
    .notRequired(),
  is_active: yup
    .boolean()
    .required(),
});

// Department Schema
export const departmentSchema = yup.object({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Department name'))
    .min(2, 'Department name must be at least 2 characters')
    .max(100, 'Department name must not exceed 100 characters'),
  code: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Department code'))
    .min(2, 'Department code must be at least 2 characters')
    .max(10, 'Department code must not exceed 10 characters')
    .matches(/^[A-Z0-9]+$/, 'Department code must contain only uppercase letters and numbers'),
  description: yup
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .notRequired(),
  head_of_department: yup
    .string()
    .notRequired(),
});

// Attendance Schema
export const attendanceSchema = yup.object({
  user_id: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('User')),
  date: yup
    .date()
    .required(VALIDATION_MESSAGES.REQUIRED('Date'))
    .max(new Date(), 'Date cannot be in the future'),
  time_in: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)')
    .notRequired(),
  time_out: yup
    .string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)')
    .notRequired(),
  status: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Status')),
  notes: yup
    .string()
    .max(500, 'Notes must not exceed 500 characters')
    .notRequired(),
});

// Search and Filter Schema
export const searchSchema = yup.object({
  query: yup
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must not exceed 100 characters')
    .notRequired(),
  start_date: yup
    .date()
    .notRequired(),
  end_date: yup
    .date()
    .min(yup.ref('start_date'), 'End date cannot be before start date')
    .notRequired(),
  status: yup
    .string()
    .notRequired(),
  department: yup
    .string()
    .notRequired(),
  role: yup
    .string()
    .oneOf([...Object.values(USER_ROLES), ''], 'Please select a valid role')
    .notRequired(),
});

// Contact Form Schema
export const contactSchema = yup.object({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Name'))
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Email'))
    .matches(EMAIL_REGEX, VALIDATION_MESSAGES.EMAIL_INVALID),
  subject: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Subject'))
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  message: yup
    .string()
    .required(VALIDATION_MESSAGES.REQUIRED('Message'))
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

// Export all schemas
export const validationSchemas = {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  profileUpdateSchema,
  leaveRequestSchema,
  userCreateSchema,
  departmentSchema,
  attendanceSchema,
  searchSchema,
  contactSchema,
} as const;

export default validationSchemas;