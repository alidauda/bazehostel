/*
  Warnings:

  - You are about to drop the column `CohortIDString` on the `smstudentinformation` table. All the data in the column will be lost.
  - Added the required column `CohortID` to the `smstudentinformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "smstudentinformation" DROP COLUMN "CohortIDString",
ADD COLUMN     "CohortID" VARCHAR(255) NOT NULL;
