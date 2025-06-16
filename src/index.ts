import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import usuariosRoutes from './routes/usuarios_routes';
import registerRoutes from './routes/register_routes';
import mesasRouter from './routes/mesas_router';
import platosRouter from './routes/platos_router';
import menuRouter from './routes/menu_router';
import loginRouter from './routes/login_router';
import logoutRouter from './routes/logout_router';
import reservasRouter from './routes/reservas_router';
import reservasUsuarioRouter from './routes/reservas_usuario_router';
import mesasDisponiblesRouter from './routes/mesas_disponibles';
import pedidosRouter from './routes/pedidos_router';
import misPedidosRouter from './routes/pedidos_usuario_router';

export const prisma = new PrismaClient();

declare module 'express-session' {
    interface SessionData {
        user: User;
    }
};

const app = express();

app.use(session({
    secret: 'miguesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

// Usuarios
app.use('/usuarios', usuariosRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)

// Mesas
app.use('/mesas', mesasRouter)
app.use('/mesas_disponibles', mesasDisponiblesRouter)

// Platos
app.use('/platos', platosRouter)
app.use('/menu', menuRouter)

// Reservas
app.use('/reservas', reservasRouter)
app.use('/mis_reservas', reservasUsuarioRouter)

// Pedidos
app.use('/pedidos', pedidosRouter)
app.use('/mis_pedidos', misPedidosRouter)

// Posible uso en el futuro
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
