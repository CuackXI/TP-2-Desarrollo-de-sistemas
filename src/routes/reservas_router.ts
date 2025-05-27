import { Router } from 'express';
import { getReservas, crearReserva, eliminarReserva } from '../controllers/reservas_controller';
import { SessionCheck } from '../auth/session_auth';

const reservasRouter = Router();

reservasRouter.get('/', SessionCheck.checkUserIsAdmin, getReservas);
// reservasRouter.post('/', SessionCheck.checkUserIsAdmin, crearReserva);
reservasRouter.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarReserva);

export default reservasRouter;
