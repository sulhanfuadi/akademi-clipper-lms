import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { courseController } from "../controllers/course.controller";

export const courseRoutes = new Elysia({ prefix: "/courses" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .get(
    "/my-courses",
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

        return courseController.getInstructorCourses(user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      detail: {
        tags: ["courses"],
        summary: "Get my courses (Instructor only)",
        description: "Get all courses created by the current instructor",
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
        await jwt.verify(token);
        return courseController.getAllCourses();
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      detail: {
        tags: ["courses"],
        summary: "Get all courses",
        description: "Retrieve a list of all available courses",
      },
    }
  )
  .get(
    "/:id",
    async ({ jwt, headers, set, params }) => {
      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);

      try {
        await jwt.verify(token);
        return courseController.getCourseById(params, set);
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
        tags: ["courses"],
        summary: "Get course by ID",
        description: "Retrieve detailed information about a specific course",
      },
    }
  )
  .post(
    "/",
    async ({ jwt, headers, set, body }) => {
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

        return courseController.createCourse(body, user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.Optional(t.String()),
        price: t.Number({ minimum: 0 }),
      }),
      detail: {
        tags: ["courses"],
        summary: "Create course (Instructor only)",
        description: "Create a new course",
      },
    }
  )
  .put(
    "/:id",
    async ({ jwt, headers, set, params, body }) => {
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

        return courseController.updateCourse(params, body, user, set);
      } catch (error) {
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
        price: t.Optional(t.Number({ minimum: 0 })),
      }),
      detail: {
        tags: ["courses"],
        summary: "Update course (Owner or Admin)",
        description: "Update course information",
      },
    }
  )
  .delete(
    "/:id",
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

        return courseController.deleteCourse(params, user, set);
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
        tags: ["courses"],
        summary: "Delete course (Owner or Admin)",
        description: "Remove a course from the system",
      },
    }
  );
