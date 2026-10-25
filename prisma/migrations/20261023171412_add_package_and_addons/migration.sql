-- CreateEnum
CREATE TYPE "Package" AS ENUM ('Classic', 'Premium', 'Signature');

-- CreateEnum
CREATE TYPE "Addon" AS ENUM ('PhotoBooth', 'StageSparks', 'LiveVocalist', 'Saxophonist', 'LoveSign', 'LowFog', 'Confetti', 'ExtraDj', 'CustomNeon');

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "addons" "Addon"[],
ADD COLUMN     "package" "Package"[];
