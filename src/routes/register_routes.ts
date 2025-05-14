import { Router } from 'express';
import { registrarse } from '../controllers/register_controller';

const registerRoutes = Router();

registerRoutes.post('/', registrarse);

export default registerRoutes;