import { Router } from 'express';
import { logout } from '../controllers/logout_controller';
import { SessionCheck } from '../auth/session_auth';

const logoutRouter = Router();

logoutRouter.get('/', SessionCheck.checkUserIsLogged, logout);

export default logoutRouter;
