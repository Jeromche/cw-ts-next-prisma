/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `email` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_userEmail_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "userEmail",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
