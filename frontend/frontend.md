# 📘 Frontend Documentation (React + REST API)

## 📌 Overview

This is the **frontend module** of our project, built with **React** (Vite bundler) and connected to a **Django REST Framework (DRF)** backend.
The frontend is responsible for providing a **modern, sleek, and responsive UI** for institutions (schools, colleges, offices, etc.), while communicating with the backend strictly via **REST APIs**.

---

## ⚙️ Tech Stack

- **React 18+** (UI library)
- **Vite** (bundler & dev server)
- **React Router DOM** (routing)
- **Axios** (HTTP requests to DRF APIs)
- **TailwindCSS** (styling, utility-first approach)
- **React Icons / Lucide React** (icons)
- **Context API / Zustand / Redux** (state management – TBD depending on scale)

---

## 📂 Folder Structure

```
frontend/
 ├── src/
 │   ├── api/               # Handles API calls to DRF
 │   │   ├── auth.js        # Login, Signup, Logout, Token refresh
 │   │   ├── users.js       # User-related APIs (profile, roles)
 │   │   ├── attendance.js  # Attendance-related APIs
 │   │   ├── admin.js       # Admin operations APIs
 │   │   └── index.js       # Axios instance, base config
 │   │
 │   ├── components/        # Reusable UI components
 │   │   ├── forms/         # Input fields, dropdowns, buttons
 │   │   ├── navbar/        # Top navigation bars
 │   │   ├── sidebar/       # Sidebars (role-based menus)
 │   │   └── cards/         # Dashboard cards, stat boxes
 │   │
 │   ├── layouts/           # Page layouts
 │   │   ├── AuthLayout.jsx # Layout for login/signup
 │   │   └── MainLayout.jsx # Layout for dashboard pages
 │   │
 │   ├── pages/             # Page-level components
 │   │   ├── Auth/          # Login & Signup
 │   │   │   ├── Login.jsx
 │   │   │   └── Signup.jsx
 │   │   ├── Dashboard/     # Dashboard (role-based views)
 │   │   ├── Attendance/    # Attendance pages
 │   │   ├── Departments/   # Departments / Classes
 │   │   ├── Profile/       # User profile
 │   │   └── Admin/         # Admin management pages
 │   │
 │   ├── utils/             # Helper functions
 │   │   ├── validators.js  # Input validation
 │   │   ├── formatters.js  # Date/time, role formatters
 │   │   └── constants.js   # Role names, API URLs, etc.
 │   │
 │   ├── App.jsx            # Root component
 │   ├── main.jsx           # Entry point
 │   └── index.css          # Global styles
 │
 ├── public/                # Static assets (logos, icons)
 └── package.json           # Dependencies
```

---

## 🔑 Authentication Flow

The frontend communicates with DRF’s authentication system.

1. **Login Page**

   - Sends POST request to `/api/auth/login/` with username & password.
   - Backend returns JWT (access & refresh tokens).
   - Tokens are stored in `localStorage` or `httpOnly cookies`.
   - Auth state is managed via Context/Zustand.

2. **Signup Page**

   - Sends POST request to `/api/auth/signup/` with user details.
   - Confirms account creation.
   - Optional: Email/OTP verification.

3. **Logout**

   - Clears tokens from localStorage.
   - Redirects to Login page.

4. **Protected Routes**

   - React Router guards pages using tokens.
   - If token expired, refresh token is used (via `/api/auth/token/refresh/`).
   - If refresh fails → redirect to login.

---

## 🖥️ Pages (Detailed)

### 1. **Login Page**

- Clean UI with institution branding.
- Inputs: Email/Username, Password.
- Button: **Login**.
- Links: “Forgot Password?”, “Sign Up”.
- API: `POST /api/auth/login/`.

### 2. **Signup Page**

- Inputs: Full Name, Email, Password, Confirm Password, Role (dropdown).
- Checkbox: Accept Terms & Conditions.
- Button: **Sign Up**.
- API: `POST /api/auth/signup/`.

### 3. **Dashboard (Role-Based)**

- Displays stats & quick links based on role:

  - **Student** → Attendance, Profile, Departments.
  - **Teacher** → Class Attendance, Reports.
  - **Admin** → User management, Departments, Attendance summary.

- API: `GET /api/dashboard/`.

### 4. **Attendance Pages**

- **Student** → View personal attendance records.
- **Teacher** → Mark attendance for class.
- **Admin** → View overall institution attendance reports.
- APIs:

  - `GET /api/attendance/student/`
  - `POST /api/attendance/mark/`
  - `GET /api/attendance/report/`.

### 5. **Departments**

- View departments/classes.
- Admin can **create/edit/delete departments**.
- API: `GET /api/departments/`, `POST /api/departments/`.

### 6. **Profile**

- User can view & update profile (name, email, role, photo).
- API: `GET /api/users/me/`, `PATCH /api/users/me/`.

### 7. **Admin Pages**

- Manage users, roles, and permissions.
- CRUD operations for departments & staff.
- API: `GET/POST/PUT/DELETE /api/admin/users/`.

