import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { userController } from "../controllers/user.controller";

export const userRoutes = new Elysia({ prefix: "/users" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .get(
    "/me/stats",
    async ({ jwt, headers, set }) => {
      console.log("\n🔍 GET /users/me/stats");
      console.log("📍 Headers:", headers);
      console.log("📍 Authorization:", headers.authorization);

      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        console.log("❌ No Bearer token");
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);
      console.log("📍 Token:", token.substring(0, 30) + "...");

      try {
        const user = await jwt.verify(token);
        console.log("✅ User verified:", user);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return userController.getUserStats(user, set);
      } catch (error) {
        console.error("❌ JWT error:", error);
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      detail: {
        tags: ["users"],
        summary: "Get my statistics",
        description: "Get statistics for the current user",
      },
    }
  )
  .get(
    "/",
    async ({ jwt, headers, set }) => {
      console.log("\n🔍 GET /users");
      console.log("📍 Headers:", headers);
      console.log("📍 Authorization:", headers.authorization);

      const authorization = headers.authorization;

      if (!authorization?.startsWith("Bearer ")) {
        console.log("❌ No Bearer token");
        set.status = 401;
        return { error: "Unauthorized: Missing token" };
      }

      const token = authorization.slice(7);
      console.log("📍 Token:", token.substring(0, 30) + "...");

      try {
        const user = await jwt.verify(token);
        console.log("✅ User verified:", user);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return userController.getAllUsers(user, set);
      } catch (error) {
        console.error("❌ JWT error:", error);
        set.status = 401;
        return { error: "Unauthorized: Token verification failed" };
      }
    },
    {
      detail: {
        tags: ["users"],
        summary: "Get all users (Admin only)",
        description: "Retrieve a list of all users in the system",
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
        const user = await jwt.verify(token);

        if (!user) {
          set.status = 401;
          return { error: "Unauthorized: Invalid token" };
        }

        return userController.getUserById(params, user, set);
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
        tags: ["users"],
        summary: "Get user by ID",
        description: "Retrieve detailed information about a specific user",
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

        return userController.updateUser(params, body, user, set);
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
        name: t.Optional(t.String()),
        email: t.Optional(t.String({ format: "email" })),
      }),
      detail: {
        tags: ["users"],
        summary: "Update user",
        description: "Update user information (own profile or admin)",
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

        return userController.deleteUser(params, user, set);
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
        tags: ["users"],
        summary: "Delete user (Admin only)",
        description: "Remove a user from the system",
      },
    }
  );
