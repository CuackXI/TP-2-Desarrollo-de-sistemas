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

export async function actualizarEstadoPedido(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const pedidoActualizado = await ServicioPedidos.actualizar_estado_siguiente(id);
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
      res.status(400).json({ mensaje: 'ID inválido' });
    }

    await ServicioPedidos.eliminar_pedido(id);
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    res.status(500).json({ mensaje: 'Error al eliminar pedido' });
  }
}
