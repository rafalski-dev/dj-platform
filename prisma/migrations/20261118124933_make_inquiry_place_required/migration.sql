/*
  Warnings:

  - Made the column `place` on table `inquiry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "inquiry" ALTER COLUMN "place" SET NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;
