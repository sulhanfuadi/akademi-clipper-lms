import { opentelemetry } from "@elysiajs/opentelemetry";
import * as Sentry from "@sentry/bun";
import { Elysia } from "elysia";

export function sentryPlugin(options?: Sentry.BunOptions) {
  // 1. Ambil DSN dari Options atau ENV
  const dsn = options?.dsn ?? process.env.SENTRY_DSN;
  if (!dsn) {
    throw new Error("Sentry DSN must be provided in .env or options");
  }

  // 2. Setup Environment (Development/Production)
  const environment =
    options?.environment ?? process.env.SENTRY_ENVIRONMENT ?? "development";

  // 3. Inisialisasi Sentry
  Sentry.init({
    dsn,
    environment,
    integrations: [Sentry.bunServerIntegration()],
    tracesSampleRate: 1.0, // Capture 100% transaksi untuk testing
    ...options,
  });

  console.log("🔎 Sentry initialized");

  // 4. Return Plugin Elysia
  return (
    new Elysia()
      .decorate("Sentry", Sentry)
      // Integrasi OpenTelemetry untuk tracing performa
      .use(opentelemetry())
      // Global Error Handler: Tangkap semua error aplikasi
      .onError({ as: "global" }, ({ error }) => {
        console.error("Capturing error to Sentry:", error);
        Sentry.captureException(error);
      })
  );
}
