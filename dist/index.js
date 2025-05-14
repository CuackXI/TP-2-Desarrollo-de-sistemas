"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const usuarios_routes_1 = __importDefault(require("./routes/usuarios_routes"));
const register_routes_1 = __importDefault(require("./routes/register_routes"));
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/usuarios', usuarios_routes_1.default);
app.use('/register', register_routes_1.default);
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
