"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios_controller");
const session_auth_1 = require("../auth/session_auth");
const usuariosRoutes = (0, express_1.Router)();
usuariosRoutes.get('/', session_auth_1.SessionCheck.checkUserIsAdmin, usuarios_controller_1.getUsuarios);
usuariosRoutes.delete('/:id', session_auth_1.SessionCheck.checkUserIsAdmin, usuarios_controller_1.eliminarUsuario);
exports.default = usuariosRoutes;
