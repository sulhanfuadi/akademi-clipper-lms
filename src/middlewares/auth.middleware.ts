import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const authMiddleware = new Elysia({ name: "auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .derive(async ({ jwt, headers, set, request }) => {
    console.log("\n========== AUTH MIDDLEWARE DEBUG ==========");
    console.log("📍 URL:", request.url);
    console.log("📍 Method:", request.method);
    console.log("📍 All Headers:", JSON.stringify(headers, null, 2));
    console.log("📍 Authorization Header:", headers.authorization);

    const authorization = headers.authorization;

    if (!authorization) {
      console.log("❌ No authorization header found!");
      console.log("==========================================\n");
      set.status = 401;
      throw new Error("Unauthorized: No authorization header");
    }

    console.log("✅ Authorization header exists");
    console.log("📍 Header value:", authorization);

    // Handle both "Bearer TOKEN" and "TOKEN" formats
    const token = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : authorization;

    console.log("📍 Token after extraction:", token.substring(0, 30) + "...");

    if (!token) {
      console.log("❌ Empty token after extraction!");
      console.log("==========================================\n");
      set.status = 401;
      throw new Error("Unauthorized: Empty token");
    }

    try {
      console.log("🔐 Attempting to verify token...");
      const payload = await jwt.verify(token);
      console.log("✅ Token verified successfully!");
      console.log("📍 Payload:", JSON.stringify(payload, null, 2));

      if (!payload) {
        console.log("❌ Payload is null/undefined!");
        console.log("==========================================\n");
        set.status = 401;
        throw new Error("Unauthorized: Invalid token");
      }

      console.log("✅ Returning user object:", payload);
      console.log("==========================================\n");

      return {
        user: payload as { id: number; role: string; name: string },
      };
    } catch (error) {
      console.log("❌ Token verification failed!");
      console.log("📍 Error:", error);
      console.log("==========================================\n");
      set.status = 401;
      throw new Error("Unauthorized: Token verification failed");
    }
  });
