import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { authController } from "../controllers/auth.controller";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .post(
    "/register",
    async ({ body, set }) => {
      return authController.register(body, set);
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
      detail: {
        tags: ["auth"],
        summary: "Register new user",
        description: "Create a new user account with email and password",
      },
    }
  )
  .post(
    "/login",
    async ({ body, set, jwt }) => {
      return authController.login(body, set, jwt);
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
      detail: {
        tags: ["auth"],
        summary: "Login user",
        description: "Authenticate user and return JWT token",
      },
    }
  );
