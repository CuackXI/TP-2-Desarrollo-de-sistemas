"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const platos_controller_1 = require("../controllers/platos_controller");
const session_auth_1 = require("../auth/session_auth");
const platosRouter = (0, express_1.Router)();
platosRouter.post('/', session_auth_1.SessionCheck.checkUserIsAdmin, platos_controller_1.crearPlato);
platosRouter.delete('/:id', session_auth_1.SessionCheck.checkUserIsAdmin, platos_controller_1.eliminarPlato);
exports.default = platosRouter;
