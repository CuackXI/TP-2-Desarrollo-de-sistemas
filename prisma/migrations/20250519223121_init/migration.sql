/*
  Warnings:

  - You are about to alter the column `total` on the `Pedido` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - Added the required column `categoria` to the `Plato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Plato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direccion` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "total" DECIMAL NOT NULL,
    "descuento" INTEGER,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedido" ("creadoEn", "estado", "id", "total", "usuarioId") SELECT "creadoEn", "estado", "id", "total", "usuarioId" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
CREATE TABLE "new_Plato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL
);
INSERT INTO "new_Plato" ("disponible", "id", "nombre", "precio") SELECT "disponible", "id", "nombre", "precio" FROM "Plato";
DROP TABLE "Plato";
ALTER TABLE "new_Plato" RENAME TO "Plato";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'CLIENTE'
);
INSERT INTO "new_Usuario" ("contraseña", "id", "nombre", "rol") SELECT "contraseña", "id", "nombre", "rol" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_nombre_key" ON "Usuario"("nombre");
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
CREATE UNIQUE INDEX "Usuario_telefono_key" ON "Usuario"("telefono");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
