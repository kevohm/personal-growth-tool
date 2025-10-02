import { User } from "@prisma/client"; // or your custom User type

declare global {
  namespace Express {
    export interface Request {
      user?: Pick<User, "id" | "email" | "name" | "role">; 
      // keep it minimal for security, or just `any` if you don’t want strict types
    }
  }
}
