import { Router } from 'express';
import { getReservas, getReservasUsuario, crearReserva, eliminarReserva } from '../controllers/reservas_controller';
import { SessionCheck } from '../auth/session_auth';

const reservasRouter = Router();

reservasRouter.get('/', SessionCheck.checkUserIsAdmin, getReservas);
// ReservasRouter.get('/', SessionCheck.checkUserIsLogged, getReservasUsuario)
reservasRouter.post('/', SessionCheck.checkUserIsAdmin, crearReserva);
reservasRouter.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarReserva);
// HACER UN COSO D RESERVAS PARA LOS USUARIOS , UN ROUTER NEW

export default reservasRouter;
