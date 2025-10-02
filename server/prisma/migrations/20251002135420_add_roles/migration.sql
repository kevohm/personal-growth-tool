-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'guest');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "user_role" NOT NULL DEFAULT 'guest';
