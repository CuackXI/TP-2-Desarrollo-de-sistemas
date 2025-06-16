import { Request, Response } from 'express';
import { ServicioReserva } from '../services/servicio_reservas';
import { ErrorDB } from '../errores/errores';

export async function getReservas(_: Request, res: Response) {
  try { 
    const reservas = await ServicioReserva.obtener_reservas();
    res.json(reservas);
  } catch (error: any) {

    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ mensaje: 'Error al obtener reservas' });
  }
}

export async function eliminarReserva(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ mensaje: 'ID inválido' });
    }

    await ServicioReserva.eliminar_reserva(id);
    res.json({ mensaje: 'Reserva eliminada correctamente' });
  } catch (error: any) {

    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({mensaje: 'Error al eliminar reserva'});}
}