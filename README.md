# 🎬 Akademi Clipper LMS

A modern **Learning Management System (LMS)** backend API specifically designed for **video editing and content creation education**. Built with cutting-edge technologies for optimal performance and developer experience.

## 📖 Description

Akademi Clipper LMS is a robust backend API that powers an online learning platform focused on video editing, clipping, and content creation skills. The platform enables instructors to create and manage courses while students can browse and enroll in courses that match their learning goals.

From beginner-friendly mobile editing with CapCut to professional-grade workflows with Adobe Premiere Pro and After Effects, Akademi Clipper LMS provides the infrastructure for comprehensive video editing education.

## 🚀 Tech Stack

- **[Bun](https://bun.sh/)** - Fast all-in-one JavaScript runtime & toolkit
- **[ElysiaJS](https://elysiajs.com/)** - Ergonomic web framework with end-to-end type safety
- **[Prisma ORM](https://www.prisma.io/)** - Next-generation TypeScript ORM
- **[PostgreSQL (Neon)](https://neon.tech/)** - Serverless Postgres database
- **[@elysiajs/jwt](https://elysiajs.com/plugins/jwt)** - JWT authentication plugin
- **[@elysiajs/swagger](https://elysiajs.com/plugins/swagger)** - OpenAPI documentation

## ✨ Features

### 🔐 Authentication & Authorization

- User registration with email/password
- Secure password hashing with Bun's native crypto
- JWT-based authentication
- Role-Based Access Control (RBAC)

### 👥 User Roles

- **ADMIN** - System administrators
- **INSTRUCTOR** - Course creators and educators
- **STUDENT** - Course learners

### 📚 Course Management

- Instructors can create and manage courses
- Students can browse available courses
- Detailed course information with pricing
- Instructor profiles linked to courses

### 🎓 Enrollment System

- Students can enroll in courses
- Duplicate enrollment prevention
- Enrollment tracking and history
- Course-student relationship management

### 📊 Additional Features

- Comprehensive API documentation with Swagger UI
- Type-safe request/response validation
- Error handling with appropriate HTTP status codes
- Database relationships and constraints

## 🛠️ Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher
- PostgreSQL database (or [Neon](https://neon.tech/) account)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd akademi-clipper-lms
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
   JWT_SECRET="your-secret-key-here"
   ```

4. **Generate Prisma Client**

   ```bash
   bun run db:generate
   ```

5. **Run database migrations**

   ```bash
   bun run db:migrate
   ```

6. **Seed the database** (optional, for development)

   ```bash
   bun run db:seed
   ```

7. **Start the development server**
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Interactive API documentation is available via **Swagger UI** at:

```
http://localhost:3000/swagger
```

The Swagger interface provides:

- Complete endpoint documentation
- Request/response schemas
- Interactive API testing
- Authentication flow examples

## 🔑 API Endpoints

### Authentication (`/auth`)

| Method | Endpoint         | Description                 | Auth Required |
| ------ | ---------------- | --------------------------- | ------------- |
| POST   | `/auth/register` | Register a new user         | ❌            |
| POST   | `/auth/login`    | Login and receive JWT token | ❌            |

### Courses (`/courses`)

| Method | Endpoint              | Description         | Auth Required | Role       |
| ------ | --------------------- | ------------------- | ------------- | ---------- |
| GET    | `/courses`            | Get all courses     | ✅            | All        |
| POST   | `/courses`            | Create a new course | ✅            | INSTRUCTOR |
| POST   | `/courses/:id/enroll` | Enroll in a course  | ✅            | STUDENT    |

## 💾 Database Schema

```prisma
enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}

model User {
  id             Int           @id @default(autoincrement())
  email          String        @unique
  password       String
  name           String?
  role           Role          @default(STUDENT)
  createdCourses Course[]
  enrollments    Enrollment[]
}

model Course {
  id           Int          @id @default(autoincrement())
  title        String
  description  String?
  price        Float
  instructorId Int
  instructor   User
  enrollments  Enrollment[]
}

model Enrollment {
  id         Int      @id @default(autoincrement())
  userId     Int
  courseId   Int
  enrolledAt DateTime @default(now())

  @@unique([userId, courseId])
}
```

## 🧪 Testing with Seed Data

After running `bun run db:seed`, you can use these test credentials:

### Admin

- Email: `admin@clipper.com`
- Password: `admin123`

### Instructors

- `ridwan.hanif@clipper.com` / `password123` (Adobe Premiere Pro Specialist)
- `sarah.kusuma@clipper.com` / `password123` (DaVinci Resolve Expert)
- `agung.pratama@clipper.com` / `password123` (Mobile Editing Master)
- `dinda.maharani@clipper.com` / `password123` (Gaming Content Specialist)
- `fajar.ramadhan@clipper.com` / `password123` (After Effects Expert)

### Students

- `andi.wijaya@student.com` / `password123`
- `bella.putri@student.com` / `password123`
- `charlie.santoso@student.com` / `password123`
- _...and 12 more students_

## 📜 Available Scripts

```bash
# Development
bun run dev              # Start dev server with hot reload

# Database
bun run db:generate      # Generate Prisma Client
bun run db:migrate       # Run database migrations
bun run db:push          # Push schema changes to database
bun run db:seed          # Seed database with test data

# Seeding
bun run seed             # Run seed script directly
```

## 🔒 Security Features

- **Password Hashing**: Uses Bun's native `Bun.password.hash()` for secure password storage
- **JWT Authentication**: Stateless authentication with configurable secret
- **Role-Based Access Control**: Endpoint-level authorization
- **Input Validation**: Type-safe request validation with Elysia's `t` schema
- **SQL Injection Prevention**: Prisma ORM's parameterized queries

## 🏗️ Project Structure

```
akademi-clipper-lms/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Database seed script
├── src/
│   └── index.ts            # Main application file
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md              # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed with ❤️ for aspiring video editors and content creators.

---

**Happy Learning! 🎬✨**
