// db/mongoose.ts
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
  }
  return mongoose;
}
