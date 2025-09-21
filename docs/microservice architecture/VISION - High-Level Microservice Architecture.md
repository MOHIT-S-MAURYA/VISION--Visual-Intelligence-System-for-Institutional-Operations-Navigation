###  High-Level Microservice Architecture – PlantUML

**Layers**

1. **Frontend / Dashboard**: React-based web UI that interacts with the API Gateway.
2. **API Gateway**: Central entry point, handles routing, authentication, and throttling.
3. **Microservices Layer**:

   * **User**: Identity and roles
   * **Department**: Departments, classes, student mapping
   * **Attendance**: Attendance marking/editing
   * **AI / Computer Vision**: Face recognition and embeddings
   * **Notification**: Email/SMS/push notifications
   * **Analytics**: KPI aggregation and dashboards
   * **Media / Storage**: Stores images and media files
4. **Databases / Storage**: Each service has its own database or storage for independent scaling.
5. **External Systems**: Gateways for messaging, notifications, and other integrations.

**Interactions**

* Attendance and AI services are tightly coupled via classroom images.
* Analytics service consumes events from multiple services asynchronously.
* Media service acts as a central store for all images used by AI, Attendance, and User services.
* Notifications are triggered asynchronously from Attendance or other services.

---
