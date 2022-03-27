-- CreateEnum
CREATE TYPE "Location" AS ENUM ('AUSTRALIA', 'MEXICO', 'URUGUAY');

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "location" "Location" NOT NULL DEFAULT E'AUSTRALIA';
