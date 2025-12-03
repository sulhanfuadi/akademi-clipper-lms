# 🎬 Akademi Clipper LMS

A modern **Learning Management System (LMS)** backend API specifically designed for **video editing and content creation education**. Built with cutting-edge technologies for optimal performance and developer experience.

---

## 📖 Description

**Akademi Clipper LMS** is a comprehensive backend API that powers an online learning platform focused on video editing, clipping, and content creation skills. The platform enables instructors to create and manage courses while students can browse and enroll in courses that match their learning goals.

From beginner-friendly mobile editing with **CapCut** to professional-grade workflows with **Adobe Premiere Pro** and **After Effects**, Akademi Clipper LMS provides the infrastructure for comprehensive video editing education.

### 🎯 Key Highlights

- 🚀 **High Performance** - Built with Bun runtime (up to 4x faster than Node.js)
- 🔒 **Secure** - JWT authentication with role-based access control
- 📚 **Type-Safe** - End-to-end type safety with TypeScript and Prisma
- 🌐 **Production Ready** - Deployed on Vercel with serverless PostgreSQL
- 📖 **Well Documented** - Interactive Swagger UI for API exploration
- 🎓 **Education Focused** - 18 pre-seeded courses for video editing

---

## 🌐 Live Demo

**Production URL:** [https://akademi-clipper-lms.vercel.app](https://akademi-clipper-lms.vercel.app)

**API Documentation (Swagger):** [https://akademi-clipper-lms.vercel.app/swagger](https://akademi-clipper-lms.vercel.app/swagger)

### Quick Test Credentials

| Role           | Email                      | Password      |
| -------------- | -------------------------- | ------------- |
| **Admin**      | `admin@clipper.com`        | `admin123`    |
| **Instructor** | `ridwan.hanif@clipper.com` | `password123` |
| **Student**    | `andi.wijaya@student.com`  | `password123` |

---

## 🚀 Tech Stack

| Technology                                                    | Description                        | Version |
| ------------------------------------------------------------- | ---------------------------------- | ------- |
| **[Bun](https://bun.sh/)**                                    | Fast all-in-one JavaScript runtime | 1.3.x   |
| **[ElysiaJS](https://elysiajs.com/)**                         | Ergonomic web framework            | 1.4.x   |
| **[Prisma ORM](https://www.prisma.io/)**                      | Next-generation TypeScript ORM     | 7.0.x   |
| **[PostgreSQL](https://www.postgresql.org/)**                 | Relational database                | Latest  |
| **[Neon](https://neon.tech/)**                                | Serverless Postgres                | Cloud   |
| **[@elysiajs/jwt](https://elysiajs.com/plugins/jwt)**         | JWT authentication plugin          | 1.4.x   |
| **[@elysiajs/swagger](https://elysiajs.com/plugins/swagger)** | OpenAPI documentation              | 1.3.x   |
| **[Vercel](https://vercel.com/)**                             | Serverless deployment platform     | Latest  |

---

## ✨ Features

### 🔐 **Authentication & Authorization**

- ✅ User registration with email/password
- ✅ Secure password hashing with Bun's native crypto (`Bun.password.hash`)
- ✅ JWT-based stateless authentication
- ✅ Role-Based Access Control (RBAC)
- ✅ Protected routes with middleware

### 👥 **User Roles**

| Role           | Capabilities                                                  |
| -------------- | ------------------------------------------------------------- |
| **ADMIN**      | Full system access, manage all users/courses/enrollments      |
| **INSTRUCTOR** | Create & manage courses, view enrollments, update own courses |
| **STUDENT**    | Browse courses, enroll/unenroll, view own enrollments         |

### 📚 **Course Management (CRUD)**

- ✅ Create courses (Instructor only)
- ✅ Browse all courses (All authenticated users)
- ✅ Update courses (Owner or Admin)
- ✅ Delete courses (Owner or Admin)
- ✅ View course details with enrollment count
- ✅ Instructor-specific course listing

### 🎓 **Enrollment System (CRUD)**

- ✅ Enroll in courses (Student only)
- ✅ View enrolled courses (Student)
- ✅ Unenroll from courses (Student)
- ✅ View course enrollments (Instructor/Admin)
- ✅ Duplicate enrollment prevention
- ✅ Enrollment tracking and history

### 👤 **User Management (CRUD)**

- ✅ View all users (Admin only)
- ✅ Get user by ID (Own profile or Admin)
- ✅ Update user profile (Own profile or Admin)
- ✅ Delete user (Admin only)
- ✅ View user statistics (courses created, enrollments)

### 📊 **Additional Features**

- ✅ Comprehensive API documentation with **Swagger UI**
- ✅ Type-safe request/response validation
- ✅ Professional error handling
- ✅ Database relationships and constraints
- ✅ Seeded data (21 users, 18 courses, 56+ enrollments)
- ✅ Deployed on Vercel with Bun runtime

---

## 🛠️ Local Development Setup

### Prerequisites

- **[Bun](https://bun.sh/)** v1.0 or higher
- **PostgreSQL** database (or [Neon](https://neon.tech/) account)
- **Git**

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/sulhanfuadi/akademi-clipper-lms.git
cd akademi-clipper-lms

# 2. Install dependencies
bun install

# 3. Configure environment variables
# Create .env file (see .env.example)
cp .env.example .env
# Edit .env with your database credentials

# 4. Generate Prisma Client
bun run db:generate

# 5. Run database migrations
bun run db:migrate

# 6. Seed the database (optional, recommended for testing)
bun run db:seed

# 7. Start the development server
bun run dev
```

The API will be available at `http://localhost:3000`

### Environment Variables

Create a .env file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET="your-secret-key-here"
```

---

## 📚 API Documentation

### Swagger UI (Interactive)

Open your browser and visit:

```
http://localhost:3000/swagger
```

Or visit the **live production** version:

```
https://akademi-clipper-lms.vercel.app/swagger
```

The Swagger interface provides:

- 📖 Complete endpoint documentation
- 🧪 Interactive API testing
- 🔑 Authentication flow examples
- 📊 Request/response schemas
- ✅ Example payloads

---

## 🔑 API Endpoints Summary

### **Authentication** (`/auth`) - 2 endpoints

| Method | Endpoint         | Description                 | Auth | Role |
| ------ | ---------------- | --------------------------- | ---- | ---- |
| POST   | `/auth/register` | Register a new user         | ❌   | -    |
| POST   | `/auth/login`    | Login and receive JWT token | ❌   | -    |

### **Users** (users) - 5 endpoints

| Method | Endpoint          | Description         | Auth | Role           |
| ------ | ----------------- | ------------------- | ---- | -------------- |
| GET    | users             | Get all users       | ✅   | ADMIN          |
| GET    | `/users/:id`      | Get user by ID      | ✅   | Owner or ADMIN |
| PUT    | `/users/:id`      | Update user         | ✅   | Owner or ADMIN |
| DELETE | `/users/:id`      | Delete user         | ✅   | ADMIN          |
| GET    | `/users/me/stats` | Get user statistics | ✅   | All            |

### **Courses** (`/courses`) - 6 endpoints

| Method | Endpoint              | Description              | Auth | Role           |
| ------ | --------------------- | ------------------------ | ---- | -------------- |
| GET    | `/courses`            | Get all courses          | ✅   | All            |
| GET    | `/courses/:id`        | Get course by ID         | ✅   | All            |
| GET    | `/courses/my-courses` | Get instructor's courses | ✅   | INSTRUCTOR     |
| POST   | `/courses`            | Create a new course      | ✅   | INSTRUCTOR     |
| PUT    | `/courses/:id`        | Update course            | ✅   | Owner or ADMIN |
| DELETE | `/courses/:id`        | Delete course            | ✅   | Owner or ADMIN |

### **Enrollments** (`/enrollments`) - 5 endpoints

| Method | Endpoint                      | Description               | Auth | Role                |
| ------ | ----------------------------- | ------------------------- | ---- | ------------------- |
| POST   | `/enrollments/enroll/:id`     | Enroll in course          | ✅   | STUDENT             |
| GET    | `/enrollments/my-enrollments` | Get student's enrollments | ✅   | STUDENT             |
| GET    | `/enrollments`                | Get all enrollments       | ✅   | INSTRUCTOR or ADMIN |
| GET    | `/enrollments/course/:id`     | Get course enrollments    | ✅   | Owner or ADMIN      |
| DELETE | `/enrollments/unenroll/:id`   | Unenroll from course      | ✅   | STUDENT             |

**Total: 18 Endpoints**

---

## 💾 Database Schema

```prisma
enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}

model User {
  id             Int          @id @default(autoincrement())
  email          String       @unique
  password       String
  name           String?
  role           Role         @default(STUDENT)
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  createdCourses Course[]     @relation("InstructorCourses")
  enrollments    Enrollment[]
}

model Course {
  id           Int          @id @default(autoincrement())
  title        String
  description  String?
  price        Float
  instructorId Int
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  instructor   User         @relation("InstructorCourses", fields: [instructorId], references: [id], onDelete: Cascade)
  enrollments  Enrollment[]
}

model Enrollment {
  id         Int      @id @default(autoincrement())
  userId     Int
  courseId   Int
  enrolledAt DateTime @default(now())
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  course     Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
}
```

### Entity Relationships

```
User (INSTRUCTOR) 1 ─── ∞ Course
User (STUDENT)    ∞ ─── ∞ Course (via Enrollment)
```

---

## 🧪 Testing with Seed Data

After running `bun run db:seed`, the database will be populated with:

- **21 Users** (1 Admin, 5 Instructors, 15 Students)
- **18 Courses** (Video editing courses)
- **56+ Enrollments** (Student enrollments)

### Sample Courses Available

- Adobe Premiere Pro untuk Pemula (Rp 299.000)
- Teknik Cutting & Timing untuk Viral Clips (Rp 349.000)
- DaVinci Resolve Complete Course (Rp 399.000)
- Mobile Video Editing dengan CapCut (Rp 199.000)
- Gaming Content Creator Bootcamp (Rp 429.000)
- After Effects untuk Video Editor (Rp 599.000)
- ...and 12 more courses

---

## 📜 Available Scripts

```bash
# Development
bun run dev              # Start dev server with hot reload

# Database
bun run db:generate      # Generate Prisma Client
bun run db:migrate       # Run database migrations
bun run db:push          # Push schema changes to database
bun run db:seed          # Seed database with test data

# Testing
bun test                 # Run tests (if configured)
```

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

This project is configured for **zero-configuration deployment** on Vercel with Bun runtime.

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Environment Variables (Vercel Dashboard)

Set these in **Project Settings → Environment Variables**:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
JWT_SECRET=your-jwt-secret-key
```

Apply to: **Production, Preview, Development**

#### Deployment Configuration

The project uses the following vercel.json:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.x",
  "buildCommand": "bun install && bunx prisma generate"
}
```

**Key Features:**

- ✅ Bun 1.x runtime (Beta)
- ✅ Automatic Prisma Client generation
- ✅ Serverless PostgreSQL (Neon)
- ✅ Zero cold starts with Fluid compute

---

## 🔒 Security Features

| Feature                      | Implementation                               | Benefit                        |
| ---------------------------- | -------------------------------------------- | ------------------------------ |
| **Password Hashing**         | `Bun.password.hash()` with bcrypt (cost: 10) | Secure password storage        |
| **JWT Authentication**       | `@elysiajs/jwt` with configurable secret     | Stateless authentication       |
| **RBAC**                     | Middleware-based role checking               | Endpoint-level authorization   |
| **Input Validation**         | Elysia's `t` schema validation               | Type-safe requests             |
| **SQL Injection Prevention** | Prisma ORM parameterized queries             | Protected against SQLi         |
| **CORS**                     | Configurable origins                         | Controlled cross-origin access |

---

## 🧪 Testing Guide

### Quick Test Flow (Swagger UI)

1. **Open Swagger:** `http://localhost:3000/swagger`
2. **Register User:** `POST /auth/register` (STUDENT, INSTRUCTOR, or ADMIN)
3. **Login:** `POST /auth/login` → Copy token
4. **Authorize:** Click 🔒 button → Paste token with `Bearer ` prefix
5. **Test Endpoints:**
   - Browse courses: `GET /courses`
   - Create course (Instructor): `POST /courses`
   - Enroll (Student): `POST /enrollments/enroll/{id}`
   - View enrollments: `GET /enrollments/my-enrollments`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style (TypeScript, ESLint)
- Write meaningful commit messages
- Add tests for new features
- Update documentation (README, Swagger comments)
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🔗 Useful Links

- **Live API:** [https://akademi-clipper-lms.vercel.app](https://akademi-clipper-lms.vercel.app)
- **Swagger Docs:** [https://akademi-clipper-lms.vercel.app/swagger](https://akademi-clipper-lms.vercel.app/swagger)
- **GitHub Repository:** [https://github.com/sulhanfuadi/akademi-clipper-lms](https://github.com/sulhanfuadi/akademi-clipper-lms)
<!-- - **Vercel Dashboard:** [https://vercel.com/sulhanfuadi/akademi-clipper-lms](https://vercel.com/sulhanfuadi/akademi-clipper-lms) -->

### External Documentation

- [Bun Documentation](https://bun.sh/docs)
- [ElysiaJS Documentation](https://elysiajs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon PostgreSQL](https://neon.tech/docs)

---

## 👨‍💻 Author

**Sulhan Fuadi**

Developed with ❤️ for aspiring video editors and content creators.

- GitHub: [@sulhanfuadi](https://github.com/sulhanfuadi)
- LinkedIn: [Sulhan Fuadi](https://linkedin.com/in/sulhanfuadi)

---

## 🙏 Acknowledgments

- **Bun Team** - For creating the fast JavaScript runtime
- **ElysiaJS Team** - For the ergonomic web framework
- **Prisma Team** - For the next-generation ORM
- **Vercel** - For serverless deployment platform
- **Neon** - For serverless PostgreSQL

---

<div align="center">

### 🎬 **Happy Learning & Coding!** ✨

**Akademi Clipper LMS** - Empowering the next generation of video editors and content creators.

---

**Made with 💙 using Bun, ElysiaJS, and Prisma**

</div>
