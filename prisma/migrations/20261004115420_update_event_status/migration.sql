/*
  Warnings:

  - The values [Inquiry,Confirmed,Fulfilled] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('Pending', 'Active', 'Completed', 'Cancelled', 'Archived');
ALTER TABLE "public"."event" ALTER COLUMN "eventStatus" DROP DEFAULT;
ALTER TABLE "event" ALTER COLUMN "eventStatus" TYPE "EventStatus_new" USING ("eventStatus"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "public"."EventStatus_old";
ALTER TABLE "event" ALTER COLUMN "eventStatus" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "eventStatus" SET DEFAULT 'Pending';
