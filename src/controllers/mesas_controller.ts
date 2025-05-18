import { Request, Response } from 'express';
import { ServicioMesa } from '../services/servicio_mesas';

export async function getMesas(req: Request, res: Response) {
  try {
    const mesas = await ServicioMesa.obtener_mesas();
    res.json(mesas);
  } catch (error) {
    console.error('Error al obtener mesas:', error);
    res.status(500).json({ mensaje: 'Error al obtener mesas' });
  }
}

export async function crearMesa(req: Request, res: Response) {
  try {
    const { numero, disponible } = req.body;

    if (typeof numero !== 'number' || typeof disponible !== 'boolean') {
      return res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const mesa = await ServicioMesa.crear_mesa({ numero, disponible });
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
      return res.status(400).json({ mensaje: 'ID inválido' });
    }

    const mesa = await ServicioMesa.eliminar_mesa(id);
    res.json(mesa);
  } catch (error) {
    console.error('Error al eliminar mesa:', error);
    res.status(500).json({ mensaje: 'Error al eliminar mesa' });
  }
}

export async function verificarDisponibilidadMesa(req: Request, res: Response) {
  try {
    const idMesa = parseInt(req.params.idMesa);
    const { fecha } = req.query;

    if (isNaN(idMesa) || typeof fecha !== 'string') {
      return res.status(400).json({ mensaje: 'Parámetros inválidos' });
    }

    const fechaDate = new Date(fecha);
    const disponible = await ServicioMesa.esta_mesa_disponible(idMesa, fechaDate);

    res.json({ disponible });
  } catch (error) {
    console.error('Error al verificar disponibilidad de mesa:', error);
    res.status(500).json({ mensaje: 'Error al verificar disponibilidad de mesa' });
  }
}
