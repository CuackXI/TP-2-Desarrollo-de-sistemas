import { Router } from 'express';
import { SessionCheck } from '../auth/session_auth';
import { actualizarEstadoPedido, eliminarPedido, getPedidos } from '../controllers/pedidos_controller';

const pedidosRouter = Router();

pedidosRouter.get('/', SessionCheck.checkUserIsAdmin, getPedidos);
pedidosRouter.patch('/:id', SessionCheck.checkUserIsAdmin, actualizarEstadoPedido); 
pedidosRouter.delete('/:id', SessionCheck.checkUserIsAdmin, eliminarPedido);

export default pedidosRouter;
