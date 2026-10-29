-- AlterTable
ALTER TABLE "event" RENAME COLUMN "city" TO "eventAddress";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "secondPartnerName";
