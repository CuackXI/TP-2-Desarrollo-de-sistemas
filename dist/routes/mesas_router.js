"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mesas_controller_1 = require("../controllers/mesas_controller");
const mesasRouter = (0, express_1.Router)();
mesasRouter.get('/', mesas_controller_1.getMesas);
exports.default = mesasRouter;
