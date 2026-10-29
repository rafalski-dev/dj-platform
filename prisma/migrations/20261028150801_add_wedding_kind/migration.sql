-- CreateEnum
CREATE TYPE "WeddingKind" AS ENUM ('Church', 'Civil', 'Outdoor', 'None');

-- AlterTable
ALTER TABLE "event" RENAME COLUMN "notes" TO "message";
