-- AlterTable
ALTER TABLE "event" RENAME COLUMN "title" TO "name";
ALTER TABLE "event" RENAME COLUMN "eventType" TO "type";
ALTER TABLE "event" RENAME COLUMN "eventStatus" TO "status";
ALTER TABLE "event" RENAME COLUMN "eventDate" TO "date";
ALTER TABLE "event" RENAME COLUMN "eventPlace" TO "place";
ALTER TABLE "event" RENAME COLUMN "eventAddress" TO "address";
ALTER TABLE "event" RENAME COLUMN "eventPackage" TO "package";

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "startsAt" SET NOT NULL,
ALTER COLUMN "endsAt" SET NOT NULL;

-- RenameIndex
ALTER INDEX "event_eventDate_idx" RENAME TO "event_date_idx";
