## 3️⃣ Attendance Service
#### **1. AttendanceRecord**

* **Purpose**: Stores individual student attendance entries for each session.

* **Key Fields**:

  * `attendance_id` (UUID, PK): Unique identifier for attendance record.
  * `student_id` (UUID, FK): Student being marked present/absent.
  * `class_id` (UUID, FK): Class of the student.
  * `subject_id` (UUID, FK): Subject of the session.
  * `teacher_id` (UUID, FK): Teacher who recorded or verified attendance.
  * `date` (DATE): Date of attendance.
  * `status` (ENUM): Attendance status (`Present`, `Absent`, `Late`, `Excused`).
  * `recognized_by_ai` (BOOLEAN): True if attendance marked automatically by AI.
  * `ai_confidence` (FLOAT): Confidence score from AI recognition (0–1).
  * `created_at` / `updated_at` (TIMESTAMP): Audit timestamps.

* **Relationships**:

  * Linked to **Student**, **ClassSession**, **Teacher**, and **Subject**.

**Notes**:

* Allows both manual and AI-marked attendance.
* Confidence score supports review for low-confidence recognitions.

---

#### **2. ClassSession**

* **Purpose**: Represents an individual lecture/session in a class.

* **Key Fields**:

  * `session_id` (UUID, PK): Unique identifier for the session.
  * `class_id` (UUID, FK): Class where the session occurs.
  * `subject_id` (UUID, FK): Subject being taught.
  * `teacher_id` (UUID, FK): Teacher leading the session.
  * `session_date` (DATE), `start_time` / `end_time` (TIME): Session timing.
  * `classroom_photo_id` (UUID, FK): Link to Media Service storing classroom image.
  * `created_at` / `updated_at` (TIMESTAMP).

* **Relationships**:

  * Belongs to a class and subject.
  * Linked to attendance records and AI recognition logs.

**Notes**:

* Stores session-level metadata and classroom photo for AI recognition.

---

#### **3. AIRecognitionLog**

* **Purpose**: Tracks AI-based recognition results for audit and analytics.
* **Key Fields**:

  * `log_id` (UUID, PK): Unique log identifier.
  * `session_id` (UUID, FK): Related class session.
  * `student_id` (UUID, FK): Recognized student.
  * `recognized` (BOOLEAN): Whether student was correctly recognized.
  * `confidence` (FLOAT): AI confidence score (0–1).
  * `image_id` (UUID, FK): Classroom image analyzed.
  * `processed_at` (TIMESTAMP): Time AI processed the image.

**Notes**:

* Supports review of AI performance.
* Used by Analytics Service for AI accuracy metrics.

---

#### **4. Class, Subject, Student, Teacher**

* **Purpose**: Minimal references to link with attendance.
* **Notes**:

  * Student, Teacher, Class, and Subject are fetched from **Department Service** or **User Service** via API.
  * Only minimal fields needed for foreign key linking; detailed profiles remain in their respective services.

---

### **Relationships & Design Highlights**

* **Many-to-One**: Attendance → Student, Teacher, ClassSession, Subject.
* **One-to-One / One-to-Many**: AIRecognitionLog → Attendance, Student, ClassSession.
* **Supports both manual and AI-based attendance** with confidence scoring.
* **Session-level images stored in Media Service**, keeping binary data out of relational DB.
* **Audit-friendly**: All entities have timestamps and can be queried for historical data.

---

### **Design Principles**

1. **Microservice Decoupling**: Attendance records are self-contained; references to students, teachers, and subjects are via UUIDs.
2. **AI Integration**: Recognized attendance and logs stored separately for analysis.
3. **Scalability**: Attendance tables indexed by `class_id`, `subject_id`, and `date` for fast querying.
4. **Extensibility**: Easy to add new attendance statuses, multi-class sessions, or additional AI metrics.

---