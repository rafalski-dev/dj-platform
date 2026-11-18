-- AlterTable: split fullName into firstName + lastName, keeping existing rows
ALTER TABLE "inquiry" ADD COLUMN "firstName" TEXT,
ADD COLUMN "lastName" TEXT;

-- first word → firstName, the rest → lastName
UPDATE "inquiry"
SET "firstName" = split_part(trim("fullName"), ' ', 1),
    "lastName" = trim(substr(trim("fullName"), length(split_part(trim("fullName"), ' ', 1)) + 1));

ALTER TABLE "inquiry" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
DROP COLUMN "fullName";
