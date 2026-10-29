/*
  Warnings:

  - You are about to drop the column `weddingKind` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "weddingKind";

-- CreateTable
CREATE TABLE "wedding_details" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "bride" TEXT NOT NULL,
    "groom" TEXT NOT NULL,
    "brideWitness" TEXT NOT NULL,
    "groomWitness" TEXT NOT NULL,
    "brideMother" TEXT,
    "brideFather" TEXT,
    "groomMother" TEXT,
    "groomFather" TEXT,
    "weddingKind" "WeddingKind" NOT NULL,
    "ceremonyStartsAt" TIMESTAMP(3),
    "ceremonyPlace" TEXT,
    "ceremonyAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wedding_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wedding_details_eventId_key" ON "wedding_details"("eventId");

-- AddForeignKey
ALTER TABLE "wedding_details" ADD CONSTRAINT "wedding_details_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
