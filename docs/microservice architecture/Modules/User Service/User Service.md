### 1️⃣ User Service – 

* **API Gateway Adapter**: Exposes User Service endpoints to the outside world.
* **Auth Controller**: Handles login/logout, token issuance, password reset.
* **User Management Controller**: Create/update/delete user profiles.
* **Role & Permission Manager**: Enforces RBAC.
* **Token Service**: Issues/validates JWTs or OAuth2 tokens.
* **User Repository**: Data access layer to PostgreSQL.
* **Email/SMS Handler**: Delegates outbound messages to the Notification Service.

**External Systems**

* **PostgreSQL User DB**: Stores all user & role data.
* **Notification Service API**: For OTP, password reset emails/SMS.
* **Analytics Service API**: (Optional) for logging login activity.


