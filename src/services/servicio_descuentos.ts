import { prisma } from '../index';

export class ServicioDescuentos {
    static async obtener_descuento_por_usuario(usuarioId: number): Promise<number> {
        let cantidadPedidos = await prisma.pedido.count({
            where: { usuarioId }
        });

        // Para considerar el pedido actual
        cantidadPedidos += 1;

        if (cantidadPedidos > 7) return 50;      // TopPremium
        if (cantidadPedidos > 5) return 20;      // Premium
        if (cantidadPedidos > 3) return 10;      // Habitue
        return 0;                                // Sin descuento
    }

    static calcular_descuento(total: number, descuento: number): number {
        return total - total * descuento / 100
    }
}
