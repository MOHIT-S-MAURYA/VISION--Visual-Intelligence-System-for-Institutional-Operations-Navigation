### Analytics Service – Component Diagram (PlantUML)

**Internal Components**

| Component                           | Responsibility                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| **API Gateway Adapter**             | Exposes REST endpoints for dashboards, reports, and analytics queries.                        |
| **Analytics Controller**            | Entry point for requests; orchestrates report generation and KPI retrieval.                   |
| **Data Aggregation Engine**         | Collects events from other services (Attendance, AI, Notification) and processes them.        |
| **Metrics & KPI Calculator**        | Computes metrics like attendance percentage, recognition accuracy, notification success rate. |
| **Reporting Engine**                | Generates detailed reports (PDF/CSV) for admins and teachers.                                 |
| **Visualization Adapter**           | Formats data for frontend dashboards or graphs.                                               |
| **Analytics Repository**            | Stores processed and aggregated metrics.                                                      |
| **Event Consumer / Queue Listener** | Listens to events published by other services asynchronously.                                 |

**External Systems**

* **PostgreSQL / OLAP DB**: Stores aggregated data and historical metrics.
* **Other Microservices APIs**: Attendance, AI, Notification, User, Department—emit events or provide data on request.
* **Dashboard / Frontend**: Consumes analytics endpoints to display insights.

---

### 🔑 Notes

1. **Event-Driven Design**:

   * Uses a queue or message broker (Kafka, RabbitMQ) to asynchronously process events from other services.
   * Prevents overloading transactional services with heavy analytical queries.

2. **Scalability & Extensibility**:

   * Aggregation engine can scale independently for high event throughput.
   * Easy to add new KPIs or integrate additional services in the future.

3. **Decoupled Visualization**:

   * Dashboard rendering is separated from metric calculation, allowing multiple frontend apps (web, mobile).

---