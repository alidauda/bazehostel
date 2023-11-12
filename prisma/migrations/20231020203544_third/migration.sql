/*
  Warnings:

  - A unique constraint covering the columns `[EmailAddress]` on the table `smstudentinformation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "smstudentinformation_EmailAddress_key" ON "smstudentinformation"("EmailAddress");