---

## 🎨 UI/UX Guidelines

- **Consistency**: All pages use the same design system.
- **Modern Look**: Rounded corners, soft shadows, plenty of white space.
- **Responsiveness**: Works on mobile, tablet, desktop.
- **Accessibility**: Proper labels, keyboard navigation, high-contrast colors.

---

## 🔗 API Integration Pattern

All API requests use a **centralized Axios instance**:

```js
// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## 🛠️ State Management

- **Auth state**: Logged-in user & tokens.
- **UI state**: Sidebar open/close, theme mode.
- **Data state**: Attendance records, user profile, department lists.

---

## ✅ Development Guidelines

1. Always use DRF APIs (never hardcode mock data).
2. Keep components **small and reusable**.
3. Separate **UI (components)** and **business logic (api calls & utils)**.
4. Follow **role-based access** in routes.
5. Run linting & formatting before commits.

---

# 0 — Routing & Role Access Overview

Use React Router v6. Each route must be guarded by `ProtectedRoute` which verifies JWT + role.

| Page name (component)             |                                    Route path | Allowed roles                                                    |
| --------------------------------- | --------------------------------------------: | ---------------------------------------------------------------- |
| Landing / Homepage                |                                           `/` | public (optional)                                                |
| Login                             |                                 `/auth/login` | public                                                           |
| Register (self-register)          |                              `/auth/register` | public (or disabled in some deployments)                         |
| Forgot Password                   |                       `/auth/forgot-password` | public                                                           |
| Reset Password                    |                 `/auth/reset-password?token=` | public                                                           |
| Dashboard (role router)           |     `/dashboard` → redirects to role-specific | Student / Teacher / DeptAdmin / PrincipalAdmin                   |
| Student Dashboard                 |                          `/dashboard/student` | Student                                                          |
| Teacher Dashboard                 |                          `/dashboard/teacher` | Teacher                                                          |
| Department Admin Dashboard        |                       `/dashboard/department` | Department Admin                                                 |
| Principal Admin Dashboard         |                        `/dashboard/principal` | Principal Admin                                                  |
| Departments List                  |                                `/departments` | DeptAdmin, PrincipalAdmin                                        |
| Department Details                |                        `/departments/:deptId` | DeptAdmin, PrincipalAdmin                                        |
| Classes List                      |                                    `/classes` | DeptAdmin, PrincipalAdmin                                        |
| Class Details                     |                           `/classes/:classId` | DeptAdmin, PrincipalAdmin, Teacher (if assigned)                 |
| Students List                     |                                   `/students` | DeptAdmin, PrincipalAdmin                                        |
| Student Profile                   |                        `/students/:studentId` | DeptAdmin, PrincipalAdmin, Teacher (if in class), Student (self) |
| Teachers List                     |                                   `/teachers` | DeptAdmin, PrincipalAdmin                                        |
| Teacher Profile                   |                        `/teachers/:teacherId` | DeptAdmin, PrincipalAdmin, Teacher (self)                        |
| Subjects List                     |                                   `/subjects` | DeptAdmin, PrincipalAdmin                                        |
| Create / Edit Subject             |         `/subjects/new`, `/subjects/:id/edit` | DeptAdmin, PrincipalAdmin                                        |
| Attendance Sessions List          |                        `/attendance/sessions` | Teacher, DeptAdmin, PrincipalAdmin                               |
| Create Session                    |                    `/attendance/sessions/new` | Teacher, DeptAdmin, PrincipalAdmin                               |
| Session Details / Mark Attendance |             `/attendance/sessions/:sessionId` | Teacher, DeptAdmin, PrincipalAdmin                               |
| Manual Mark Attendance            |         `/attendance/manual` (modal or route) | Teacher, DeptAdmin, PrincipalAdmin                               |
| AI Recognition (upload)           | used inside `/attendance/sessions/:sessionId` | Teacher                                                          |
| Attendance Edit History           |           `/attendance/history/:attendanceId` | DeptAdmin, PrincipalAdmin                                        |
| Reports — Attendance              |                         `/reports/attendance` | DeptAdmin, PrincipalAdmin, Teacher (class reports)               |
| Reports — Student                 |                 `/reports/student/:studentId` | Student, Teacher (class), DeptAdmin, PrincipalAdmin              |
| Analytics Dashboard               |                                  `/analytics` | DeptAdmin, PrincipalAdmin                                        |
| Notifications                     |                              `/notifications` | All roles (per-user)                                             |
| Media Manager                     |                                      `/media` | DeptAdmin, PrincipalAdmin                                        |
| AI / Embeddings Manager           |                              `/ai/embeddings` | PrincipalAdmin (or AI Admin)                                     |
| Users / Admins Management         |                                `/admin/users` | PrincipalAdmin                                                   |
| Profile                           |                                    `/profile` | All roles (self)                                                 |
| Settings                          |                                   `/settings` | All roles (with admin-only sections)                             |
| Audit Logs                        |                                 `/audit-logs` | PrincipalAdmin (and DeptAdmin partial)                           |
| 404 Page                          |                                           `*` | public                                                           |

---

# 1 — Page-by-page detailed specs

> Each page spec includes: Purpose, Route, Allowed roles, Visual layout, Components required, API calls (method, path, request JSON, success response, error responses/status), form fields and validations, client behavior (loading, success, error flows), accessibility, responsive rules and test cases.

---

## 1.1 Login Page

**Component**: `pages/Auth/Login.jsx`
**Route**: `/auth/login`
**Roles**: public

### Purpose

Authenticate user, obtain JWT (access + refresh), store safely, fetch user profile, and redirect to appropriate dashboard.

### Visual layout

- Centered card (max width 420px)
- Logo + app name (top)
- Title: “Welcome Back”
- Subtitle: “Sign in to continue”
- Inputs:

  - Email or Username (single field)
  - Password (with show/hide toggle)
  - Optional: Remember me checkbox

- Primary button: “Login”
- Secondary links: “Forgot password?” and “Sign up” (if enabled)
- Error area (inline) — top of card or near fields
- Loading spinner inside Login button when submitting

### Components used

`TextInput`, `PasswordInput` (with toggle), `Checkbox`, `PrimaryButton`, `Link`, `FormError`

### API call(s)

1. **Authenticate**

   - Method: `POST`
   - Path: `/api/auth/login/`
   - Request JSON:

     ```json
     {
       "username": "user@example.com", // or "email"
       "password": "plaintext-password"
     }
     ```

   - Success (200):

     ```json
     {
       "access": "<jwt_access_token>",
       "refresh": "<jwt_refresh_token>",
       "user": {
         "id": "uuid",
         "email": "user@example.com",
         "role": "Teacher",
         "name": "John Doe"
       }
     }
     ```

   - Errors:

     - `400` Bad Request: `{ "detail": "Invalid credentials" }` or field errors
     - `403` Forbidden: `{ "detail": "Account disabled" }`
     - `429` Too Many Requests: rate limit

2. **Post-login (optional)**: if login returns only tokens, client calls:

   - `GET /api/users/me/` (200) returns user profile.

### Client behavior

- Validate fields client-side: email non-empty; password non-empty.
- On submit: disable form, show spinner.
- On success: store tokens securely (prefer httpOnly cookie set by backend if available; otherwise store `access` in memory/Redux and `refresh` in httpOnly cookie if backend supports) — if you must store in localStorage, use secure rules and short expiry; always send `Authorization: Bearer <access>` header in `api` axios instance.
- Fetch `/api/users/me/` to get full profile if not returned, set user context/store.
- Redirect based on role:

  - Student → `/dashboard/student`
  - Teacher → `/dashboard/teacher`
  - DeptAdmin → `/dashboard/department`
  - PrincipalAdmin → `/dashboard/principal`

- On 401/400 show inline message: "Invalid email or password", or specific backend message.
- Rate-limit handling: display "Too many attempts. Try again in X minutes."

### Validations

- Email/Username: required, valid format if email
- Password: required
- Optionally show password strength on input but not necessary for login.

### Accessibility

- Labels associated using `label` and `aria-labelledby`.
- Password toggle is keyboard accessible and has `aria-pressed`.
- Error messages linked via `aria-describedby`.
- Form supports enter key submission.

### Responsive

- Card centered, width adjusts: `w-full sm:w-96`
- Inputs full width.

### Tests (example)

- Successful login with valid credentials -> tokens stored, redirect to role dashboard.
- Invalid credentials -> error shown, no redirect.
- Network error -> generic message "Network error, try again".
- Accessibility: focus order, screen reader reads errors.

---

## 1.2 Signup / Register Page

**Component**: `pages/Auth/Register.jsx`
**Route**: `/auth/register`
**Roles**: public or enabled by admin (some installations disable self-signup)

### Purpose

Register new user (student, teacher, dept admin). For institutional deployments, self-registration might be for students only; admins may create teachers via admin pages.

### Visual layout

- Centered card similar to Login
- Title: “Create an account”
- Fields:

  - Full Name
  - Email (institutional)
  - Password + Confirm password
  - Password strength bar (Weak / Medium / Strong)
  - Department dropdown (optional; if sign-up by students)
  - Role dropdown (dropdown options: Student, Teacher, Department Admin) — can be hidden if self-register is allowed only for Students; otherwise only admins create accounts
  - Accept Terms checkbox

- Primary button: “Sign Up”
- Secondary link: “Already have an account? Login”

### Components used

`TextInput`, `PasswordInput`, `Select`, `Checkbox`, `PasswordStrengthBar`, `PrimaryButton`, `FormError`

### APIs

1. **Signup**

   - Method: `POST`
   - Path: `/api/auth/register/` (DRF)
   - Request JSON (example):

     ```json
     {
       "name": "Mohit Maurya",
       "email": "student@college.edu",
       "password": "StrongP@ssw0rd",
       "role": "Student",
       "department_id": "uuid-or-null",
       "accept_terms": true
     }
     ```

   - Success: `201 Created`

     ```json
     { "id": "uuid", "email": "student@college.edu", "status": "pending" }
     ```

     - Could return tokens and user profile if automatic login is desired.

   - Errors:

     - `400` field-specific e.g. `{ "email":["This email is already registered"] }`
     - `422` / `400` password complexity

2. **Optional**: `POST /api/auth/verify-email/` to trigger email verification if sign-up needs confirmation.

### Client behavior

- Strong client-side validation:

  - Password min 8 chars, at least one uppercase, one lowercase, one digit, one special char.
  - Confirm password matches.
  - Email validity check.
  - Department selection required if sign-up role requires.
  - Terms must be checked (if required).

- On submit: visual spinner, disable submit.
- On success:

  - If backend returns tokens → set auth and redirect to appropriate dashboard.
  - If backend returns pending verification → show message "Check your email to activate account".

- On specific errors, highlight fields inline.

### Accessibility

- `aria-invalid` used for invalid fields, error messages connected via `aria-describedby`.
- Password strength announcements for screen readers.

### Responsive

- same as login.

### Tests

- Valid sign-up -> either auto-login or show verification message.
- Taken email -> error inline.
- Weak password -> block with clear message.

---

## 1.3 Forgot Password Page

**Component**: `pages/Auth/ForgotPassword.jsx`
**Route**: `/auth/forgot-password`
**Roles**: public

### Purpose

Trigger backend to send password reset link/OTP.

### UI

- Single input: Email
- Button: “Send reset link”
- On success: show an informational message: "If that email exists we'll send a link."

### API

- `POST /api/auth/forgot-password/`
  Request:

  ```json
  { "email": "user@example.com" }
  ```

  Success: `200 OK` or `204 No Content` with message.
  Errors: `400` invalid email

### Behavior

- Always return neutral message to avoid revealing user existence.
- Show spinner while sending.
- Provide link back to login.

### Accessibility & Tests

- Ensure messages read by screen reader.
- Test email format validation and neutral success response.

---

## 1.4 Reset Password Page

**Component**: `pages/Auth/ResetPassword.jsx`
**Route**: `/auth/reset-password?token=...` (token from email)
**Roles**: public

### Purpose

Reset password using a secure token.

### UI

- New Password, Confirm Password, Password strength bar, Reset button.

### API

- `POST /api/auth/reset-password/`
  Request:

  ```json
  {
    "token": "<reset-token>",
    "new_password": "NewStrongP@ss1"
  }
  ```

  Success: `200 OK` `{ "detail":"Password changed successfully" }`
  Errors:

  - `400` invalid/expired token
  - `400` weak password

### Behavior

- On success redirect to login with success toast.

---

## 1.5 Dashboard (Role-based) — Root

**Component**: `pages/Dashboard/Dashboard.jsx` (routes to role-specific dashboards)
**Route**: `/dashboard`
**Roles**: authenticated

### Purpose

Single entry point; redirect user to role-specific dashboard based on `user.role`. If user has multiple roles (rare), provide role switcher.

### Behavior

- On mount: fetch `GET /api/users/me/` if not present.
- Redirect:

  - Student → `/dashboard/student`
  - Teacher → `/dashboard/teacher`
  - DeptAdmin → `/dashboard/department`
  - PrincipalAdmin → `/dashboard/principal`

---

## 1.6 Student Dashboard

**Component**: `pages/Dashboard/StudentDashboard.jsx`
**Route**: `/dashboard/student`
**Roles**: Student

### Purpose

Student’s overview of attendance, upcoming sessions, notifications.

### Layout & Components

- Top KPI cards: Attendance % (last 30 days), Days Present, Days Absent
- Graph: Attendance over time (line chart)
- Recent notifications list (pull from WebSocket and `GET /api/notifications/`)
- Quick links: My Attendance, Profile, Download Report

### APIs

- `GET /api/attendance/student/:studentId?range=30` (returns attendance list + summary)
  Response:

  ```json
  {
    "student_id":"uuid",
    "attendance_summary": {
      "period_start":"2025-09-01",
      "period_end":"2025-09-30",
      "present_count": 24,
      "absent_count": 3,
      "attendance_percentage": 88.89
    },
    "records":[ { "date":"2025-09-01", "status":"Present" }, ... ]
  }
  ```

- `GET /api/notifications/?user_id=` (paginated)

### Behavior

- Chart caches last 24 hours data; refresh on user pull-to-refresh or scheduled every X minutes.
- Support exporting personal report: `GET /api/reports/student/:studentId?format=pdf|csv`

### Validation & Edge cases

- If no attendance records → show empty state with guidance.
- If server error → show retry action.

---

## 1.7 Teacher Dashboard

**Component**: `pages/Dashboard/TeacherDashboard.jsx`
**Route**: `/dashboard/teacher`
**Roles**: Teacher

### Purpose

Overview of teacher’s classes, today's sessions, quick attendance marking, and recent recognition results.

### Layout

- Today’s sessions list (time, class, subject)
- For each session, action: “Start Attendance” → opens `/attendance/sessions/new` or session details
- Quick KPI: Today attendance average, classes this week
- Recent AI recognition results (if configured): `GET /api/ai/recent-results?teacher_id=`
- Notifications and pending leave approvals

### APIs

- `GET /api/teacher/:teacherId/sessions?date=today` → list of class sessions
- `POST /fastapi/attendance/recognize/` — called from the Mark Attendance flow (multipart/form-data with image)
  Request (multipart):

  - `session_id`: uuid
  - `image`: file
    Response (200):

  ```json
  {
    "job_id":"uuid",
    "results":[
      { "student_id":"uuid", "confidence":0.92, "bbox":[x,y,w,h] },
      ...
    ]
  }
  ```

- `POST /api/attendance/mark/` — mark attendance with list of student statuses
  Request:

  ```json
  {
    "session_id":"uuid",
    "records":[
      {"student_id":"uuid","status":"Present","marked_by":"teacher_uuid","recognized_by_ai": true,"ai_confidence":0.92},
      ...
    ]
  }
  ```

  Response: `200` or `201` with created/updated records.

### Client behavior

- Start a session → optional upload classroom photo → call FastAPI → show candidate matches (preview with thumbnails and confidence); teacher can confirm/uncheck / correct students.
- On confirmation: `POST /api/attendance/mark/` to persist records.
- Support manual marking UI with search & checkboxes.

### Validations

- Only students in class are eligible.
- If AI confidence below threshold (configurable, e.g., 0.60) show as "Low Confidence — require teacher confirmation".

### Loading & Error

- Show progress for image upload and recognition job.
- If FastAPI fails -> fallback to manual attendance marking.

---

## 1.8 Department Admin Dashboard

**Component**: `pages/Dashboard/DepartmentDashboard.jsx`
**Route**: `/dashboard/department`
**Roles**: Department Admin

### Purpose

Department-wide view: students, teachers, classes, department attendance summaries, create/manage departments/classes.

### Layout

- KPI cards: Total Students, Total Teachers, Avg Attendance (dept)
- Department classes list
- Quick actions: Add Student, Add Teacher, Create Class
- Links to departmental analytics and reports

### APIs (examples)

- `GET /api/departments/:deptId/summary`
- `GET /api/departments/:deptId/classes`
- `POST /api/students/`
- `GET /api/attendance/department/:deptId?range=30`

### Behavior

- Data heavy: use pagination for lists, lazy-loading.
- Bulk actions: bulk upload students CSV, bulk assign to class.

---

## 1.9 Principal Admin Dashboard

**Component**: `pages/Dashboard/PrincipalDashboard.jsx`
**Route**: `/dashboard/principal`
**Roles**: Principal Admin

### Purpose

Top-level institution overview, create departments, create department admins, global analytics, audit & logs.

### Layout

- Global KPIs: Institutions: total departments, total users, system health
- System-level reports, audit logs viewer
- Admin user management: CRUD users and assign roles

### APIs

- `GET /api/admin/overview`
- `GET /api/audit-logs?limit=50`
- `POST /api/departments/`
- `GET /api/users?role=DepartmentAdmin`

---

## 1.10 Departments List & Details

**Component(s)**: `pages/Departments/Departments.jsx`, `pages/Departments/DepartmentDetails.jsx`
**Routes**: `/departments`, `/departments/:deptId`
**Roles**: DeptAdmin, PrincipalAdmin

### Departments List

- Table columns: Name, Code, #Classes, #Students, Actions (View / Edit / Delete)
- API: `GET /api/departments/?page=1&page_size=20` (paginated)
- Actions call DRF endpoints: create/update/delete

### Department Details

- Tabs: Overview, Classes, Teachers, Students, Reports
- Calls:

  - `GET /api/departments/:deptId/`
  - `GET /api/departments/:deptId/classes/`
  - `GET /api/departments/:deptId/students/`

- Support CSV export for student lists.

---

## 1.11 Classes List & Class Details

**Component**: `pages/Classes/Classes.jsx`, `pages/Classes/ClassDetails.jsx`
**Routes**: `/classes`, `/classes/:classId`
**Roles**: DeptAdmin, PrincipalAdmin, Teacher

### Class List

- Columns: Name, Dept, Year, Subjects, Actions
- API: `GET /api/classes/?dept_id=&page=`

### Class Details

- Show roster (paginated), assigned teachers, scheduled sessions
- Actions: Add/Remove student, Schedule Session

---

## 1.12 Students List & Student Profile

**Component**: `pages/Students/Students.jsx`, `pages/Students/StudentProfile.jsx`
**Routes**: `/students`, `/students/:studentId`
**Roles**: DeptAdmin, PrincipalAdmin, Teacher (limited), Student (self)

### Students List

- Columns: Photo, Name, Roll No, Class, Dept, Email, Actions
- APIs: `GET /api/students/?class_id=&dept_id=&q=`
- Search, filters, bulk CSV upload

### Student Profile

- Sections: Basic Info, Photo(s), Enrollment details, Attendance summary widget, AI embeddings status, Documents (if any)
- APIs:

  - `GET /api/students/:studentId/`
  - `GET /api/attendance/student/:studentId/summary`
  - `GET /api/ai/embeddings?student_id=`

### Photo management

- Upload photo via `POST /api/media/upload` (multipart) or use signed URL flow:

  - Client calls `POST /api/media/presign/` → backend returns signed S3 URL
  - Client `PUT` file to S3, then `POST /api/media/confirm/` with metadata.

Validation: image types jpg/png, max 5MB (configurable). On upload, trigger AI embedding creation: `POST /fastapi/embeddings` or `POST /api/ai/embeddings` depending on integration.

---

## 1.13 Teachers List & Teacher Profile

**Component**: `pages/Teachers/Teachers.jsx`, `pages/Teachers/TeacherProfile.jsx`
**Routes**: `/teachers`, `/teachers/:teacherId`
**Roles**: DeptAdmin, PrincipalAdmin, Teacher (self)

### Teacher profile includes:

- Contact info, assigned classes, subjects, recent sessions, performance metrics
- APIs:

  - `GET /api/teachers/:teacherId/`
  - `GET /api/teacher/:id/sessions?range=7`

---

## 1.14 Subjects Management

**Component**: `pages/Subjects/Subjects.jsx`
**Routes**: `/subjects`, `/subjects/:id/edit`
**Roles**: DeptAdmin, PrincipalAdmin

### Actions

- Create/Edit subject, assign teachers, associate with classes
- APIs: `GET /api/subjects/`, `POST /api/subjects/`, `PUT /api/subjects/:id/`

---

## 1.15 Attendance — Sessions List & Create

**Component(s)**: `pages/Attendance/SessionsList.jsx`, `pages/Attendance/NewSession.jsx`
**Routes**: `/attendance/sessions`, `/attendance/sessions/new`
**Roles**: Teacher, DeptAdmin, PrincipalAdmin

### Sessions list

- Show upcoming/past sessions, filter by class/date
- API: `GET /api/attendance/sessions/?class_id=&date=`

### Create session

- Fields:

  - Class dropdown
  - Subject dropdown
  - Teacher (auto)
  - Date, Start time, End time
  - Classroom (room)
  - Option: auto-capture image (if teacher will upload)

- Validation:

  - Date/time required
  - Avoid conflicting sessions (server checks)

- API: `POST /api/attendance/sessions/`
  Request:

  ```json
  {
    "class_id": "uuid",
    "subject_id": "uuid",
    "teacher_id": "uuid",
    "session_date": "YYYY-MM-DD",
    "start_time": "HH:MM",
    "end_time": "HH:MM",
    "classroom": "B-101"
  }
  ```

---

## 1.16 Attendance — Session Details & Marking (most important)

**Component**: `pages/Attendance/SessionDetails.jsx`
**Route**: `/attendance/sessions/:sessionId`
**Roles**: Teacher, DeptAdmin, PrincipalAdmin

### Layout

- Session header (date, class, subject, teacher)
- Classroom photo preview (if uploaded)
- AI recognition pane (results) — list of students with thumbnail + confidence + status toggle (Present/Absent/Late/Excused)
- Manual list of students (roster) with quick toggles
- Bulk actions: Mark All Present / All Absent
- Save / Submit button
- Audit trail link (who marked, when)
- Undo / revert last change (soft)

### APIs

1. Fetch session & roster:

   - `GET /api/attendance/sessions/:sessionId/`
     Response includes roster: `[{"student_id","name","photo_url","roll_no"}]`

2. Trigger recognition:

   - `POST /fastapi/attendance/recognize/` (multipart form)
     Request: `session_id`, `image` file or `media_id` (if media already uploaded)
     Response:

     ```json
     {
       "job_id":"uuid",
       "results":[
         {"student_id":"uuid","confidence":0.94,"bbox":[x,y,w,h]},
         ...
       ]
     }
     ```

3. Persist attendance:

   - `POST /api/attendance/mark/`
     Request:

     ```json
     {
       "session_id":"uuid",
       "records":[
         {"student_id":"uuid","status":"Present","recognized_by_ai":true,"ai_confidence":0.94,"marked_by":"teacher_uuid"},
         ...
       ]
     }
     ```

     Response: `200 OK` with saved records, or `207 Multi-Status` if partial failure.

4. Edit record:

   - `PUT /api/attendance/:attendance_id/` update single record

### Client behaviors

- After recognition returns, auto-fill statuses but mark as **pending confirmation** if confidence < threshold.
- Teacher must review and confirm; unsaved changes are in local state; prompt "You have unsaved changes" if navigating away.
- Optimistic UI or batch saving: prefer atomic batch save on Submit to avoid partial updates.
- After save, show success toast; publish event for Notifications & Analytics.

### Validations

- Only allow marking students that belong to the session’s class.
- Enforce editing window: allow edits only within configured timeframe (e.g., 7 days). Backend should enforce.

### Accessibility & tests

- Keyboard navigation through roster.
- Screen reader announces recognition results.
- Test: Upload image -> simulated API returns -> auto-populated statuses -> teacher edits -> save -> records in DB.

---

## 1.17 Attendance — Manual Marking Page

**Component**: `pages/Attendance/ManualMark.jsx` or modal
**Route**: optionally `/attendance/manual`
**Roles**: Teacher, DeptAdmin, PrincipalAdmin

### Purpose

Manual marking for sessions where AI is not used.

### UI

- Date selector, class selector, roster with toggles
- Bulk buttons (Present / Absent / Late / Excused)
- Save

### API

- same `POST /api/attendance/mark/`

---

## 1.18 Attendance Edit History / Audit

**Component**: `pages/Attendance/History.jsx`
**Route**: `/attendance/history/:attendanceId`
**Roles**: DeptAdmin, PrincipalAdmin

### Purpose

Show edit log for attendance records. Each entry: changed_by, timestamp, old_status, new_status, reason (required on edit).

### API

- `GET /api/attendance/:attendanceId/history/`

---

## 1.19 Reports – Attendance & Downloads

**Component**: `pages/Reports/AttendanceReport.jsx`
**Route**: `/reports/attendance`
**Roles**: DeptAdmin, PrincipalAdmin, Teacher

### Features

- Filters: Dept / Class / Subject / Date range / Teacher
- Generate on-screen charts and export CSV/PDF
- Use server-side generation for heavy aggregation:

  - `GET /api/reports/attendance/?class_id=&start=YYYY-MM-DD&end=YYYY-MM-DD&format=csv`
  - If `format=csv` or `format=pdf` → return `200` with `Content-Disposition` attachment.

### Client behavior

- Display progress while server prepares large report.
- For large exports, backend may return a job_id; frontend polls `GET /api/reports/jobs/:jobId` until ready.

---

## 1.20 Analytics Dashboard

**Component**: `pages/Analytics/AnalyticsDashboard.jsx`
**Route**: `/analytics`
**Roles**: DeptAdmin, PrincipalAdmin

### Purpose

Deep analytics: trends, recognition metrics, teacher performance.

### APIs

- `GET /api/analytics/attendance/trends?dept_id=&range=90`
- `GET /api/analytics/recognition?start=&end=&model_version=`

### UI

- Interactive charts (filterable), heatmaps for attendance, tables for top absent students, time-series.

---

## 1.21 Notifications Page & Websocket

**Component**: `pages/Notifications/Notifications.jsx`, `components/NotificationBell.jsx`
**Route**: `/notifications`
**Roles**: All

### Real-time flow

- Websocket connection: `ws://<backend>/ws/notifications/?token=<access>` or use Django Channels auth
- Fetch history: `GET /api/notifications/?page=1`
- Each notification payload:

  ```json
  {
    "id":"uuid",
    "title":"Absent Alert",
    "message":"You were absent on 2025-09-14 for CS101",
    "channel":"email|push|inapp",
    "sent_at":"ISO8601",
    "read":false,
    "meta": { ... }
  }
  ```

