## 5️⃣ Notification Service – ER Diagram & Schema

#### **1. Notification**

* **Purpose**: Represents individual notifications sent to users.
* **Key Fields**:

  * `notification_id` (UUID, PK): Unique identifier for the notification.
  * `recipient_id` (UUID): Links to the User receiving the notification.
  * `recipient_type` (ENUM): Indicates whether the recipient is a student, teacher, department admin, or principal admin.
  * `title` (VARCHAR): Notification title.
  * `message` (TEXT): Notification content.
  * `channel` (ENUM): Delivery channel (`Email`, `SMS`, `Push`).
  * `status` (ENUM): Current delivery status (`Pending`, `Sent`, `Failed`).
  * `created_at` / `sent_at` (TIMESTAMP): Track creation and actual sending time.
* **Relationships**:

  * Linked to **User** (recipient) and optionally linked to **NotificationTemplate** for templated messages.

**Notes**:

* Each notification is independent, allowing retries and logging.
* `status` field enables monitoring delivery success and failure.

---

#### **2. NotificationTemplate**

* **Purpose**: Defines reusable notification templates.
* **Key Fields**:

  * `template_id` (UUID, PK): Unique identifier.
  * `name` (VARCHAR): Template name (e.g., "Attendance Alert").
  * `title_template` / `message_template` (TEXT): Placeholder-based content that can be dynamically populated.
  * `channel` (ENUM): Default delivery channel for this template.
  * `created_at` / `updated_at` (TIMESTAMP): For auditing and template versioning.
* **Relationships**:

  * Notifications can reference a template to ensure consistent formatting.

**Notes**:

* Supports dynamic fields (e.g., student name, date, attendance status) using placeholders.
* Templates improve consistency and speed of notification generation.

---

#### **3. User**

* **Purpose**: Minimal user reference to link notifications to recipients.
* **Key Fields**:

  * `user_id` (UUID, PK): User identifier (from User Service).
  * `email` / `phone_number`: Contact details for delivery.
* **Notes**:

  * Full user profile is in User Service; Notification Service stores only essential contact info for delivery.

---

### **Design Highlights**

1. **Microservice Decoupling**: Notification Service operates independently. Other services (Attendance, AI, Department) trigger notifications via API or event bus.
2. **Channel-Agnostic**: Can send Email, SMS, or Push; new channels can be added later.
3. **Audit & Retry**: Status field and timestamps allow monitoring delivery and retrying failed notifications.
4. **Templating**: NotificationTemplate ensures consistent, dynamic messages without code changes.
5. **Extensibility**: Can integrate with external services like Twilio, Firebase, or SMTP servers.

---

**Integration Example**:

* Attendance Service detects a student is absent.
* Triggers Notification Service to send an alert:

  * Recipient: Student / Parent 
  * Template: “Attendance Alert”
  * Channel: Push or Email
* Notification logged and delivery status monitored.

---
