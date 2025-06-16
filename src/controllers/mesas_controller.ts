import { Request, Response } from 'express';
import { ServicioMesa } from '../services/servicio_mesas';
import { ErrorDB } from '../errores/errores';

// Obtener mesas
export async function getMesas(_: Request, res: Response) {
  try { 

    const mesas = await ServicioMesa.obtener_mesas();
    res.json(mesas);

  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }

    console.error('Error al obtener mesas:', error);
    res.status(500).json({ mensaje: 'Error al obtener mesas' });
  }
}

// Obtener mesas disponibles
export async function getMesasDisponibles(_: Request, res: Response) {
  try { 

    const mesas = await ServicioMesa.obtener_mesas_disponible();
    res.json(mesas);
    
  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }

    console.error('Error al obtener mesas:', error);
    res.status(500).json({ mensaje: 'Error al obtener mesas' });
  }
}

// Crear mesa
export async function crearMesa(req: Request, res: Response) {
  try {
    const { numero } = req.body;
    
    if (typeof numero !== 'number') {
      res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const mesa = await ServicioMesa.crear_mesa({ numero });
    res.status(201).json(mesa);
  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al crear mesa:', error);
    res.status(500).json({ mensaje: 'Error al crear mesa' });
  }
}

// Eliminar mesa
export async function eliminarMesa(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ mensaje: 'ID inválido' });
    }

    await ServicioMesa.eliminar_mesa(id);
    res.json({ mensaje: 'Mesa eliminada correctamente' });
  } catch (error: any) {
    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    
    console.error('Error al eliminar mesa:', error);
    res.status(500).json({ mensaje: 'Error al eliminar mesa' });
  }
}