-- CreateTable
CREATE TABLE "business_details" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "streetAndNumber" TEXT,
    "postcode" TEXT,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_details_userId_key" ON "business_details"("userId");

-- AddForeignKey
ALTER TABLE "business_details" ADD CONSTRAINT "business_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
