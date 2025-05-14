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
exports.ServicioUsuario = void 0;
const index_1 = require("../index");
class ServicioUsuario {
    static obtener_usuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.prisma.usuario.findMany();
        });
    }
    static crear_usuario(datos) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.prisma.usuario.create({
                data: datos,
            });
        });
    }
    static eliminar_usuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.prisma.usuario.delete({
                where: { id },
            });
        });
    }
}
exports.ServicioUsuario = ServicioUsuario;
