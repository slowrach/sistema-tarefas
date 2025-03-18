/*
  Warnings:

  - You are about to drop the column `description` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `logs` table. All the data in the column will be lost.
  - Added the required column `product` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "description",
ADD COLUMN     "product" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "updatedAt";
