-- CreateEnum
CREATE TYPE "ShiftStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "status" "ShiftStatus" NOT NULL DEFAULT E'ACTIVE';
