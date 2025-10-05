import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary, PageLoadingFallback } from './components/shared';

// Lazy load pages for code splitting
// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// Dashboard Pages
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const Analytics = lazy(() => import('./pages/dashboard/Analytics'));
const Attendance = lazy(() => import('./pages/dashboard/Attendance'));
const Departments = lazy(() => import('./pages/dashboard/Departments'));
const Media = lazy(() => import('./pages/dashboard/Media'));
const Notifications = lazy(() => import('./pages/dashboard/Notifications'));
const Users = lazy(() => import('./pages/dashboard/Users'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));

// Role-based Dashboard Pages
const StudentDashboard = lazy(() => import('./pages/dashboard/roles/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./pages/dashboard/roles/TeacherDashboard'));
const DepartmentAdminDashboard = lazy(() => import('./pages/dashboard/roles/DepartmentAdminDashboard'));
const PrincipalAdminDashboard = lazy(() => import('./pages/dashboard/roles/PrincipalAdminDashboard'));

// Profile Page
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          
          {/* Legacy auth routes for backwards compatibility */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Role-based Dashboard Routes */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/department" element={<DepartmentAdminDashboard />} />
          <Route path="/dashboard/principal" element={<PrincipalAdminDashboard />} />
          
          {/* Profile Route */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Protected App Routes */}
          <Route path="/" element={<Overview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/media" element={<Media />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </Router>
        
        {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;