import { createId } from "@paralleldrive/cuid2";
import { getDb } from "../../db";
import { generateGuestName } from "../../utils/format";

export const initUser = async () => {
    const userId = localStorage.getItem("currentUserId");
    const db = await getDb();

    if (userId) {
        const user = await db.users.findOne({
            selector: { id: userId },
        }).exec();

        if (user) {
            return user.toJSON();
        } else {
            // cleanup invalid id in localStorage
            localStorage.removeItem("currentUserId");
        }
    }

    return null;
};


export const signup = async (email: string, password: string, name: string) => {
    const db = await getDb();
    const existing = await db.users.findOne({ selector: { email } }).exec();
    if (existing) throw new Error("Email already in use");

    const user = await db.users.insert({
        id: createId(),
        email,
        password, // ⚠️ hash in real app
        name,
        isGuest: false,
    });
    return user;
};

export const login = async (email: string, password: string) => {
    const db = await getDb();
    const user = await db.users.findOne({ selector: { email, password } }).exec();
    if (!user) throw new Error("Invalid credentials");
    return user;
};

export const loginAsGuest = async (name: string | undefined = undefined) => {
    const db = await getDb();
    const guestName = name ?? generateGuestName();

    const guest = await db.users.insert({
        id: createId(),
        name: guestName,
        isGuest: true,
    });

    setCurrentUser(guest.id);
    return guest.toJSON();
};


export const createGuest = async (name?: string) => {
    const db = await getDb();
    const guestName = name ?? generateGuestName();

    const user = await db.users.insert({
        id: createId(),
        name: guestName,
        isGuest: true,
    });

    return user.toJSON();
};


export const logout = async () => {
    localStorage.removeItem("currentUserId");
};

export const setCurrentUser = (userId: string) => {
    localStorage.setItem("currentUserId", userId);
};

export const getCurrentUser = async () => {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return null;
    const db = await getDb();
    const userDoc = await db.users.findOne(userId).exec(); // ✅ await here

    return userDoc ? userDoc.toJSON() : null; // ✅ guard against null
};
