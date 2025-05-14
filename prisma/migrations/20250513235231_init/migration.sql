/*
  Warnings:

  - Added the required column `pedidos` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Plato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,
    "pedidos" INTEGER NOT NULL,
    CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("contraseña", "id", "nombre", "rolId") SELECT "contraseña", "id", "nombre", "rolId" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
