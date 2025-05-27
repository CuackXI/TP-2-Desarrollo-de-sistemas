"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const client_1 = require("@prisma/client");
const usuarios_routes_1 = __importDefault(require("./routes/usuarios_routes"));
const register_routes_1 = __importDefault(require("./routes/register_routes"));
const mesas_router_1 = __importDefault(require("./routes/mesas_router"));
const platos_router_1 = __importDefault(require("./routes/platos_router"));
const menu_router_1 = __importDefault(require("./routes/menu_router"));
const login_router_1 = __importDefault(require("./routes/login_router"));
const logout_router_1 = __importDefault(require("./routes/logout_router"));
const reservas_router_1 = __importDefault(require("./routes/reservas_router"));
const reservas_usuario_router_1 = __importDefault(require("./routes/reservas_usuario_router"));
exports.prisma = new client_1.PrismaClient();
;
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'miguesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express_1.default.json());
app.use('/usuarios', usuarios_routes_1.default);
app.use('/register', register_routes_1.default);
app.use('/mesas', mesas_router_1.default);
app.use('/platos', platos_router_1.default);
app.use('/menu', menu_router_1.default);
app.use('/login', login_router_1.default);
app.use('/logout', logout_router_1.default);
app.use('/reservas', reservas_router_1.default);
app.use('/reservas/usuario', reservas_usuario_router_1.default);
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
