/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BrewStyle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BrewStyle_name_key" ON "BrewStyle"("name");
