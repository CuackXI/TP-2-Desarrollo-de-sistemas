import { Router } from 'express';
import { getMesas, crearMesa, eliminarMesa, verificarDisponibilidadMesa } from '../controllers/mesas_controller';

const mesasRouter = Router();

mesasRouter.get('/', getMesas);
// mesasRouter.post('/', crearMesa);
// mesasRouter.delete('/:id', eliminarMesa);
// mesasRouter.get('/:id/disponible', verificarDisponibilidadMesa);

export default mesasRouter;
