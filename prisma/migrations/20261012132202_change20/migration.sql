/*
  Warnings:

  - You are about to drop the column `endTime` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `partner1Name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `partner2Name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taxId]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientType` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endsAt` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startsAt` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('Business', 'Private');

-- AlterTable
ALTER TABLE "client" ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "clientType" "ClientType" NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "idCardNumber" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "taxId" TEXT,
ALTER COLUMN "gender" DROP NOT NULL;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "endTime",
DROP COLUMN "eventDate",
DROP COLUMN "partner1Name",
DROP COLUMN "partner2Name",
DROP COLUMN "phone",
DROP COLUMN "startTime",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "endsAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "secondPartnerName" TEXT,
ADD COLUMN     "startsAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "contract" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contract_eventId_key" ON "contract"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "playlist_eventId_key" ON "playlist"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "client_taxId_key" ON "client"("taxId");

-- CreateIndex
CREATE INDEX "event_startsAt_idx" ON "event"("startsAt");

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