- Client can mark as read: `PUT /api/notifications/:id/read/`

### UI behavior

- Bell shows unread count; dropdown shows last 5 notifications; notification click opens details page.

---

## 1.22 Media Manager

**Component**: `pages/Media/MediaManager.jsx`
**Route**: `/media`
**Roles**: DeptAdmin, PrincipalAdmin

### Purpose

Manage images/videos: list, upload, delete, view processed flag, trigger processing.

### APIs

- `POST /api/media/presign/` → returns signed URL
- `PUT` to storage (S3) or `POST /api/media/upload/` (backend handles)
- `GET /api/media/?owner_id=&owner_type=`
- `DELETE /api/media/:id/`

### Constraints

- Allowed file types: `image/jpeg, image/png` and `video/mp4` if needed.
- Max file size: 5 MB by default (configurable)
- UI shows progress bar, preview thumbnails, processed status.

---

## 1.23 AI / Embeddings Manager

**Component**: `pages/AI/EmbeddingsManager.jsx`
**Route**: `/ai/embeddings`
**Roles**: PrincipalAdmin (or AI Admin)

### Purpose

View embedding counts, model version, reindex FAISS, upload training samples.

### APIs

- `GET /api/ai/embeddings/stats`
- `POST /fastapi/embeddings/refresh` (trigger reindex)
- `GET /api/ai/models/` (list model versions)
- `POST /api/ai/models/:model_id/deploy` (deploy new model)

