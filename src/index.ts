import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Elysia();

// Swagger Configuration
app.use(
  swagger({
    documentation: {
      info: {
        title: "Akademi Clipper LMS API",
        version: "1.0",
        description:
          "Backend API for Learning Management System focused on video editing and content creation education.",
      },
      tags: [
        { name: "auth", description: "Authentication endpoints" },
        { name: "courses", description: "Course management endpoints" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Enter your JWT token in the format: Bearer {token}",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  })
);

// JWT Configuration
app.use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET!,
  })
);

// Authentication Routes
app.group("/auth", (app) =>
  app
    .post(
      "/register",
      async ({ body, set }) => {
        const { email, password, name, role } = body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          set.status = 400;
          return { error: "User with this email already exists" };
        }

        // Hash password
        const hashedPassword = await Bun.password.hash(password);

        // Create user
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
            role: role || "STUDENT",
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
          },
        });

        return {
          message: "User registered successfully",
          user,
        };
      },
      {
        body: t.Object({
          email: t.String({ format: "email" }),
          password: t.String({ minLength: 6 }),
          name: t.Optional(t.String()),
          role: t.Optional(
            t.Enum({
              STUDENT: "STUDENT",
              INSTRUCTOR: "INSTRUCTOR",
              ADMIN: "ADMIN",
            })
          ),
        }),
      }
    )
    .post(
      "/login",
      async ({ body, set, jwt }) => {
        const { email, password } = body;

        // Find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          set.status = 401;
          return { error: "Invalid email or password" };
        }

        // Verify password
        const isPasswordValid = await Bun.password.verify(
          password,
          user.password
        );

        if (!isPasswordValid) {
          set.status = 401;
          return { error: "Invalid email or password" };
        }

        // Generate JWT token
        const token = await jwt.sign({
          id: user.id,
          role: user.role,
          name: user.name,
        });

        return {
          message: "Login successful",
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      },
      {
        body: t.Object({
          email: t.String({ format: "email" }),
          password: t.String(),
        }),
      }
    )
);

// Course Management Routes with JWT Protection
app.group("/courses", (app) =>
  app
    .derive(async ({ headers, set, jwt }) => {
      const authorization = headers.authorization;

      if (!authorization || !authorization.startsWith("Bearer ")) {
        set.status = 401;
        throw new Error("Unauthorized: Missing or invalid token");
      }

      const token = authorization.slice(7);
      const payload = await jwt.verify(token);

      if (!payload) {
        set.status = 401;
        throw new Error("Unauthorized: Invalid token");
      }

      return {
        user: payload as { id: number; role: string; name: string },
      };
    })
    .get("/", async () => {
      const courses = await prisma.course.findMany({
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return {
        message: "Courses retrieved successfully",
        courses,
      };
    })
    .post(
      "/",
      async ({ body, user, set }) => {
        if (user.role !== "INSTRUCTOR") {
          set.status = 403;
          return { error: "Forbidden: Only instructors can create courses" };
        }

        const course = await prisma.course.create({
          data: {
            title: body.title,
            description: body.description,
            price: body.price,
            instructorId: user.id,
          },
          include: {
            instructor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        return {
          message: "Course created successfully",
          course,
        };
      },
      {
        body: t.Object({
          title: t.String(),
          description: t.Optional(t.String()),
          price: t.Number({ minimum: 0 }),
        }),
      }
    )
    .post(
      "/:id/enroll",
      async ({ params, user, set }) => {
        if (user.role !== "STUDENT") {
          set.status = 403;
          return { error: "Forbidden: Only students can enroll in courses" };
        }

        const courseId = parseInt(params.id);

        // Check if course exists
        const course = await prisma.course.findUnique({
          where: { id: courseId },
        });

        if (!course) {
          set.status = 404;
          return { error: "Course not found" };
        }

        // Check if already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
          where: {
            userId_courseId: {
              userId: user.id,
              courseId: courseId,
            },
          },
        });

        if (existingEnrollment) {
          set.status = 400;
          return { error: "Already enrolled in this course" };
        }

        // Create enrollment
        const enrollment = await prisma.enrollment.create({
          data: {
            userId: user.id,
            courseId: courseId,
          },
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                price: true,
              },
            },
          },
        });

        return {
          message: "Successfully enrolled in course",
          enrollment,
        };
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    )
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
