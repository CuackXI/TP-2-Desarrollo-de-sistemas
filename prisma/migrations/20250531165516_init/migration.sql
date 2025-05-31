/*
  Warnings:

  - Added the required column `numero` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Mesa" ("disponible", "id") SELECT "disponible", "id" FROM "Mesa";
DROP TABLE "Mesa";
ALTER TABLE "new_Mesa" RENAME TO "Mesa";
CREATE UNIQUE INDEX "Mesa_numero_key" ON "Mesa"("numero");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
