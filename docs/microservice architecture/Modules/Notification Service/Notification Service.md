### Notification Service – Component Diagram (PlantUML)

**Internal Components**

| Component                   | Responsibility                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| **API Gateway Adapter**     | Exposes REST endpoints for sending notifications and managing templates.                    |
| **Notification Controller** | Entry point for external requests (e.g., Attendance Service sending low-attendance alerts). |
| **Notification Manager**    | Orchestrates processing, applies rules, decides delivery channel.                           |
| **Template Engine**         | Handles dynamic templates for emails/SMS/push.                                              |
| **Queue & Scheduler**       | Asynchronous delivery, retries, and scheduling future notifications.                        |
| **Delivery Handler**        | Sends messages via external gateways.                                                       |
| **Logging & Metrics**       | Tracks success/failure, delivery times, and channel metrics.                                |

**External Systems**

* **Email Gateway (SMTP/SES)**: Sends transactional or alert emails.
* **SMS Gateway (Twilio/Nexmo)**: Sends SMS notifications.
* **Push Notification Gateway**: Sends mobile push notifications.
* **Analytics Service API**: Logs delivery stats and success rates for dashboards.

---

### 🔑 Notes

1. **Asynchronous & Reliable**:

   * Queues allow retrying failed deliveries.
   * Supports scheduling messages (e.g., reminders).

2. **Scalability**:

   * Can horizontally scale the Delivery Handler independently.
   * Handles spikes when sending bulk notifications.

3. **Extensibility**:

   * New channels (WhatsApp, Slack) can be added by creating new Delivery Handlers.
   * Templates can be extended without redeploying the service.

---