### UI

- Buttons to: Rebuild index, view embedding per student, download sample.

---

## 1.24 Users / Admin Management

**Component**: `pages/Admin/Users.jsx`
**Route**: `/admin/users`
**Roles**: PrincipalAdmin

### Purpose

Create/edit/delete users, assign roles and departments, bulk import.

### APIs

- `GET /api/users/?role=&page=`
- `POST /api/users/`
- `PUT /api/users/:id/`
- `DELETE /api/users/:id/`
- `POST /api/users/bulk-import/` (CSV)

### UI behaviors

- Role-based permission editor for admin
- Audit trail link per user (login history etc)

---

## 1.25 Profile & Settings

**Component**: `pages/Profile/Profile.jsx`, `pages/Settings/Settings.jsx`
**Routes**: `/profile`, `/settings`
**Roles**: All

### Profile

- Personal info, change password, upload profile picture
- APIs:

  - `GET /api/users/me/`
  - `PATCH /api/users/me/`
  - `POST /api/users/me/photo/`

### Settings

- Preferences: theme (dark/light), notifications preferences
- APIs:

  - `PUT /api/users/me/preferences/`

---

## 1.26 Audit Logs & Error pages

- `GET /api/audit-logs/?limit=50`
- 404 Page: show helpful links and login button
- 500 Page: show "Sorry, an unexpected error occurred"

