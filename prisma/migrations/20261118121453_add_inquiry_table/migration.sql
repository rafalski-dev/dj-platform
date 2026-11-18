-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('New', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "inquiry" (
    "id" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'New',
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "type" "EventType" NOT NULL,
    "place" TEXT,
    "message" TEXT NOT NULL,
    "termsAcceptedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inquiry_date_idx" ON "inquiry"("date");

-- CreateIndex
CREATE INDEX "inquiry_status_idx" ON "inquiry"("status");
