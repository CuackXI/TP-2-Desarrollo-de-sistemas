import { Request, Response } from 'express';
import { ServicioPedidos } from '../services/servicio_pedidos';

export async function getPedidos(_: Request, res: Response) {
  try {
    const pedidos = await ServicioPedidos.obtener_pedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
}

export async function getPedidosUsuario(req: Request, res: Response) {
  try {
    const usuarioId = parseInt(req.params.usuarioId);

    if (isNaN(usuarioId)) {
      return res.status(400).json({ mensaje: 'ID de usuario inválido' });
    }

    const pedidos = await ServicioPedidos.obtener_pedidos_usuario(usuarioId);
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener pedidos del usuario' });
  }
}

export async function crearPedido(req: Request, res: Response) {
  try {
    const { usuarioId, platos } = req.body;

    if (!usuarioId || !Array.isArray(platos) || platos.length === 0) {
      return res.status(400).json({ mensaje: 'Datos incompletos o inválidos' });
    }

    const pedido = await ServicioPedidos.crear_pedido({ usuarioId, platos });
    res.status(201).json(pedido);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ mensaje: 'Error al crear pedido' });
  }
}

export async function actualizarEstadoPedido(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { estado } = req.body;

    if (isNaN(id) || !estado) {
      return res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const pedidoActualizado = await ServicioPedidos.actualizar_estado(id, estado);
    res.json(pedidoActualizado);
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    res.status(500).json({ mensaje: 'Error al actualizar estado del pedido' });
  }
}

export async function eliminarPedido(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'ID inválido' });
    }

    await ServicioPedidos.eliminar_pedido(id);
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    res.status(500).json({ mensaje: 'Error al eliminar pedido' });
  }
}
