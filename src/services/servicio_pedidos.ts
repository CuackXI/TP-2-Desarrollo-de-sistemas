import { Pedido, EstadoPedido } from '@prisma/client';
import { prisma } from '../index';

export class ServicioPlato {
    // Admin
    static async obtener_pedidos(): Promise<Pedido[]> {
        return prisma.pedido.findMany();
    }

    // Cliente
    static async obtener_pedidos_usuario(usuarioId: number): Promise<Pedido[]> {
        return prisma.pedido.findMany({
            where: {
                usuarioId: usuarioId,
            },
        });
    }

    // Admin 
    // mentira el total deberia d ser segun el descuento qcy lo veo dsp
    // y lo d pedido plato lo tengo q ver aun tmb, tengo el cerebro ded
    static async crear_pedido(datos: Omit<Pedido, 'id' | 'platos' | 'estado' | 'creadoEn'>): Promise<Pedido> {
        return prisma.pedido.create({
            data: {
                usuarioId: datos.usuarioId,
                total : datos.total,
                descuento: datos.descuento,
            },
        });
    }

    // Admin
    static async actualizar_disponibilidad(id: number, estado: EstadoPedido): Promise<Pedido> {
        return prisma.pedido.update({
            where: { id },
            data: { estado },
        });
    }
    
    // Admin
    static async eliminar_pedido(id: number): Promise<Pedido> {
        return prisma.pedido.delete({
            where: { id },
        });
    }
}
