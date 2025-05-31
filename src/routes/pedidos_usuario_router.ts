import { Router } from 'express';
import { SessionCheck } from '../auth/session_auth';
import { crearPedido, getEstadosPedidosUsuario, getPedidosUsuario } from '../controllers/pedidos_usuario_controller';

const misPedidosRouter = Router();

misPedidosRouter.get('/', SessionCheck.checkUserIsLogged, getPedidosUsuario);
misPedidosRouter.get('/estados', SessionCheck.checkUserIsLogged, getEstadosPedidosUsuario);
misPedidosRouter.post('/', SessionCheck.checkUserIsLogged, crearPedido);

export default misPedidosRouter;
