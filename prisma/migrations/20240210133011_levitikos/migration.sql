/*
  Warnings:

  - You are about to drop the `TypeBusImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TypeBusImage" DROP CONSTRAINT "TypeBusImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "TypeBusImage" DROP CONSTRAINT "TypeBusImage_typeBusId_fkey";

-- DropTable
DROP TABLE "TypeBusImage";
