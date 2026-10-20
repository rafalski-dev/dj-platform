/*
  Warnings:

  - You are about to drop the column `note` on the `client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `contract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contractNumber]` on the table `contract` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "note";

-- AlterTable
ALTER TABLE "contract" ADD COLUMN     "contractNumber" TEXT,
ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_note" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contract_number_key" ON "contract"("number");

-- CreateIndex
CREATE UNIQUE INDEX "contract_contractNumber_key" ON "contract"("contractNumber");

-- AddForeignKey
ALTER TABLE "song" ADD CONSTRAINT "song_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_note" ADD CONSTRAINT "client_note_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
