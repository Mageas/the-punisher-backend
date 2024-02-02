/*
  Warnings:

  - You are about to drop the `students_school_years` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "students_school_years";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_SchoolYearToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SchoolYearToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "school_year" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SchoolYearToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolYearToStudent_AB_unique" ON "_SchoolYearToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolYearToStudent_B_index" ON "_SchoolYearToStudent"("B");
