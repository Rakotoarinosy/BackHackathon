/*
  Warnings:

  - You are about to drop the column `typeBusId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserBus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTypeBus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBus" DROP CONSTRAINT "UserBus_busId_fkey";

-- DropForeignKey
ALTER TABLE "UserBus" DROP CONSTRAINT "UserBus_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTypeBus" DROP CONSTRAINT "UserTypeBus_typeBusId_fkey";

-- DropForeignKey
ALTER TABLE "UserTypeBus" DROP CONSTRAINT "UserTypeBus_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeBusId";

-- DropTable
DROP TABLE "UserBus";

-- DropTable
DROP TABLE "UserTypeBus";
