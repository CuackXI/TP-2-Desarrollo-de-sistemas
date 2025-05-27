"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu_controller");
const menuRouter = (0, express_1.Router)();
menuRouter.get("/", menu_controller_1.getPlatos);
exports.default = menuRouter;
