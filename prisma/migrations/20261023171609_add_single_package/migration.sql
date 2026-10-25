-- AlterTable
-- keeps the first package from the old array column
ALTER TABLE "event" ALTER COLUMN "package" SET DATA TYPE "Package" USING "package"[1],
ALTER COLUMN "package" SET NOT NULL;
