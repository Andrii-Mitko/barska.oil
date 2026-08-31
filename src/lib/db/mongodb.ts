import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI не заданий у .env");
}

// Кешуємо з'єднання, щоб уникнути повторних підключень при hot reload у dev-режимі
let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
