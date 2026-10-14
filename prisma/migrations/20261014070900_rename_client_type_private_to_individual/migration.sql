-- Rename enum value in place so existing rows keep their client type
ALTER TYPE "ClientType" RENAME VALUE 'Private' TO 'Individual';
