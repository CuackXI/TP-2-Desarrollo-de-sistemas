import { Request, Response } from 'express';
import { ServicioPedidos } from '../services/servicio_pedidos';
import { ErrorDB } from '../errores/errores';

export async function getPedidosUsuario(req: Request, res: Response) {
  try {
    if (!req.session.user) {
        throw new Error('No inició sesión');
    }

    const usuarioId = req.session.user.id;

    if (isNaN(usuarioId)) {
        res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }

    const pedidos = await ServicioPedidos.obtener_pedidos_usuario(usuarioId);
    res.json(pedidos);
  } catch (error: any) {

    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al obtener pedidos del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener pedidos del usuario' });
  }
}

export async function getEstadosPedidosUsuario(req: Request, res: Response) {
  try {
    if (!req.session.user) {
      throw new Error('No inició sesión');
    }

    const usuarioId = req.session.user.id;

    if (isNaN(usuarioId)) {
      res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }

    const estados = await ServicioPedidos.obtener_estados_pedidos_usuario(usuarioId);
    res.json(estados);
  } catch (error: any) {

    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al obtener estados de pedidos del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener estados de pedidos del usuario' });
  }
}

export async function crearPedido(req: Request, res: Response) {
  try {
    if (!req.session.user) {
        throw new Error('No inició sesión');
    }

    const usuarioId = req.session.user.id;

    const { platos } = req.body;

    if (!Array.isArray(platos) || platos.length === 0) {
    res.status(400).json({ mensaje: 'Datos incompletos o inválidos' });
    }

    const pedido = await ServicioPedidos.crear_pedido({ usuarioId, platos });
    res.status(201).json(pedido);
  } catch (error: any) {

    if (error.name == ErrorDB.TIPO) {
      res.status(error.status).json({ mensaje: error.message });
    }
    console.error('Error al crear pedido:', error);
    res.status(500).json({ mensaje: 'Error al crear pedido' });
  }
}