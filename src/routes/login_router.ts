import { Router } from 'express';
import { login } from '../controllers/login_controller';
import { SessionCheck } from '../auth/session_auth';

const loginRouter = Router();

loginRouter.post('/', SessionCheck.checkUserIsUnlogged, login);

export default loginRouter;
