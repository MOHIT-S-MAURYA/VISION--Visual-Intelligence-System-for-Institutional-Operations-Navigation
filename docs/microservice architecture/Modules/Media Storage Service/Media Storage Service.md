### Media / Storage Service 

**Internal Components**

| Component                     | Responsibility                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------- |
| **API Gateway Adapter**       | Exposes endpoints for uploading, downloading, deleting, and querying media.      |
| **Media Controller**          | Entry point; orchestrates media requests and responses.                          |
| **Upload Manager**            | Handles incoming files, validates formats, and coordinates preprocessing.        |
| **Download Manager**          | Handles secure retrieval of media, enforces access control.                      |
| **Preprocessing Engine**      | Performs resizing, compression, alignment, and format conversion before storage. |
| **Storage Manager**           | Interfaces with object storage (S3/MinIO) for persistent media storage.          |
| **Metadata Repository**       | Stores media metadata (owner, timestamps, file paths, usage).                    |
| **Access Control & Security** | Generates signed URLs, enforces role-based access for uploads/downloads.         |
| **Logging & Metrics**         | Tracks usage, uploads/downloads, errors, and performance for analytics.          |

**External Systems**

* **Object Storage (S3 / MinIO)**: Stores all binary media files.
* **PostgreSQL Media Metadata DB**: Stores structured metadata about each media asset.
* **AI / Computer Vision Service API**: Fetches images for training or recognition.
* **User Service API**: Fetches profile images for students or teachers.
* **Attendance Service API**: Stores classroom photos for attendance verification/audit.
* **Analytics Service API**: Collects metrics about media operations.

---

### 🔑 Notes

1. **Scalability**

   * Object storage allows independent scaling for large volume of images.
   * Upload/Download managers can be horizontally scaled.

2. **Security**

   * Role-based access control ensures only authorized users/services can fetch or modify media.
   * Signed URLs prevent direct public access to storage.

3. **Integration with AI**

   * Provides preprocessed images directly to AI/Computer Vision service for embedding generation.
   * Stores historical classroom images for auditing and retraining models.

4. **Extensibility**

   * Future-proof for videos, bulk uploads, or multi-resolution storage.
   * Can integrate CDN for faster media delivery.

---