---

# 2 — Shared components, common behavior & conventions

### Core shared components

- `PrimaryButton`, `SecondaryButton` (with loading spinner)
- `TextInput`, `PasswordInput`, `Select`, `DatePicker`, `TimePicker`
- `DataTable` (supports server-side pagination, sorting, filtering)
- `Modal` (confirm/inputs)
- `Toast` / `Snackbar` for transient messages
- `Loader` / `PageSpinner`
- `ProtectedRoute` (verifies token & role)
- `ImageUploader` (handles chunk/signed URL flow)
- `ConfirmationDialog` (for delete actions)

### API layer rules

- Use single `api` axios instance in `src/api/index.js`
- Interceptor: attach `Authorization: Bearer <access>` header
- Interceptor: on `401` attempt `POST /api/auth/token/refresh/` using refresh token; if fails redirect to login
- Centralized error handling: return structured error messages to UI

### Token storage & security

- Prefer `httpOnly` secure cookies for tokens set by backend. If cookies are not available, store `access` in memory + `refresh` in httpOnly cookie if possible. If not, localStorage with strict expiry and refresh logic.
- Frontend must never store passwords or raw sensitive info.

### Forms & validation

- Use `react-hook-form` + `Yup` schema
- For file uploads validate type and size client-side

### Pagination & large lists

