-- DropForeignKey
ALTER TABLE "business_details" DROP CONSTRAINT "business_details_userId_fkey";

-- AddForeignKey
ALTER TABLE "business_details" ADD CONSTRAINT "business_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
