## 1️⃣ User Service – Schema

**Entities & Relationships**

1. **User**

   * **Purpose**: Stores all user accounts (Principal Admin, Department Admin, Teacher, Student).
   * **Key Fields**:

     * `user_id`: Unique identifier (UUID).
     * `email`: Unique, used for login.
     * `password_hash`: Secured password storage.
     * `role_id`: Links user to a role.
   * **Relationships**: Each user has one role.

2. **Role**

   * **Purpose**: Defines roles like Principal Admin, Department Admin, Teacher, Student.
   * **Relationship**: Linked to multiple permissions via `RolePermission`.

3. **Permission**

   * **Purpose**: Defines specific permissions (e.g., `create_department`, `edit_attendance`).
   * **Relationship**: Many-to-many with roles via `RolePermission`.

4. **RolePermission**

   * **Purpose**: Bridges roles and permissions (many-to-many mapping).

**Design Notes**

* Decoupled roles and permissions allow adding new roles without schema changes.
* UUIDs ensure global uniqueness and easy distributed system integration.
* Timestamp fields support audit logging.

---
