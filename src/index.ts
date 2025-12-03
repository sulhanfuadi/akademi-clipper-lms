import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { courseRoutes } from "./routes/course.routes";
import { enrollmentRoutes } from "./routes/enrollment.routes";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Akademi Clipper LMS API",
          version: "1.0",
          description:
            "Complete RESTful API for Learning Management System focused on video editing and content creation education.",
        },
        tags: [
          {
            name: "auth",
            description: "Authentication endpoints - Register and login",
          },
          {
            name: "users",
            description: "User management endpoints - CRUD operations",
          },
          {
            name: "courses",
            description: "Course management endpoints - CRUD operations",
          },
          {
            name: "enrollments",
            description:
              "Enrollment management endpoints - Student enrollments",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
              description: "Enter JWT token (without 'Bearer ' prefix)",
            },
          },
        },
      },
    })
  )
  .use(authRoutes)
  .use(userRoutes)
  .use(courseRoutes)
  .use(enrollmentRoutes)
  .get(
    "/",
    () => ({
      message: "🎬 Welcome to Akademi Clipper LMS API",
      version: "1.0",
      documentation: "/swagger",
    }),
    {
      detail: {
        tags: ["info"],
        summary: "API Info",
        description: "Get API information and documentation link",
      },
    }
  );

// LOCAL DEV: Export FIRST (NO .listen before this!)
export default app;

// LOCAL DEV: Uncomment for development
// app.listen(3000);
// console.log(`🦊 Elysia is running at localhost:3000`);
// console.log(`📚 Swagger documentation: http://localhost:3000/swagger`);
