# **1️⃣ User Service – Detailed Textual Design**

### **Purpose**

The **User Service** is the backbone of authentication, authorization, and user management for VISION. It manages all users including:

1. Principal Admin
2. Department Admin
3. Teacher
4. Student

It ensures **secure access**, **role-based permissions**, and **session management** across all microservices.

---

### **Functional Responsibilities**

#### **1. User Authentication**

* **Login**

  * Validate credentials (username/email + password).
  * Issue **JWT or OAuth2 token** for session management.
  * Log login timestamp and IP address.
  * **Edge Cases**:

    * Account locked after N failed attempts.
    * Expired password or mandatory password reset.
  * Optional: **2FA (Two-Factor Authentication)** for admin accounts.

* **Logout**

  * Invalidate session token in server-side cache or token blacklist.
  * Log logout timestamp.

* **Session Management**

  * Maintain active sessions per user.
  * Allow users to logout from all devices.
  * Track last login, last active, and session duration.

---

#### **2. User Management**

* **Create User**

  * Create users for all roles (Principal Admin, Dept Admin, Teacher, Student).
  * Assign **role and department/class associations**.
  * Validate unique email/username.

* **Update User**

  * Update name, email, password, role, department associations.
  * Password change requires hashing (bcrypt/Argon2) and audit logs.

* **Delete User**

  * Soft-delete (mark as inactive) to maintain foreign key references.
  * Hard delete optional only if no historical references.

* **Get User Info**

  * Return user profile details, role, and permissions.
  * Role-specific filtering (students see minimal data, admins see all).

---

#### **3. Role & Permission Management**

* **Roles**

  * Principal Admin: Full access.
  * Department Admin: Manage their department’s teachers/students.
  * Teacher: Access classes and attendance.
  * Student: Access own attendance and profile only.

* **Permissions**

  * Define a **role-permission mapping** table for fine-grained control.
  * Permissions determine what APIs and resources a user can access.
  * Permissions enforced at API gateway or service layer.

---

#### **4. Password & Security Management**

* Password hashing (bcrypt or Argon2).
* Password reset via email or OTP.
* Account lockout policy after multiple failed attempts.
* Optional: MFA for admins.
* Audit logs of all login/logout/change-password events.

---

#### **5. API Endpoints (REST)**

| Endpoint                   | Method | Request                                    | Response                 | Description                           |
| -------------------------- | ------ | ------------------------------------------ | ------------------------ | ------------------------------------- |
| /login                     | POST   | `{email, password}`                        | `{token, user_id, role}` | Authenticate user, return JWT         |
| /logout                    | POST   | `{token}`                                  | `{success}`              | Invalidate session token              |
| /users                     | POST   | `{name, email, role, dept_id?, class_id?}` | `{user_id}`              | Create user                           |
| /users/{id}                | GET    | -                                          | `{user details}`         | Get user profile                      |
| /users/{id}                | PUT    | `{name, email, password, role}`            | `{success}`              | Update user info                      |
| /users/{id}                | DELETE | -                                          | `{success}`              | Delete user (soft delete recommended) |
| /users/{id}/reset-password | POST   | `{new_password, otp}`                      | `{success}`              | Reset password securely               |
| /roles                     | GET    | -                                          | `{roles, permissions}`   | List available roles and permissions  |

---

#### **6. Data Model**

**User Table**

* `user_id` (UUID, PK)
* `name` (VARCHAR)
* `email` (VARCHAR, unique)
* `password_hash` (VARCHAR)
* `role` (ENUM: PrincipalAdmin, DeptAdmin, Teacher, Student)
* `department_id` (FK, optional for teachers/students)
* `class_id` (FK, optional for students)
* `is_active` (BOOLEAN)
* `last_login` (TIMESTAMP)
* `created_at` / `updated_at` (TIMESTAMP)

**Role-Permission Table**

* `role` (ENUM)
* `permission` (VARCHAR)
* `description` (TEXT)

**Session Table (Optional)**

* `session_id` (UUID, PK)
* `user_id` (FK)
* `token` (VARCHAR)
* `device_info` (TEXT)
* `ip_address` (VARCHAR)
* `created_at` / `expires_at`

---

#### **7. Workflows**

**Login Flow**

1. User sends email/password to `/login`.
2. Service validates credentials.
3. If valid → generate JWT + optional refresh token.
4. Log login attempt and timestamp.
5. Return token and user details.

**Password Reset Flow**

1. User requests reset → OTP/email sent.
2. User submits OTP + new password.
3. Validate OTP, hash new password.
4. Update user record.
5. Invalidate existing sessions.

**Role Assignment Flow**

1. Admin creates user or updates role.
2. Service checks permissions mapping.
3. Updates user record.
4. Audit log entry created.

---

#### **8. Security Considerations**

* Passwords **never stored in plain text**.
* Use **JWT with expiration** for authentication.
* HTTPS enforced for all endpoints.
* Rate-limiting to prevent brute-force attacks.
* Audit logs for all sensitive operations (login, password change, role updates).

---

#### **9. Integration with Other Services**

* Supplies user info to **Department, Attendance, Notification, Analytics** services.
* Admin roles determine permissions in other services.
* Auth token validated at API gateway or service layer before allowing requests.

---

✅ **Summary**

* Centralized user management with **role-based access control**.
* Secure authentication, login/logout, password management.
* Provides consistent user identity across all microservices.
* Extensible for future roles or SSO integration.

---
