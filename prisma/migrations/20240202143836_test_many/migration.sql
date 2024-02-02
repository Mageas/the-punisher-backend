/*
  Warnings:

  - You are about to drop the `_SchoolYearToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SchoolYearToStudent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "students_school_years" (
    "school_yearId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    PRIMARY KEY ("school_yearId", "studentId"),
    CONSTRAINT "students_school_years_school_yearId_fkey" FOREIGN KEY ("school_yearId") REFERENCES "school_year" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "students_school_years_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
