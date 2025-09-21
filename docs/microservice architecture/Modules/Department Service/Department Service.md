### 2️⃣ Department Service 

**Internal Components**

| Component                         | Responsibility                                                            |
| --------------------------------- | ------------------------------------------------------------------------- |
| **API Gateway Adapter**           | Exposes REST endpoints for department & student operations.               |
| **Department Controller**         | Handles CRUD operations on departments (create, edit, list, delete).      |
| **Student Management Controller** | Handles CRUD operations for student profiles.                             |
| **Validation & Policy Engine**    | Centralizes business rules (e.g., unique department codes, max capacity). |
| **Department Repository**         | Data access layer for department tables.                                  |
| **Student Repository**            | Data access layer for student tables.                                     |

**External Interactions**

* **PostgreSQL Department DB**: Stores departments and student records.
* **User Service API**: Associates department admins with their user accounts.
* **Notification Service API**: Sends notifications (e.g., welcome emails to students).
* **Analytics Service API**: Tracks department-level activity.

