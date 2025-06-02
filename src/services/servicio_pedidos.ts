import { Pedido, EstadoPedido, Prisma } from '@prisma/client';
import { prisma } from '../index';
import { ServicioDescuentos } from './servicio_descuentos';

export class ServicioPedidos {
    // Admin - Obtener todos los pedidos con usuario y platos
    static async obtener_pedidos(): Promise<Pedido[]> {
        return prisma.pedido.findMany({
            include: {
                usuario: true,
                platos: {
                    include: { plato: true }
                }
            }
        });
    }

    // Cliente - Obtener pedidos de un usuario específico
    static async obtener_pedidos_usuario(usuarioId: number): Promise<Pedido[]> {
        return prisma.pedido.findMany({
            where: { usuarioId },
            include: {
                platos: {
                    include: { plato: true }
                }
            }
        });
    }

    static async obtener_estados_pedidos_usuario(usuarioId: number): Promise<{ id: number, estado: EstadoPedido }[]> {
        const pedidos = await prisma.pedido.findMany({
            where: { usuarioId },
            select: {
                id: true,
                estado: true
            }
        });
        return pedidos;
    }

    static async crear_pedido({usuarioId, platos}: {usuarioId: number; platos: { platoId: number; cantidad: number }[];}): Promise<Pedido> {
        
        const descuento = await ServicioDescuentos.obtener_descuento_por_usuario(usuarioId);

        if (!Array.isArray(platos) || platos.length === 0) {
            throw new Error('Se debe proporcionar al menos un plato para crear el pedido.');
        }

        const platosInfo = await Promise.all(
            platos.map(async ({ platoId, cantidad }) => {
                const plato = await prisma.plato.findUnique({ where: { id: platoId } });
                if (!plato) throw new Error(`Plato con ID ${platoId} no encontrado`);
                return {
                    platoId,
                    cantidad,
                    subtotal: plato.precio * cantidad
                };
            })
        );
        
        let total = platosInfo.reduce((acc, item) => acc + item.subtotal, 0);
        let subtotal = total;
        total = ServicioDescuentos.calcular_descuento(total, descuento)

        const nuevoPedido = await prisma.pedido.create({
            data: {
                usuarioId,
                subtotal,
                total,
                descuento,
                platos: {
                    create: platos.map(({ platoId, cantidad }) => ({
                        platoId,
                        cantidad
                    }))
                }
            },
            include: {
                platos: {
                    include: { plato: true }
                }
            }
        });

        return nuevoPedido;
    }

    // Admin - Cambiar estado del pedido
    static async actualizar_estado_siguiente(id: number): Promise<Pedido> {
        let estado = await prisma.pedido.findMany({
            where: { id },
            select: {
                estado: true
            }
        });

        let new_estado = estado[0].estado

        if (new_estado == "PENDIENTE"){
            new_estado = "EN_COCINA"
        } else if (new_estado == "EN_COCINA") {
            new_estado = "ENVIADO"
        } else if (new_estado == "ENVIADO"){
            throw Error("El pedido ya fue entregado")
        }

        return await prisma.pedido.update({
            where: { id },
            data: { estado: new_estado }
        });
    }

    // Admin - Eliminar pedido
    static async eliminar_pedido(id: number): Promise<Pedido> {
        return prisma.pedido.delete({
            where: { id }
        });
    }
}
