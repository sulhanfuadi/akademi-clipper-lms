import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { enrollmentController } from "../controllers/enrollment.controller";

export const enrollmentRoutes = new Elysia({ prefix: "/enrollments" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .get(
    "/my-enrollments",
    async ({ jwt, headers, set }) => {
      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);

      try {
        const user = await jwt.verify(token);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return enrollmentController.getMyEnrollments(user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      detail: {
        tags: ["enrollments"],
        summary: "Get my enrollments (Student only)",
        description: "Get all courses enrolled by the current student",
      },
    }
  )
  .get(
    "/",
    async ({ jwt, headers, set }) => {
      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);

      try {
        const user = await jwt.verify(token);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return enrollmentController.getAllEnrollments(user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      detail: {
        tags: ["enrollments"],
        summary: "Get all enrollments",
        description:
          "Get all enrollments (Admin: all, Instructor: their courses)",
      },
    }
  )
  .get(
    "/course/:id",
    async ({ jwt, headers, set, params }) => {
      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);

      try {
        const user = await jwt.verify(token);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return enrollmentController.getCourseEnrollments(params, user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["enrollments"],
        summary: "Get course enrollments",
        description:
          "Get all enrollments for a specific course (Instructor/Admin)",
      },
    }
  )
  .post(
    "/enroll/:id",
    async ({ jwt, headers, set, params }) => {
      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);

      try {
        const user = await jwt.verify(token);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return enrollmentController.enrollCourse(params, user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["enrollments"],
        summary: "Enroll in course (Student only)",
        description: "Enroll the current student in a course",
      },
    }
  )
  .delete(
    "/unenroll/:id",
    async ({ jwt, headers, set, params }) => {
      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);

      try {
        const user = await jwt.verify(token);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return enrollmentController.unenrollCourse(params, user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["enrollments"],
        summary: "Unenroll from course (Student only)",
        description: "Remove enrollment from a course",
      },
    }
  );
