/*
  Warnings:

  - You are about to drop the column `disponible` on the `Mesa` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL
);
INSERT INTO "new_Mesa" ("id", "numero") SELECT "id", "numero" FROM "Mesa";
DROP TABLE "Mesa";
ALTER TABLE "new_Mesa" RENAME TO "Mesa";
CREATE UNIQUE INDEX "Mesa_numero_key" ON "Mesa"("numero");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
