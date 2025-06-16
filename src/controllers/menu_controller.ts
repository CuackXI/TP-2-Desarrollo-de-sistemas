import { Request, Response } from 'express';
import { ServicioPlato } from '../services/servicio_platos';
import { ErrorDB } from '../errores/errores';

export async function getPlatos(_: Request, res: Response) {
  try {
    try {
      const platos = await ServicioPlato.obtener_platos();
      res.status(200).json(platos);

    } catch (error: any) {
      if (error.name == ErrorDB.TIPO) {
        res.status(error.status).json({ mensaje: error.message });
      }
    }

  } catch (error: any) {
    res.status(500).json({ 'Error en obtener platos': error.message });
  }
}