-- Rename column in place so existing rows keep their region
ALTER TABLE "client" RENAME COLUMN "state" TO "region";
