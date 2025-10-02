import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../config";

export function signAccessToken(userId: string) {
    console.log(ACCESS_SECRET)
    return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: "3h" });
}
export function signRefreshToken(userId: string) {
    console.log(REFRESH_SECRET)
    return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "6h" });
}

export function verifyToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload & { id: string }
}