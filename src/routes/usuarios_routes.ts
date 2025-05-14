import { Router } from 'express';
import { eliminarUsuario, getUsuarios } from '../controllers/usuarios_controller';

const usuariosRoutes = Router();

usuariosRoutes.get('/', getUsuarios);
usuariosRoutes.delete('/:id', eliminarUsuario)

export default usuariosRoutes;