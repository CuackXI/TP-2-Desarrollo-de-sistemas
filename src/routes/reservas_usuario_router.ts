import { Router } from 'express';
import { getMisReservas, crearReservaUsuario, eliminarMiReserva } from '../controllers/reservas_usuario_controller';
import { SessionCheck } from '../auth/session_auth';

const reservasUsuarioRouter = Router();

reservasUsuarioRouter.get('/', SessionCheck.checkUserIsLogged, getMisReservas);
reservasUsuarioRouter.post('/', SessionCheck.checkUserIsLogged, crearReservaUsuario);
reservasUsuarioRouter.delete('/:id', SessionCheck.checkUserIsLogged, eliminarMiReserva);

export default reservasUsuarioRouter;
