# Foodio Backend API 

The robust server-side engine for the **Foodio** platform, built using **NestJS**. This API handles secure authentication, role-based access control, and menu management.

---

##  Tech Stack
- **Framework:** [NestJS](https://nestjs.com/) (Node.js)
- **Database:** PostgreSQL / MySQL (via TypeORM)
- **Security:** Passport-JWT & Bcrypt for password hashing
- **Validation:** Class-validator & Class-transformer

---

##  Installation & Setup

### 1. Install Dependencies
```bash
npm install
Create a .env file in the root of the foodio-backend directory:
Code snippet
# Database Connection
DATABASE_URL=your_database_connection_url

# Security
JWT_SECRET=your_super_secret_jwt_key

# Server Config
PORT=5000
 Execution
Database Seeding
This project includes a built-in Database Seeder. On application bootstrap, the system automatically checks for a primary administrator. If not found, it creates one with the following credentials:

Email: admin@foodio.com

Password: admin123

Run the Server
Bash
# Watch mode (Development)
npm run start:dev

# Production mode
npm run start:prod
 Key Features
Role-Based Access (RBAC): Custom Guards to protect Admin functionalities.

DTO Validation: Strict server-side validation on all incoming requests.

Persistent Sessions: Secure JWT-based stateless authentication.

CORS Configured: Pre-set to allow communication with the Foodio Frontend.

 API Endpoints (Quick Reference)
POST /auth/register - User Signup

POST /auth/login - User/Admin Login

GET /menu - Fetch all food items

POST /admin/menu - Add new items (Admin only)

GET /orders - Fetch user orders

License
This project is part of the Foodio Fullstack application.


### Final Step to Push
After saving the file, run these in your terminal to update the repository for the reviewers:

```powershell
git add .
git commit -m "docs: finalize backend specific documentation"
git push origin main
