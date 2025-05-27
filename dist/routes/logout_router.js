"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logout_controller_1 = require("../controllers/logout_controller");
const session_auth_1 = require("../auth/session_auth");
const logoutRouter = (0, express_1.Router)();
logoutRouter.get('/', session_auth_1.SessionCheck.checkUserIsLogged, logout_controller_1.logout);
exports.default = logoutRouter;
