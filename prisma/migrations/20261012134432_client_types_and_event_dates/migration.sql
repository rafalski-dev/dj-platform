/*
  Warnings:

  - Added the required column `eventDate` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "event_startsAt_idx";

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "eventDate" DATE NOT NULL,
ALTER COLUMN "endsAt" DROP NOT NULL,
ALTER COLUMN "startsAt" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "event_eventDate_idx" ON "event"("eventDate");
