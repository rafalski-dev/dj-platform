/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `event` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventPlace` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "date",
DROP COLUMN "place",
DROP COLUMN "type",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventPlace" TEXT NOT NULL,
ADD COLUMN     "eventType" "EventType" NOT NULL;
