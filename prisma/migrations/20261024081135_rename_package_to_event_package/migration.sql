-- rename keeps the existing data (a generated migration would drop and re-add the column)
ALTER TABLE "event" RENAME COLUMN "package" TO "eventPackage";
