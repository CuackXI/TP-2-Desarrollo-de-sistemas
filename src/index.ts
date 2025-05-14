// src/index.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import usuariosRoutes from './routes/usuarios_routes';
import registerRoutes from './routes/register_routes';

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.use('/usuarios', usuariosRoutes)
app.use('/register', registerRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
