/*
  Warnings:

  - You are about to drop the column `numero` on the `Mesa` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "disponible" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Mesa" ("disponible", "id") SELECT "disponible", "id" FROM "Mesa";
DROP TABLE "Mesa";
ALTER TABLE "new_Mesa" RENAME TO "Mesa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
