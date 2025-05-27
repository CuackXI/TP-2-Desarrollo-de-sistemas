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
exports.ServicioReserva = void 0;
const index_1 = require("../index");
class ServicioReserva {
    static obtener_reservas() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.reserva.findMany();
        });
    }
    static obtener_reservas_usuario(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.reserva.findMany({
                where: {
                    usuarioId: usuarioId,
                },
            });
        });
    }
    static crear_reserva(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const reserva = yield index_1.prisma.reserva.create({
                data: datos
            });
            yield index_1.prisma.mesa.update({
                where: {
                    id: reserva.mesaId
                },
                data: {
                    disponible: false
                }
            });
            return reserva;
        });
    }
    static eliminar_reserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reserva = yield index_1.prisma.reserva.findUnique({
                where: { id },
            });
            if (!reserva) {
                throw new Error('Reserva no encontrada');
            }
            yield index_1.prisma.reserva.delete({
                where: { id },
            });
            yield index_1.prisma.mesa.update({
                where: {
                    id: (yield reserva).mesaId
                },
                data: {
                    disponible: true
                }
            });
        });
    }
}
exports.ServicioReserva = ServicioReserva;
