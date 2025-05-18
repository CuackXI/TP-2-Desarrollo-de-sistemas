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
    static obtener_platos() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.findMany();
        });
    }
    static obtener_platos_disponibles() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.findMany({
                where: {
                    disponible: true,
                },
            });
        });
    }
    static crear_plato(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.create({
                data: {
                    nombre: datos.nombre,
                    precio: datos.precio,
                    disponible: datos.disponible,
                },
            });
        });
    }
    static actualizar_disponibilidad(id, disponible) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.update({
                where: { id },
                data: { disponible },
            });
        });
    }
    static eliminar_plato(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.delete({
                where: { id },
            });
        });
    }
}
exports.ServicioPlato = ServicioPlato;
