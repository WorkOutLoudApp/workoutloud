/*
  Warnings:

  - You are about to drop the column `equipment` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseSet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routineId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Routine` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseSet" DROP CONSTRAINT "ExerciseSet_routineId_fkey";

-- DropIndex
DROP INDEX "Exercise_name_key";

-- DropIndex
DROP INDEX "Routine_userId_name_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "equipment",
DROP COLUMN "target",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "routineId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Routine" ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "ExerciseSet";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
