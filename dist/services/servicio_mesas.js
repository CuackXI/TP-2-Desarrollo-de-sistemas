"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioMesa = void 0;
const index_1 = require("../index");
class ServicioMesa {
    static obtener_mesas() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.mesa.findMany();
        });
    }
    static esta_mesa_disponible(idMesa, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield index_1.prisma.reserva.findMany({
                where: {
                    mesaId: idMesa,
                    fecha: fecha,
                },
            });
            return reservas.length === 0;
        });
    }
    static crear_mesa(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.mesa.create({
                data: {
                    numero: datos.numero,
                    disponible: datos.disponible,
                },
            });
        });
    }
    static eliminar_mesa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.mesa.delete({
                where: { id },
            });
        });
    }
}
exports.ServicioMesa = ServicioMesa;
