
## 🏛️ Use-Case Diagrams (described textually)


### 1️⃣ **Principal Admin Use-Case**

```
Actor: Principal Admin
Use Cases:
 ├─ Manage Departments
 │    ├─ Create Department
 │    ├─ Edit Department
 │    └─ Delete Department
 ├─ Manage Users
 │    ├─ Create/Update/Delete Department Admin
 │    ├─ Create/Update/Delete Teacher
 │    └─ Create/Update/Delete Student
 ├─ Global Settings
 │    ├─ Define Academic Calendar
 │    ├─ Configure Attendance Rules
 │    └─ Manage Role Permissions
 ├─ Monitoring & Analytics
 │    ├─ View Institution-Wide Attendance Reports
 │    ├─ View AI Recognition Accuracy
 │    └─ Access Audit Logs
 └─ System Integration
      ├─ Manage API Keys/Integrations
      └─ Trigger System Backups
```

Relationships:

* Principal Admin is the only actor.
* “Manage Users” generalizes into sub-use cases for each user type.

---

### 2️⃣ **Department Admin Use-Case**

```
Actor: Department Admin
Use Cases:
 ├─ Manage Students
 │    ├─ Register Student
 │    ├─ Update Student Info
 │    └─ Deactivate Student
 ├─ Manage Teachers
 │    ├─ Create Teacher Account
 │    ├─ Assign Teacher to Class/Subject
 │    └─ Deactivate Teacher
 ├─ Manage Classes
 │    ├─ Define Timetable
 │    └─ Map Students to Classes
 ├─ Attendance Management
 │    ├─ View Department Attendance
 │    ├─ Edit/Correct Attendance
 │    └─ Approve Teacher Attendance Corrections
 └─ Department Reports
      ├─ Generate Department Attendance Reports
      └─ View AI Recognition Metrics
```

---

### 3️⃣ **Teacher Use-Case**

```
Actor: Teacher
Use Cases:
 ├─ Attendance Operations
 │    ├─ Initiate AI-based Attendance (photo upload/live feed)
 │    ├─ Manually Mark/Adjust Attendance
 │    └─ Submit Correction Request (if workflow requires approval)
 ├─ View Reports
 │    ├─ Class-wise Attendance Summary
 │    ├─ Student-wise Attendance Trend
 │    └─ Low Attendance Alerts
 └─ Communication
      ├─ Send Class Announcements
      └─ Review/Approve Student Leave Requests
```

---

### 4️⃣ **Student Use-Case**

```
Actor: Student
Use Cases:
 ├─ View Attendance
 │    ├─ Daily/Monthly/Semester Attendance
 │    └─ Download Attendance Certificate
 ├─ Leave Requests
 │    ├─ Submit Leave/Absence Request
 │    └─ Track Request Status
 ├─ Notifications
 │    ├─ Receive Low Attendance Alerts
 │    └─ Receive Announcements
 └─ Profile Management
      ├─ View/Update Personal Info (with admin approval)
      └─ Manage Account Security
```

---

## 📝 Sample User Stories (Agile Format)

### Principal Admin

* **As a Principal Admin**, I want to create new departments so that each department can manage its own data.
* **As a Principal Admin**, I want to view institution-wide attendance reports to analyze overall student participation.

### Department Admin

* **As a Department Admin**, I want to register students and assign them to classes so that teachers can mark their attendance.
* **As a Department Admin**, I want to approve teacher attendance corrections to maintain accurate records.

### Teacher

* **As a Teacher**, I want to upload a classroom image so that the system can automatically mark attendance using facial recognition.
* **As a Teacher**, I want to view attendance summaries to identify students with low attendance.

### Student

* **As a Student**, I want to view my monthly attendance so that I can track my attendance percentage.
* **As a Student**, I want to submit a leave request so that my absence is officially recorded.

---
