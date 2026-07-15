/*
  Warnings:

  - Made the column `batchUnit` on table `BrewRecord` required. This step will fail if there are existing NULL values in that column.
  - Made the column `normalisedName` on table `BrewStyle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `normalisedName` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BrewRecord" ALTER COLUMN "batchUnit" SET NOT NULL;

-- AlterTable
ALTER TABLE "BrewStyle" ALTER COLUMN "normalisedName" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "normalisedName" SET NOT NULL;
