import { Request, Response } from 'express';
import { ServicioPlato } from '../services/servicio_platos';

export async function getPlatos(req: Request, res: Response) {
  try {
    const platos = await ServicioPlato.obtener_platos();
    res.json(platos);
  } catch (error) {
    console.error('Error al obtener platos:', error);
    res.status(500).json({ mensaje: 'Error al obtener platos' });
  }
}