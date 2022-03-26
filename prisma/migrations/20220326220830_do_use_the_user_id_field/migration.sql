/*
  Warnings:

  - You are about to drop the column `email` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_email_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
