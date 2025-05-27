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
exports.login = login;
const servicio_usuarios_1 = require("../services/servicio_usuarios");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, contraseña } = req.body;
            if (!nombre || !contraseña) {
                res.status(400).json({ mensaje: 'Nombre y contraseña son requeridos' });
            }
            try {
                const usuario = yield servicio_usuarios_1.ServicioUsuario.get_usuario_por_nombre(nombre);
                const contraseñaValida = servicio_usuarios_1.ServicioUsuario.comparar_contraseña(contraseña, usuario);
                if (!contraseñaValida) {
                    res.status(401).json({ mensaje: 'Credenciales inválidas' });
                }
                req.session.user = {
                    id: usuario.id,
                    rol: usuario.rol
                };
                res.status(201).json({ mensaje: 'Login sucsessful' });
            }
            catch (error) {
                if (error.message === 'Usuario no encontrado') {
                    res.status(401).json({ mensaje: 'Credenciales inválidas' });
                }
            }
        }
        catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ mensaje: 'Error en el servidor al procesar el login' });
        }
    });
}
