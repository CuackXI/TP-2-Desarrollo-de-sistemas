import { Request, Response } from 'express';
import { ServicioReserva } from '../services/servicio_reservas';

export async function getMisReservas(req: Request, res: Response) {
  try {
    if (!req.session.user) {
        throw new Error('No inició sesión');
    }

    const usuarioId = req.session.user.id;
    const reservas = await ServicioReserva.obtener_reservas_usuario(usuarioId);
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener mis reservas:', error);
    res.status(500).json({ mensaje: 'Error al obtener reservas del usuario' });
  }
}

export async function crearReservaUsuario(req: Request, res: Response) {
  try {
    if (!req.session.user) {
        throw new Error('No inició sesión');
    }

    const usuarioId = req.session.user.id;
    const { mesaId } = req.body;

    if (!mesaId) {
        res.status(400).json({ mensaje: 'Falta el ID de la mesa' });
    }

    const reserva = await ServicioReserva.crear_reserva({ mesaId, usuarioId });

    res.status(201).json(reserva);
  } catch (error) {
    console.error('Error al crear reserva del usuario:', error);
    res.status(500).json({ mensaje: 'Error al crear reserva' });
  }
}

export async function eliminarMiReserva(req: Request, res: Response) {
  try {
    if (!req.session.user) {
        throw new Error('No inició sesión');
    }

    const id = parseInt(req.params.id);
    const usuarioId = req.session.user.id;

    const reserva = await ServicioReserva.obtener_reserva_por_id(id);

    if (!reserva) {
        res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }

    if (!reserva || reserva.usuarioId !== usuarioId) {
        res.status(403).json({ mensaje: 'No tenés permiso para eliminar esta reserva' });
    }

    await ServicioReserva.eliminar_reserva(id);
    res.json({ mensaje: 'Reserva eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar reserva del usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar reserva' });
  }
}
