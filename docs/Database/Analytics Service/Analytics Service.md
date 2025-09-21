## 6️⃣ Analytics Service

#### **1. AttendanceSummary**

* **Purpose**: Aggregates attendance per class per subject per day.
* **Key Fields**:

  * `summary_id` (UUID, PK)
  * `class_id`, `subject_id` (FK)
  * `date` (DATE)
  * `total_students`, `present_count`, `absent_count` (INT)
  * `created_at`, `updated_at` (TIMESTAMP)
* **Notes**:

  * Supports daily/weekly/monthly reports.
  * Enables dashboards for teachers and admins.

---

#### **2. StudentAttendanceStats**

* **Purpose**: Tracks attendance statistics for individual students.
* **Key Fields**:

  * `stats_id` (UUID, PK)
  * `student_id`, `class_id`, `subject_id` (FK)
  * `total_sessions`, `attended_sessions`, `absent_sessions` (INT)
  * `attendance_percentage` (FLOAT)
  * `created_at`, `updated_at` (TIMESTAMP)
* **Notes**:

  * Useful for generating student-level reports and alerts.
  * Can feed into notification system for chronic absentees.

---

#### **3. RecognitionMetrics**

* **Purpose**: Measures AI recognition performance per session.
* **Key Fields**:

  * `metrics_id` (UUID, PK)
  * `session_id` (FK to ClassSession)
  * `total_faces`, `recognized_faces`, `unrecognized_faces` (INT)
  * `average_confidence` (FLOAT)
  * `model_version_id` (FK)
  * `created_at` (TIMESTAMP)
* **Notes**:

  * Enables auditing of AI performance.
  * Supports model evaluation and continuous improvement.

---

#### **4. TeacherPerformance**

* **Purpose**: Aggregates attendance data to evaluate teacher effectiveness.
* **Key Fields**:

  * `performance_id` (UUID, PK)
  * `teacher_id`, `class_id`, `subject_id` (FK)
  * `total_sessions` (INT)
  * `avg_attendance_percentage` (FLOAT)
  * `created_at`, `updated_at` (TIMESTAMP)
* **Notes**:

  * Helps department admins and principals monitor teacher engagement.

---

#### **5. Class, Student, Teacher, Subject**

* Minimal references for analytics linking.
* Data primarily comes via **AttendanceService** and **AIService**.

---

### **Design Highlights**

1. **Aggregated Data**: Focus on summary tables for dashboards and quick reporting.
2. **Decoupled Reads**: Analytics Service can maintain its own data warehouse or materialized views to reduce load on production Attendance DB.
3. **Supports AI Metrics**: Tracks recognition confidence, unrecognized faces, and model version usage.
4. **Performance-Oriented**: Indexed by `class_id`, `subject_id`, and `date` for fast queries.
5. **Integration-Ready**: Can provide REST or GraphQL APIs for dashboards and reports.

---

**Example Use Cases**

* Principal wants overall class attendance percentage for a month → `AttendanceSummary`.
* Teacher wants student-wise attendance → `StudentAttendanceStats`.
* AI team wants recognition accuracy → `RecognitionMetrics`.
* Department admin wants teacher performance report → `TeacherPerformance`.

---