"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controllers/register_controller");
const registerRoutes = (0, express_1.Router)();
registerRoutes.post('/', register_controller_1.registrarse);
exports.default = registerRoutes;
