/*
  Warnings:

  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `pedidos` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `rolId` on the `Usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Rol_nombre_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rol";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "mesaId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "total" INTEGER NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PedidoPlato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER NOT NULL,
    "platoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "PedidoPlato_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidoPlato_platoId_fkey" FOREIGN KEY ("platoId") REFERENCES "Plato" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'CLIENTE'
);
INSERT INTO "new_Usuario" ("contraseña", "id", "nombre") SELECT "contraseña", "id", "nombre" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numero_key" ON "Mesa"("numero");
