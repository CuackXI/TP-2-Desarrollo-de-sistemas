"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservas_controller_1 = require("../controllers/reservas_controller");
const session_auth_1 = require("../auth/session_auth");
const reservasRouter = (0, express_1.Router)();
reservasRouter.get('/', session_auth_1.SessionCheck.checkUserIsAdmin, reservas_controller_1.getReservas);
reservasRouter.delete('/:id', session_auth_1.SessionCheck.checkUserIsAdmin, reservas_controller_1.eliminarReserva);
exports.default = reservasRouter;
