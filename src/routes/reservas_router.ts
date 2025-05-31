import { Router } from 'express';
import { getReservas, eliminarReserva } from '../controllers/reservas_controller';
import { SessionCheck } from '../auth/session_auth';

const reservasRouter = Router();

reservasRouter.get('/', SessionCheck.checkUserIsAdmin, getReservas);
reservasRouter.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarReserva);

export default reservasRouter;
