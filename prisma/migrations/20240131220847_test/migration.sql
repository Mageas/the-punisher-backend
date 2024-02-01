-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_school_year" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "school_year_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_school_year" ("id", "userId", "year") SELECT "id", "userId", "year" FROM "school_year";
DROP TABLE "school_year";
ALTER TABLE "new_school_year" RENAME TO "school_year";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
