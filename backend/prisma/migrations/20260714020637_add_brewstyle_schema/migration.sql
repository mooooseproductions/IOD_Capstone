/*
  Warnings:

  - You are about to drop the column `style` on the `BrewRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BrewRecord" DROP COLUMN "style",
ADD COLUMN     "styleId" INTEGER,
ADD COLUMN     "temperature" INTEGER,
ADD COLUMN     "temperatureUnit" TEXT;

-- CreateTable
CREATE TABLE "ToBrewList" (
    "id" SERIAL NOT NULL,
    "brewId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ToBrewList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewStyle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BrewStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ToBrewList_userId_brewId_key" ON "ToBrewList"("userId", "brewId");

-- AddForeignKey
ALTER TABLE "BrewRecord" ADD CONSTRAINT "BrewRecord_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "BrewStyle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToBrewList" ADD CONSTRAINT "ToBrewList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToBrewList" ADD CONSTRAINT "ToBrewList_brewId_fkey" FOREIGN KEY ("brewId") REFERENCES "BrewRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
