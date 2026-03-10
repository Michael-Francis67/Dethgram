/*
  Warnings:

  - Changed the type of `ipAddress` on the `loginAttempt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "loginAttempt" DROP COLUMN "ipAddress",
ADD COLUMN     "ipAddress" INTEGER NOT NULL;
