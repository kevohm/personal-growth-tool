// context.ts
import { getDb } from "./db";
import { connectDB } from "./db/mongoose";

export async function createContext() {
    await connectDB();
    const local = await getDb()

    // offline user (from RxDB)
    const user = await local.users.findOne().exec();

    return { local, user };
}
