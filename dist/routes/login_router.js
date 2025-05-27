"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login_controller");
const session_auth_1 = require("../auth/session_auth");
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', session_auth_1.SessionCheck.checkUserIsUnlogged, login_controller_1.login);
exports.default = loginRouter;
