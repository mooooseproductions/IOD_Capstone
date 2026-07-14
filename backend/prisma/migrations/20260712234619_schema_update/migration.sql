/*
  Warnings:

  - Added the required column `timing` to the `BrewIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BrewIngredient" ADD COLUMN     "timing" TEXT NOT NULL;
