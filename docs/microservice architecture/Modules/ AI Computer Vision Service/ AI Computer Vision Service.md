### 4️⃣ AI / Computer Vision Service

**Internal Components**

| Component                       | Responsibility                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| **API Gateway Adapter**         | Exposes REST/GRPC endpoints to other services (Attendance, Admin tools).                            |
| **Face Recognition Controller** | Entry point for all recognition requests (e.g., classroom images, individual student registration). |
| **Preprocessing Engine**        | Aligns, normalizes, resizes images; prepares for detection.                                         |
| **Detection Engine**            | Runs YOLOv8/MediaPipe to detect faces in images or video frames.                                    |
| **Embedding Engine**            | Converts detected faces into numerical embeddings (ArcFace, ResNet).                                |
| **FAISS Index Manager**         | Handles insert, update, search operations on embeddings.                                            |
| **Model Registry & Loader**     | Version control and hot-loading of ML models.                                                       |
| **AI Logging & Metrics**        | Tracks latency, accuracy, recognition failures, and other KPIs.                                     |

**External Systems**

* **FAISS Vector Store**: Stores embeddings for fast similarity search.
* **Media/Storage Service API**: Provides student and classroom images.
* **Attendance Service API**: Receives recognized student IDs to mark attendance.
* **User Service API**: Validates student identities and metadata.
* **Analytics Service API**: Receives AI performance metrics (optional, for dashboards).

---

### 🔑 Notes

1. **Asynchronous Processing**:

   * Face detection + embedding generation can be parallelized per image.
   * FAISS operations are very fast; can handle hundreds of students per classroom image.

2. **Scalability**:

   * Can deploy multiple instances with GPU or high-performance CPU.
   * Separate endpoints for batch recognition vs single student registration.

3. **Security & Access Control**:

   * Only Attendance Service or Admin dashboards can call recognition endpoints.
   * Images are fetched securely via Media Service using signed URLs.

4. **Extensibility**:

   * Can add new detection models or embedding networks without affecting other services.
   * Metrics engine allows monitoring for accuracy drops or model drift.

---