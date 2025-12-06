import { app } from "./app";

const port = process.env.PORT ?? 3000;
const displayPort = process.env.HOST_PORT ?? port; // Untuk display di log

app.listen(port);

console.log(`🦊 Elysia is running at 0.0.0.0:${port}`);
console.log(
  `📚 Swagger documentation: http://localhost:${displayPort}/swagger`
);
console.log(`🌐 Access from host: http://localhost:${displayPort}`);
