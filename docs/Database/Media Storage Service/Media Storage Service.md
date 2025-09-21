## 7️⃣ Media / Storage Service
#### **1. MediaFile**

* **Purpose**: Central repository for all media files used in the system.
* **Key Fields**:

  * `media_id` (UUID, PK): Unique identifier for the media file.
  * `owner_id` (UUID): ID of the entity that owns the media (student, session, teacher, or other).
  * `owner_type` (ENUM): Specifies type of owner (`Student`, `ClassSession`, `Teacher`, `Other`).
  * `file_name` (VARCHAR): Original file name.
  * `file_type` (ENUM): Type of media (`Image`, `Video`, `Document`).
  * `file_size` (BIGINT): Size in bytes.
  * `storage_path` (VARCHAR): Path or URL in the storage system (e.g., AWS S3, local filesystem, or cloud bucket).
  * `uploaded_at` (TIMESTAMP): Upload timestamp.
  * `processed` (BOOLEAN): Indicates whether the media has been processed (e.g., AI recognition applied).
  * `processed_at` (TIMESTAMP): Timestamp when processing was completed.

**Notes**:

* Supports **student profile images** for AI embedding generation.
* Stores **classroom photos** used for attendance recognition.
* Can hold other types of files for documentation or reports.

---

#### **2. Student, ClassSession, Teacher**

* **Purpose**: Minimal references to link media to the relevant entity.
* **Notes**:

  * Students: profile images for AI embeddings.
  * ClassSession: classroom images for AI recognition.
  * Teacher: optionally uploads teaching materials or session-related media.

---

### **Design Highlights**

1. **Centralized Media Storage**: All images, videos, and documents are stored in one service to decouple heavy binary storage from relational databases.
2. **Integration with AI Service**: ClassSession images are fetched by AI Service for recognition jobs.
3. **Processed Flag**: Helps track which media has been analyzed by AI or other services.
4. **Extensible**: Can integrate with cloud storage (S3, GCS, Azure Blob) or local storage with scalable architecture.
5. **Security**: Media access controlled via microservice APIs with authorization and signed URLs if needed.

---

**Integration Flow**

* Student uploads profile image → Media Service stores image → AI Service generates embedding → stores embedding in FAISS + metadata in AI DB.
* Classroom photo captured → Media Service stores image → RecognitionJob in AI Service retrieves image → recognition → AttendanceService updated.
* Teachers can optionally upload session materials → Media Service stores and tracks usage.

---
