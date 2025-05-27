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
    static obtener_platos_categoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.findMany({
                where: {
                    categoria: categoria,
                },
            });
        });
    }
    static crear_plato(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.prisma.plato.create({
                data: datos
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
