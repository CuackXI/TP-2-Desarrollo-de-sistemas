import { Router } from 'express';
import { crearPlato, eliminarPlato } from '../controllers/platos_controller';
import { SessionCheck } from '../auth/session_auth';

const platosRouter = Router();

platosRouter.post('/', SessionCheck.checkUserIsAdmin, crearPlato);
platosRouter.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarPlato);

export default platosRouter;
