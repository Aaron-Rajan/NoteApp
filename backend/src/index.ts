import "dotenv/config";
import app from "./app";
import { connectDB, disconnectDB } from "./db/mongo";

const PORT = Number(process.env.PORT) || 4000;
const URI = process.env.MONGODB_URI;

if (!URI) {
  throw new Error("MONGODB_URI is not set in .env");
}

let server: import("http").Server;

(async () => {
  // If your URI doesn't include "/notes", this sets it explicitly:
  await connectDB(URI, { dbName: process.env.MONGODB_DB || "notes" });

  server = app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});

// Graceful shutdown
async function shutdown(reason: string) {
  console.log(`\n🛑 Shutting down (${reason})...`);
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  await disconnectDB();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (r) => {
  console.error("Unhandled Rejection:", r);
  shutdown("unhandledRejection");
});
process.on("uncaughtException", (e) => {
  console.error("Uncaught Exception:", e);
  shutdown("uncaughtException");
});
