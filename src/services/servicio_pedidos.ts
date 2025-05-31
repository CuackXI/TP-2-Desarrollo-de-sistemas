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

    static async crear_pedido({
            usuarioId,
            platos
        }: {
            usuarioId: number;
            platos: { platoId: number; cantidad: number }[];
        }): Promise<Pedido> {
            const descuento = await ServicioDescuentos.obtener_descuento_por_usuario(usuarioId);

        // Buscar precios de los platos
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
        
        // Calcular total
        let total = platosInfo.reduce((acc, item) => acc + item.subtotal, 0);
        if (descuento) {
            total = ServicioDescuentos.calcular_descuento(total, descuento)
        }

        // Crear pedido
        const nuevoPedido = await prisma.pedido.create({
            data: {
                usuarioId,
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
    static async actualizar_estado(id: number, estado: EstadoPedido): Promise<Pedido> {
        return prisma.pedido.update({
            where: { id },
            data: { estado }
        });
    }

    // Admin - Eliminar pedido
    static async eliminar_pedido(id: number): Promise<Pedido> {
        return prisma.pedido.delete({
            where: { id }
        });
    }
}
