import mongoose from "mongoose";

let listenersBound = false;

export async function connectDB(uri: string, opts: { dbName?: string } = {}) {
  // Bind connection events once
  if (!listenersBound) {
    const conn = mongoose.connection;
    conn.on("connected", () => console.log("✅ MongoDB connected"));
    conn.on("disconnected", () => console.log("🔌 MongoDB disconnected"));
    conn.on("error", (err) => console.error("❌ MongoDB error:", err));
    listenersBound = true;
  }

  // If already connected or connecting, don't double-connect
  if (mongoose.connection.readyState === 1) return mongoose.connection; // connected
  if (mongoose.connection.readyState === 2) {
    await new Promise<void>((resolve, reject) => {
      mongoose.connection.once("connected", () => resolve());
      mongoose.connection.once("error", (e) => reject(e));
    });
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      // If your URI doesn’t include "/<dbName>", you can pass one here
      dbName: opts.dbName,

      // Help diagnose selection issues quickly
      serverSelectionTimeoutMS: 10_000,

      // Prefer IPv4 on some Windows/Wi-Fi/VPN setups
      family: 4,

      // For seedlist URIs (non-SRV), TLS must be on
      // tls: true,
    } as any);

    return mongoose.connection;
  } catch (err) {
    console.error(
      "❌ Failed to connect to MongoDB. Check IP allow-list, URI (URL-encoded password, db name), and network/VPN.",
      err
    );
    throw err;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

// Graceful shutdown
["SIGINT", "SIGTERM"].forEach((sig) =>
  process.on(sig as NodeJS.Signals, async () => {
    try {
      await disconnectDB();
    } finally {
      process.exit(0);
    }
  })
);
