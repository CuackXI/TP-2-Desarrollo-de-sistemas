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
exports.getUsuarios = getUsuarios;
exports.eliminarUsuario = eliminarUsuario;
const servicio_usuarios_1 = require("../services/servicio_usuarios");
function getUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuarios = yield servicio_usuarios_1.ServicioUsuario.obtener_usuarios();
            res.json(usuarios);
        }
        catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ mensaje: 'Error al obtener usuarios' });
        }
    });
}
;
function eliminarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ mensaje: 'ID inválido' });
                return;
            }
            const usuarioEliminado = yield servicio_usuarios_1.ServicioUsuario.eliminar_usuario(id);
            res.json(usuarioEliminado);
        }
        catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ mensaje: 'Error al eliminar usuario' });
        }
    });
}
