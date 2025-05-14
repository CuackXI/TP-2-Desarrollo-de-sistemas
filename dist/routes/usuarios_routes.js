"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios_controller");
const usuariosRoutes = (0, express_1.Router)();
usuariosRoutes.get('/', usuarios_controller_1.getUsuarios);
usuariosRoutes.delete('/:id', usuarios_controller_1.eliminarUsuario);
exports.default = usuariosRoutes;
