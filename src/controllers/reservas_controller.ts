import { Request, Response } from 'express';
import { ServicioReserva } from '../services/servicio_reservas';

export async function getReservas(_: Request, res: Response) {
  try { 
    const reservas = await ServicioReserva.obtener_reservas();
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ mensaje: 'Error al obtener reservas' });
  }
}

export async function crearReserva(req: Request, res: Response) {  
  try {
    const { usuarioId, mesaId } = req.body;
    
    if (!mesaId || !usuarioId) {
      res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const reserva = await ServicioReserva.crear_reserva({mesaId, usuarioId,});
    
    res.status(201).json(reserva);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ 
      mensaje: 'Error al crear reserva'});
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
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    
    if (error instanceof Error && error.message === 'Reserva no encontrada') {
      res.status(404).json({ mensaje: error.message });
    }
    
    res.status(500).json({ 
      mensaje: 'Error al eliminar reserva'});
  }
}