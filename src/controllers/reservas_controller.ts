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

export async function getReservasUsuario(req: Request, res: Response) {
  try { 
    const usuarioId = parseInt(req.params.usuarioId);
    if (isNaN(usuarioId)) {
      res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }

    const reservas = await ServicioReserva.obtener_reservas_usuario(usuarioId);
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener reservas del usuario' });
  }
}

export async function crearReserva(req: Request, res: Response) {
  /*
  "\nInvalid `index_1.prisma.reserva.create()` invocation in\n/home/ubuntu/TP-2-Desarrollo-de-sistemas/dist/services/servicio_reservas.js:31:58\n\n  28 }\n  29 static crear_reserva(datos) {\n  30     return __awaiter(this, void 0, void 0, function* () {\n→ 31         const reserva = yield index_1.prisma.reserva.create(\nForeign key constraint violated on the foreign key"
  */

  try {
    const { mesaId, usuarioId } = req.body;
    
    if (!mesaId || !usuarioId) {
      res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const reserva = await ServicioReserva.crear_reserva({mesaId, usuarioId,});
    
    res.status(201).json(reserva);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ 
      mensaje: 'Error al crear reserva',});
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
      mensaje: 'Error al eliminar reserva',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}