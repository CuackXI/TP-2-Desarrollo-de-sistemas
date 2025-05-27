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
exports.ServicioPlato = void 0;
const index_1 = require("../index");
class ServicioPlato {
    static obtener_pedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.pedido.findMany();
        });
    }
    static obtener_pedidos_usuario(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.pedido.findMany({
                where: {
                    usuarioId: usuarioId,
                },
            });
        });
    }
    static crear_pedido(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.pedido.create({
                data: {
                    usuarioId: datos.usuarioId,
                    total: datos.total,
                    descuento: datos.descuento,
                },
            });
        });
    }
    static actualizar_disponibilidad(id, estado) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.pedido.update({
                where: { id },
                data: { estado },
            });
        });
    }
    static eliminar_pedido(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.pedido.delete({
                where: { id },
            });
        });
    }
}
exports.ServicioPlato = ServicioPlato;
