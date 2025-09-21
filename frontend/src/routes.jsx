import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout Components
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Auth Pages
import Login from "./pages/Auth/Login";
import {
  Register,
  ForgotPassword,
  Logout,
  PrincipalDashboard,
  DepartmentAdminDashboard,
  TeacherDashboard,
  StudentDashboard,
  DepartmentList,
  DepartmentCreate,
  DepartmentEdit,
  DepartmentView,
  AttendanceMarkingAI,
  AttendanceManual,
  AttendanceView,
  AttendanceEdit,
  AttendanceHistory,
  UserManagement,
  SystemSettings,
  RolePermissions,
  AuditLogs,
  SystemHealth,
  Profile,
  ProfileEdit,
  PasswordChange,
  AttendanceReports,
  AnalyticsReports,
  AIPerformanceReports,
  DepartmentReports,
  NotificationsList,
  NotificationSettings,
} from "./components/GenericPage";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

// Route Configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  // Auth Routes (Public)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },

  // Protected Routes (Requires Authentication)
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      // Dashboard Routes
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "principal",
            element: <PrincipalDashboard />,
          },
          {
            path: "department-admin",
            element: <DepartmentAdminDashboard />,
          },
          {
            path: "teacher",
            element: <TeacherDashboard />,
          },
          {
            path: "student",
            element: <StudentDashboard />,
          },
        ],
      },

      // Department Management Routes
      {
        path: "departments",
        children: [
          {
            index: true,
            element: <DepartmentList />,
          },
          {
            path: "create",
            element: <DepartmentCreate />,
          },
          {
            path: ":id",
            element: <DepartmentView />,
          },
          {
            path: ":id/edit",
            element: <DepartmentEdit />,
          },
        ],
      },

      // Attendance Management Routes
      {
        path: "attendance",
        children: [
          {
            index: true,
            element: <AttendanceView />,
          },
          {
            path: "mark-ai",
            element: <AttendanceMarkingAI />,
          },
          {
            path: "mark-manual",
            element: <AttendanceManual />,
          },
          {
            path: "edit/:id",
            element: <AttendanceEdit />,
          },
          {
            path: "history",
            element: <AttendanceHistory />,
          },
        ],
      },

      // Admin Routes (Principal Admin Only)
      {
        path: "admin",
        children: [
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "settings",
            element: <SystemSettings />,
          },
          {
            path: "roles",
            element: <RolePermissions />,
          },
          {
            path: "audit",
            element: <AuditLogs />,
          },
          {
            path: "health",
            element: <SystemHealth />,
          },
        ],
      },

      // Profile Routes
      {
        path: "profile",
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "edit",
            element: <ProfileEdit />,
          },
          {
            path: "password",
            element: <PasswordChange />,
          },
        ],
      },

      // Reports Routes
      {
        path: "reports",
        children: [
          {
            index: true,
            element: <AttendanceReports />,
          },
          {
            path: "analytics",
            element: <AnalyticsReports />,
          },
          {
            path: "ai-performance",
            element: <AIPerformanceReports />,
          },
          {
            path: "department",
            element: <DepartmentReports />,
          },
        ],
      },

      // Notifications Routes
      {
        path: "notifications",
        children: [
          {
            index: true,
            element: <NotificationsList />,
          },
          {
            path: "settings",
            element: <NotificationSettings />,
          },
        ],
      },
    ],
  },

  // 404 Route
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

// Route Constants for easier maintenance
export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    LOGOUT: "/auth/logout",
  },
  DASHBOARD: {
    ROOT: "/dashboard",
    PRINCIPAL: "/dashboard/principal",
    DEPARTMENT_ADMIN: "/dashboard/department-admin",
    TEACHER: "/dashboard/teacher",
    STUDENT: "/dashboard/student",
  },
  DEPARTMENTS: {
    LIST: "/departments",
    CREATE: "/departments/create",
    VIEW: (id) => `/departments/${id}`,
    EDIT: (id) => `/departments/${id}/edit`,
  },
  ATTENDANCE: {
    ROOT: "/attendance",
    MARK_AI: "/attendance/mark-ai",
    MARK_MANUAL: "/attendance/mark-manual",
    EDIT: (id) => `/attendance/edit/${id}`,
    HISTORY: "/attendance/history",
  },
  ADMIN: {
    USERS: "/admin/users",
    SETTINGS: "/admin/settings",
    ROLES: "/admin/roles",
    AUDIT: "/admin/audit",
    HEALTH: "/admin/health",
  },
  PROFILE: {
    ROOT: "/profile",
    EDIT: "/profile/edit",
    PASSWORD: "/profile/password",
  },
  REPORTS: {
    ROOT: "/reports",
    ANALYTICS: "/reports/analytics",
    AI_PERFORMANCE: "/reports/ai-performance",
    DEPARTMENT: "/reports/department",
  },
  NOTIFICATIONS: {
    ROOT: "/notifications",
    SETTINGS: "/notifications/settings",
  },
};

export default router;
