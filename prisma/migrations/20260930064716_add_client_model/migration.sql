/*
  Warnings:

  - The values [Inguiry,Fullfilled] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "Gender" AS ENUM ('Female', 'Male', 'Other');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- AlterEnum (zmiana nazw wartości zamiast tworzenia nowego typu)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
             WHERE t.typname = 'EventStatus' AND e.enumlabel = 'Inguiry') THEN
    ALTER TYPE "EventStatus" RENAME VALUE 'Inguiry' TO 'Inquiry';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
             WHERE t.typname = 'EventStatus' AND e.enumlabel = 'Fullfilled') THEN
    ALTER TYPE "EventStatus" RENAME VALUE 'Fullfilled' TO 'Fulfilled';
  END IF;
END $$;

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clientId_fkey";

-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'Inquiry',
    "phone" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "guestCount" INTEGER,
    "notes" TEXT,
    "partner1Name" TEXT,
    "partner2Name" TEXT,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_userId_key" ON "client"("userId");

-- CreateIndex
CREATE INDEX "event_clientId_idx" ON "event"("clientId");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
