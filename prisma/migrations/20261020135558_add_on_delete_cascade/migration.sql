-- DropForeignKey
ALTER TABLE "contract" DROP CONSTRAINT "contract_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_clientId_fkey";

-- DropForeignKey
ALTER TABLE "playlist" DROP CONSTRAINT "playlist_eventId_fkey";

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist" ADD CONSTRAINT "playlist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
