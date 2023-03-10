-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_trainingId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "trainingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
