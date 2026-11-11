/*
  Warnings:

  - You are about to drop the column `name` on the `playlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `song` table. All the data in the column will be lost.
  - Added the required column `title` to the `song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `song` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SongType" AS ENUM ('MustPlay', 'DoNotPlay', 'HighlightedMoment');

-- CreateEnum
CREATE TYPE "SongMoment" AS ENUM ('Welcoming', 'FirstDance', 'CakePresentation', 'ParentsDedication');

-- CreateEnum
CREATE TYPE "PlaylistStatus" AS ENUM ('Open', 'Locked');

-- AlterTable
ALTER TABLE "playlist" DROP COLUMN "name",
ADD COLUMN     "note" TEXT,
ADD COLUMN     "status" "PlaylistStatus" NOT NULL DEFAULT 'Open';

-- AlterTable
ALTER TABLE "song" DROP COLUMN "name",
ADD COLUMN     "artist" TEXT,
ADD COLUMN     "deezerId" TEXT,
ADD COLUMN     "moment" "SongMoment",
ADD COLUMN     "thumbnailURL" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "SongType" NOT NULL,
ADD COLUMN     "youtubeURL" TEXT;
