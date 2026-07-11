/*
  Warnings:

  - You are about to drop the `BrewIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BrewNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BrewIngredients" DROP CONSTRAINT "BrewIngredients_brewId_fkey";

-- DropForeignKey
ALTER TABLE "BrewIngredients" DROP CONSTRAINT "BrewIngredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "BrewNotes" DROP CONSTRAINT "BrewNotes_brewId_fkey";

-- DropTable
DROP TABLE "BrewIngredients";

-- DropTable
DROP TABLE "BrewNotes";

-- CreateTable
CREATE TABLE "BrewIngredient" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "unit" TEXT NOT NULL,
    "brewId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "BrewIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewNote" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "brewId" INTEGER NOT NULL,

    CONSTRAINT "BrewNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BrewIngredient" ADD CONSTRAINT "BrewIngredient_brewId_fkey" FOREIGN KEY ("brewId") REFERENCES "BrewRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewIngredient" ADD CONSTRAINT "BrewIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewNote" ADD CONSTRAINT "BrewNote_brewId_fkey" FOREIGN KEY ("brewId") REFERENCES "BrewRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
