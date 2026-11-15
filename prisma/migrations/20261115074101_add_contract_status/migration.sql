-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('Draft', 'Sent', 'Signed', 'Accepted', 'Cancelled');

-- AlterTable
ALTER TABLE "contract" ADD COLUMN     "status" "ContractStatus" NOT NULL DEFAULT 'Draft';
