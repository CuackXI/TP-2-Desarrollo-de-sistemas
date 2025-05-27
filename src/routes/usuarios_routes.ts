import { Router } from 'express';
import { eliminarUsuario, getUsuarios } from '../controllers/usuarios_controller';
import { SessionCheck } from '../auth/session_auth';

const usuariosRoutes = Router();

usuariosRoutes.get('/', SessionCheck.checkUserIsAdmin, getUsuarios);
usuariosRoutes.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarUsuario)

export default usuariosRoutes;