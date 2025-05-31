import { Request, Response } from 'express';
import { ServicioReserva } from '../services/servicio_reservas';
import { ServicioMesa } from '../services/servicio_mesas';
import { RolUsuario } from '@prisma/client';

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

    const rol = req.session.user.rol as RolUsuario;
    const usuarioId = req.session.user.id;
    const { numeroMesa } = req.body;

    if (!numeroMesa) {
        res.status(400).json({ mensaje: 'Falta el numero de la mesa' });
    }

    const mesaId = (await ServicioMesa.obtener_mesa_por_numero(numeroMesa)).id;

    let reserva;

    reserva = await ServicioReserva.crear_reserva({ mesaId, usuarioId }, rol);

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
