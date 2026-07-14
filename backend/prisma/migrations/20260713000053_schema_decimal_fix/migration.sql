/*
  Warnings:

  - You are about to alter the column `amount` on the `BrewIngredient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `originalGravity` on the `BrewRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(4,3)`.
  - You are about to alter the column `finalGravity` on the `BrewRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(4,3)`.
  - You are about to alter the column `batchSize` on the `BrewRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "BrewIngredient" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "BrewRecord" ALTER COLUMN "originalGravity" SET DATA TYPE DECIMAL(4,3),
ALTER COLUMN "finalGravity" SET DATA TYPE DECIMAL(4,3),
ALTER COLUMN "batchSize" SET DATA TYPE DECIMAL(5,2);
