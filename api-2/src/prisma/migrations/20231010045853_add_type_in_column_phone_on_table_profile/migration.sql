/*
  Warnings:

  - Made the column `phone` on table `user_profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "phone" SET NOT NULL;
