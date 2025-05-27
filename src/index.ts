import express from 'express';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import usuariosRoutes from './routes/usuarios_routes';
import registerRoutes from './routes/register_routes';
import mesasRouter from './routes/mesas_router';
import platosRouter from './routes/platos_router';
import menuRouter from './routes/menu_router';
import loginRouter from './routes/login_router';
import logoutRouter from './routes/logout_router';
import reservasRouter from './routes/reservas_router';

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
app.use('/usuarios', usuariosRoutes)
app.use('/register', registerRoutes)
app.use('/mesas', mesasRouter)
app.use('/platos', platosRouter)
app.use('/menu', menuRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/reservas', reservasRouter)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
