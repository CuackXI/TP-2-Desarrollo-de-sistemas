import { Router } from 'express';
import { getMesasDisponibles } from '../controllers/mesas_controller';
import { SessionCheck } from '../auth/session_auth';

const mesasDisponiblesRouter = Router();

mesasDisponiblesRouter.get('/', SessionCheck.checkUserIsLogged, getMesasDisponibles)

export default mesasDisponiblesRouter;
