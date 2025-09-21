### 3️⃣ Attendance Service

**Internal Components**

| Component                     | Responsibility                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------- |
| **API Gateway Adapter**       | Exposes attendance REST endpoints (mark, edit, view).                            |
| **Attendance Controller**     | Handles incoming requests and orchestrates the process.                          |
| **Attendance Manager**        | Core business logic for attendance marking and edits.                            |
| **Validation & Rules Engine** | Ensures rules like "no double marking" or "only teachers can edit" are enforced. |
| **Attendance Repository**     | Data access layer to interact with PostgreSQL Attendance DB.                     |
| **Event Publisher**           | Publishes events (e.g., to Notification or Analytics services) asynchronously.   |

**External Interactions**

* **PostgreSQL Attendance DB**: Stores attendance records with timestamps and edit history.
* **AI/Computer Vision Service API**: For automatic recognition of students from classroom images.
* **User Service API**: To validate student/teacher identities.
* **Department Service API**: To retrieve class and department structure.
* **Notification Service API**: To alert students or teachers of attendance issues.
* **Analytics Service API**: To provide aggregated attendance metrics.

---
