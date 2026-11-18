-- AlterTable
ALTER TABLE "inquiry" ADD COLUMN     "eventId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "inquiry_eventId_key" ON "inquiry"("eventId");

-- AddForeignKey
ALTER TABLE "inquiry" ADD CONSTRAINT "inquiry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

