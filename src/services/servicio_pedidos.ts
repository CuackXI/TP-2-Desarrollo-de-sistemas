import { Pedido, EstadoPedido, Prisma } from '@prisma/client';
import { prisma } from '../index';
import { ServicioDescuentos } from './servicio_descuentos';
import { ServicioUsuario } from './servicio_usuarios';
import { ErrorDB } from '../errores/errores';
import { ServicioPlato } from './servicio_platos';

export class ServicioPedidos {
    static ERROR_OBTENER_PEDIDOS = 'Error al obtener pedidos';
    static ERROR_CREAR_PEDIDO = 'Error al crear el pedido';
    static ERROR_PEDIDO_ENVIADO = 'El pedido ya fue entregado';
    static ERROR_PEDIDO_NO_ENCONTRADO = 'Pedido no encontrado';
    static ERROR_ELIMINAR_PEDIDO = 'Error al eliminar el pedido';

    // Admin - Obtener todos los pedidos con usuario y platos
    static async obtener_pedidos(): Promise<Pedido[]> {
        try {
            return await prisma.pedido.findMany({
                include: {
                    usuario: true,
                    platos: {
                        include: { plato: true }
                    }
                }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPedidos.ERROR_OBTENER_PEDIDOS, 500);
        }
    }

    // Cliente - Obtener pedidos de un usuario específico
    static async obtener_pedidos_usuario(usuarioId: number): Promise<Pedido[]> {
        try {
            return await prisma.pedido.findMany({
                where: { usuarioId },
                include: {
                    platos: {
                        include: { plato: true }
                    }
                }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPedidos.ERROR_OBTENER_PEDIDOS, 500);
        }
    }

    static async obtener_estados_pedidos_usuario(usuarioId: number): Promise<{ id: number, estado: EstadoPedido }[]> {
        try {
            return await prisma.pedido.findMany({
                where: { usuarioId },
                select: {
                    id: true,
                    estado: true
                }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPedidos.ERROR_OBTENER_PEDIDOS, 500);
        }
    }

    static async obtener_pedido_por_id(id: number): Promise<Pedido> {
        let pedido;
        try {
            pedido = await prisma.pedido.findUnique({
                where: { id }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPedidos.ERROR_PEDIDO_NO_ENCONTRADO, 500);
        }

        if (!pedido) {
            throw new ErrorDB(ServicioPedidos.ERROR_PEDIDO_NO_ENCONTRADO, 404);
        }

        return pedido;
    }

    // hay q meter el error d este me dio fiaca
    static async crear_pedido({usuarioId, platos}: {usuarioId: number; platos: { platoId: number; cantidad: number }[];}): Promise<Pedido> {
        try {
            const descuento = await ServicioDescuentos.obtener_descuento_por_usuario(usuarioId);
            const usuario = await ServicioUsuario.get_usuario_por_id(usuarioId);

            if (!Array.isArray(platos) || platos.length === 0) {
                throw new Error('Se debe proporcionar al menos un plato para crear el pedido.');
            }

            let platosInfo;

            try{
                platosInfo = await Promise.all(
                platos.map(async ({ platoId, cantidad }) => {
                        const plato = await ServicioPlato.obtener_plato_por_id(platoId);
                        return {
                            platoId,
                            cantidad,
                            subtotal: plato.precio * cantidad
                        };
                    })
                );
            } catch (error: any) {
                if (error.name == ErrorDB.TIPO) {
                    throw error;
                }
                console.log(error.message);
                throw new ErrorDB(ServicioPedidos.ERROR_CREAR_PEDIDO, 500);
            }
            
            let total = platosInfo.reduce((acc, item) => acc + item.subtotal, 0);
            const subtotal = total;
            total = ServicioDescuentos.calcular_descuento(total, descuento)

            const nuevoPedido = await prisma.pedido.create({
                data: {
                    usuarioId,
                    subtotal,
                    total,
                    descuento,
                    domicilio: usuario.direccion,
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
        } catch (error: any) {
            if (error.name == ErrorDB.TIPO) {
                throw error;
            }

            console.log(error.message);
            throw new ErrorDB(ServicioPedidos.ERROR_CREAR_PEDIDO, 500);
        }
    }

    // Admin - Cambiar estado del pedido
    static async actualizar_estado_siguiente(id: number): Promise<Pedido> {
        try {
            const pedido = await ServicioPedidos.obtener_pedido_por_id(id);

            if (!pedido) {
                throw new ErrorDB(ServicioPedidos.ERROR_PEDIDO_NO_ENCONTRADO, 404);
            }

            let new_estado = pedido.estado;

            if (new_estado === 'PENDIENTE') {
                new_estado = 'EN_COCINA';
            } else if (new_estado === 'EN_COCINA') {
                new_estado = 'ENVIADO';
            } else if (new_estado === 'ENVIADO') {
                throw new ErrorDB(ServicioPedidos.ERROR_PEDIDO_ENVIADO, 400);
            }

            return await prisma.pedido.update({
                where: { id },
                data: { estado: new_estado }
            });
        } catch (error: any) {
            console.log(error.message);
            if (error instanceof ErrorDB) throw error;
            throw new ErrorDB('Error al actualizar el estado del pedido', 500);
        }

    }

    // Admin - Eliminar pedido
    static async eliminar_pedido(id: number): Promise<Pedido> {
        try {
            return await prisma.pedido.delete({
                where: { id }
            });
        } catch (error: any) {
            console.log(error.message);
            if (error instanceof ErrorDB) throw error;
            throw new ErrorDB(ServicioPedidos.ERROR_ELIMINAR_PEDIDO, 500);
        }
    }
}
