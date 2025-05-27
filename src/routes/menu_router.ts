import { Router } from 'express';
import { getPlatos } from '../controllers/menu_controller';

const menuRouter = Router();

menuRouter.get("/", getPlatos)

export default menuRouter