/*
  Warnings:

  - A unique constraint covering the columns `[normalisedName]` on the table `BrewStyle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[normalisedName]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BrewRecord" ADD COLUMN     "batchUnit" TEXT;

-- AlterTable
ALTER TABLE "BrewStyle" ADD COLUMN     "normalisedName" TEXT;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "normalisedName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BrewStyle_normalisedName_key" ON "BrewStyle"("normalisedName");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_normalisedName_key" ON "Ingredient"("normalisedName");