- Use server-side pagination: include `page` & `page_size` query params
- DataTables must support `page`, `page_size`, `ordering`, `search` query parameters and push to query string

### Real-time notifications

- Use WebSocket / Django Channels with JWT authentication via query string or token header.
- Reconnect strategy with exponential backoff.

### Loading & empty states

- Provide skeleton UIs for lists
- Provide explicit empty state UI with CTA (e.g., "No students yet — add student")

### Error handling & retries

- 400: show field-level error messages
- 401: token refresh; if refresh fails redirect to login
- 403: show access denied UI
- 429: show rate-limit message -> backoff
- 5xx: show generic "Try again later" & report option

### Accessibility (WCAG)

- All inputs have labels
- All actionable buttons keyboard navigable
- Contrast ratios >= 4.5:1
- Aria attributes for dynamic content
- Focus management when opening modals

### Responsive rules

- Use mobile-first layout
- Sidebar collapses on small screens into burger menu
- Data tables show condensed view on mobile (stacked cards)

### Internationalization

- Use `react-i18next` for all text
- Default language: en; support resource files for other locales

### Theming

- Use CSS variables / Tailwind config for theme colors; enable dark mode via `class` strategy

### Testing

- Unit tests for components (Jest + React Testing Library) — test accessibility attributes and basic flows
- Integration tests for pages (Cypress) — test login, marking attendance flows with mocked backend
- E2E: simulate teacher uploads image → FastAPI returns results → persist attendance in DRF

