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
exports.registrarse = void 0;
const servicio_usuarios_1 = require("../services/servicio_usuarios");
const registrarse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoUsuario = yield servicio_usuarios_1.ServicioUsuario.crear_usuario(req.body);
        res.status(201).json(nuevoUsuario);
        console.log("Success!!");
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
});
exports.registrarse = registrarse;
