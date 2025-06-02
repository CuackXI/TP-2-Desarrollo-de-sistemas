import { Request, Response } from 'express';
import { ServicioMesa } from '../services/servicio_mesas';

export async function getMesas(_: Request, res: Response) {
  try { 
    const mesas = await ServicioMesa.obtener_mesas();
    res.json(mesas);
  } catch (error) {
    console.error('Error al obtener mesas:', error);
    res.status(500).json({ mensaje: 'Error al obtener mesas' });
  }
}

export async function getMesasDisponibles(_: Request, res: Response) {
  try { 
    const mesas = await ServicioMesa.obtener_mesas_disponible();
    res.json(mesas);
  } catch (error) {
    console.error('Error al obtener mesas:', error);
    res.status(500).json({ mensaje: 'Error al obtener mesas' });
  }
}

export async function crearMesa(req: Request, res: Response) {
  try {
    const { numero } = req.body;
    
    if (typeof numero !== 'number') {
      res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const mesa = await ServicioMesa.crear_mesa({ numero });
    res.status(201).json(mesa);
  } catch (error) {
    console.error('Error al crear mesa:', error);
    res.status(500).json({ mensaje: 'Error al crear mesa' });
  }
}

export async function eliminarMesa(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ mensaje: 'ID inválido' });
    }

    const mesa = await ServicioMesa.eliminar_mesa(id);
    res.json(mesa);
  } catch (error) {
    console.error('Error al eliminar mesa:', error);
    res.status(500).json({ mensaje: 'Error al eliminar mesa' });
  }
}