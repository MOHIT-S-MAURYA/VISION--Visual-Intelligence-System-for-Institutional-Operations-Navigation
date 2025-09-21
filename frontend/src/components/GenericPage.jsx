import React from "react";

function GenericPage({ title, description }) {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="card-header">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600 mt-2">{description}</p>}
          </div>
          <div className="card-body">
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600">
                This {title.toLowerCase()} section is under development.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Part of the VISION AI-powered attendance management system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create specific page components
export const Register = () => (
  <GenericPage title="Register" description="Create a new VISION account" />
);
export const ForgotPassword = () => (
  <GenericPage
    title="Forgot Password"
    description="Reset your VISION password"
  />
);
export const Logout = () => (
  <GenericPage title="Logout" description="Signing you out..." />
);

export const PrincipalDashboard = () => (
  <GenericPage
    title="Principal Dashboard"
    description="Institution-wide overview and management"
  />
);
export const DepartmentAdminDashboard = () => (
  <GenericPage
    title="Department Admin Dashboard"
    description="Department management and oversight"
  />
);
export const TeacherDashboard = () => (
  <GenericPage
    title="Teacher Dashboard"
    description="Class management and attendance"
  />
);
export const StudentDashboard = () => (
  <GenericPage
    title="Student Dashboard"
    description="Your attendance and profile"
  />
);

export const DepartmentList = () => (
  <GenericPage
    title="Departments"
    description="Manage institution departments"
  />
);
export const DepartmentCreate = () => (
  <GenericPage title="Create Department" description="Add a new department" />
);
export const DepartmentEdit = () => (
  <GenericPage
    title="Edit Department"
    description="Modify department details"
  />
);
export const DepartmentView = () => (
  <GenericPage
    title="Department Details"
    description="View department information"
  />
);

export const AttendanceMarkingAI = () => (
  <GenericPage
    title="AI Attendance Marking"
    description="Mark attendance using facial recognition"
  />
);
export const AttendanceManual = () => (
  <GenericPage
    title="Manual Attendance"
    description="Mark attendance manually"
  />
);
export const AttendanceView = () => (
  <GenericPage
    title="Attendance Records"
    description="View attendance history"
  />
);
export const AttendanceEdit = () => (
  <GenericPage
    title="Edit Attendance"
    description="Modify attendance records"
  />
);
export const AttendanceHistory = () => (
  <GenericPage
    title="Attendance History"
    description="Historical attendance data"
  />
);

export const UserManagement = () => (
  <GenericPage title="User Management" description="Manage system users" />
);
export const SystemSettings = () => (
  <GenericPage
    title="System Settings"
    description="Configure system preferences"
  />
);
export const RolePermissions = () => (
  <GenericPage
    title="Role Permissions"
    description="Manage user roles and permissions"
  />
);
export const AuditLogs = () => (
  <GenericPage
    title="Audit Logs"
    description="System activity and security logs"
  />
);
export const SystemHealth = () => (
  <GenericPage title="System Health" description="Monitor system performance" />
);

export const Profile = () => (
  <GenericPage title="Profile" description="Your user profile and settings" />
);
export const ProfileEdit = () => (
  <GenericPage
    title="Edit Profile"
    description="Update your profile information"
  />
);
export const PasswordChange = () => (
  <GenericPage
    title="Change Password"
    description="Update your account password"
  />
);

export const AttendanceReports = () => (
  <GenericPage
    title="Attendance Reports"
    description="Generate attendance analytics"
  />
);
export const AnalyticsReports = () => (
  <GenericPage
    title="Analytics Reports"
    description="System usage and performance analytics"
  />
);
export const AIPerformanceReports = () => (
  <GenericPage
    title="AI Performance Reports"
    description="AI recognition accuracy and metrics"
  />
);
export const DepartmentReports = () => (
  <GenericPage
    title="Department Reports"
    description="Department-specific analytics"
  />
);

export const NotificationsList = () => (
  <GenericPage title="Notifications" description="Your system notifications" />
);
export const NotificationSettings = () => (
  <GenericPage
    title="Notification Settings"
    description="Configure notification preferences"
  />
);

export default GenericPage;
