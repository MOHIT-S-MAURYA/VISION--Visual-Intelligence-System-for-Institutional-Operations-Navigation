## **Department Service **

### **1. Department**

* **Purpose**: Represents an academic department in the institution, e.g., Computer Science, Physics.
* **Key Fields**:

  * `dept_id` (UUID, PK): Unique identifier for the department.
  * `name` (VARCHAR): Name of the department.
  * `description` (TEXT): Optional details or notes.
  * `created_at` / `updated_at` (TIMESTAMP): Timestamps for auditing and tracking changes.
* **Relationships**:

  * **One-to-Many** with **Class**: A department can have multiple classes.
  * **One-to-Many** with **Student**: A department has multiple students.
  * **One-to-Many** with **Teacher**: A department has multiple teachers.
  * **One-to-Many** with **Subject**: A department offers multiple subjects.

**Design Notes**:

* Central entity to group students, teachers, classes, and subjects.
* Timestamps enable versioning and change tracking.

---

### **2. Class**

* **Purpose**: Represents a batch or class in a department.
* **Key Fields**:

  * `class_id` (UUID, PK): Unique identifier for the class.
  * `dept_id` (UUID, FK): Department association.
  * `name` (VARCHAR): Name of the class (e.g., CS2025-A).
  * `year` (INT): Academic year or semester.
  * `created_at` / `updated_at` (TIMESTAMP): For auditing and tracking.
* **Relationships**:

  * **Many-to-One** with **Department**: Each class belongs to one department.
  * **One-to-Many** with **Student**: A class contains multiple students.

**Design Notes**:

* Allows grouping students within a department.
* Supports queries like “all students in a class” or “all classes in a department.”

---

### **3. Student**

* **Purpose**: Represents a student enrolled in the institution.
* **Key Fields**:

  * `student_id` (UUID, PK): Unique identifier for the student record.
  * `user_id` (UUID, FK): Links to the **User Service** for authentication and profile.
  * `dept_id` (UUID, FK): Links to department.
  * `class_id` (UUID, FK): Links to the class the student belongs to.
  * `registration_number` (VARCHAR): Unique registration number per student.
  * `enrollment_date` (DATE): Date of joining.
  * `created_at` / `updated_at` (TIMESTAMP): Auditing timestamps.
* **Relationships**:

  * **Many-to-One** with **Department**.
  * **Many-to-One** with **Class**.
  * **One-to-One** with **User**: Each student account in User Service.

**Design Notes**:

* Having both `dept_id` and `class_id` allows queries at both department and class levels.
* Linked to User Service to separate authentication/authorization from student-specific data.

---

### **4. Teacher**

* **Purpose**: Represents teachers in a department.
* **Key Fields**:

  * `teacher_id` (UUID, PK): Unique identifier.
  * `user_id` (UUID, FK): Links to **User Service**.
  * `dept_id` (UUID, FK): Department association.
  * `created_at` / `updated_at` (TIMESTAMP): For auditing.
* **Relationships**:

  * **Many-to-One** with **Department**.
  * **One-to-One** with **User**.
  * **Many-to-Many** with **Subject** via `TeacherSubject`.

**Design Notes**:

* Teachers can teach multiple subjects.
* Decouples teacher identity (User) from department-specific data.

---

### **5. Subject**

* **Purpose**: Represents courses offered by a department.
* **Key Fields**:

  * `subject_id` (UUID, PK): Unique identifier.
  * `name` (VARCHAR): Subject name (e.g., Data Structures).
  * `code` (VARCHAR): Unique subject code.
  * `dept_id` (UUID, FK): Department offering the subject.
  * `created_at` / `updated_at` (TIMESTAMP): Auditing.
* **Relationships**:

  * **Many-to-One** with **Department**.
  * **Many-to-Many** with **Teacher** via `TeacherSubject`.

**Design Notes**:

* Allows multiple teachers per subject and multiple subjects per teacher.
* Enables queries like “which teachers teach CS101” or “all subjects offered by Computer Science.”

---

### **6. TeacherSubject (Join Table)**

* **Purpose**: Resolves the many-to-many relationship between **Teacher** and **Subject**.
* **Key Fields**:

  * `teacher_id` (UUID, FK): Reference to teacher.
  * `subject_id` (UUID, FK): Reference to subject.
* **Relationships**:

  * **Many-to-One** to **Teacher**.
  * **Many-to-One** to **Subject**.

**Design Notes**:

* Makes the system flexible: teachers can teach multiple subjects, subjects can have multiple teachers.
* Essential for class scheduling, attendance assignments, and reporting.

---

### **Summary of Relationships**

* **Department → Class → Student**: Hierarchical grouping of students by class and department.
* **Department → Teacher**: Teachers belong to departments.
* **Department → Subject**: Departments offer subjects.
* **Teacher ↔ Subject**: Many-to-many mapping for teaching assignments.
* **Student ↔ User**, **Teacher ↔ User**: Links to centralized User Service.

---

### **Design Principles**

1. **Decoupled User Management**: Authentication and personal profiles are in User Service.
2. **Hierarchical Structure**: Department → Class → Student for clarity and reporting.
3. **Flexible Subject-Teacher Mapping**: Supports real-world academic scenarios.
4. **Auditing & Timestamps**: Every entity includes `created_at` / `updated_at`.
5. **UUIDs**: Ensures distributed system compatibility and global uniqueness.

---
