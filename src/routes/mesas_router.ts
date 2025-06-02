import { Router } from 'express';
import { getMesas, crearMesa, eliminarMesa } from '../controllers/mesas_controller';
import { SessionCheck } from '../auth/session_auth';

const mesasRouter = Router();

mesasRouter.get('/', SessionCheck.checkUserIsAdmin, getMesas);
mesasRouter.post('/', SessionCheck.checkUserIsAdmin, crearMesa);
mesasRouter.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarMesa);

export default mesasRouter;