---

# 3 — API request & response examples (summary)

Provided above per page; store these in `frontend/README.md` as the formal API contract.

Central axios instance:

```js
// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// attach token
api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

# 4 — Developer & Copilot instructions (explicit; no assumptions)

When instructing Copilot or devs to generate pages, adhere to this checklist for each page generated:

1. Create files under `src/pages/<Module>/<Page>.jsx` and corresponding CSS / Tailwind classes.
2. Import and use shared components instead of inline styles.
3. Use `react-hook-form` for forms; schema using `Yup`.
4. Use `api` instance for all requests; do not hardcode full URLs (use `process.env.REACT_APP_API_BASE` or relative to `/api`).
5. For file uploads, use presigned URL flow: call `POST /api/media/presign/` return `{ upload_url, media_id }`, then `PUT` file to `upload_url`, then `POST /api/media/confirm/` with `media_id`.
6. All lists are paginated: include controls for page_size and search; call backend with `?page=&page_size=&q=`.
7. All edit/delete actions must prompt `ConfirmationDialog`.
8. On sensitive actions (delete user, delete attendance), log reason (input) and send to audit API `POST /api/audit-logs/`.
9. Include error boundary wrapper for each page to catch runtime errors.
10. Add unit tests covering: rendering, validation, API success/failure, accessibility.
