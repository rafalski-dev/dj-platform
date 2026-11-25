-- CreateTable
CREATE TABLE "contract_settings" (
    "id" TEXT NOT NULL,
    "overtimeRate" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contract_settings_userId_key" ON "contract_settings"("userId");

-- AddForeignKey
ALTER TABLE "contract_settings" ADD CONSTRAINT "contract_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
