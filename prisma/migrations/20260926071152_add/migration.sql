-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Client', 'Admin');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Wedding', 'Prom', 'Anniversary', 'Birthday_18', 'Conference', 'Corporate_Event', 'Festival', 'Other');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('Inguiry', 'Confirmed', 'Cancelled', 'Fullfilled');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Client';

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL,
    "phone" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "guestCount" INTEGER,
    "notes" TEXT,
    "partner1Name" TEXT,
    "partner2Name" TEXT,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
