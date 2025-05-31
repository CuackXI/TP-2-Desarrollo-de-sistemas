import { Mesa, Reserva } from '@prisma/client';
import { prisma } from '../index';

export class ServicioMesa {
    // Admin
    static async obtener_mesas(): Promise<Mesa[]> {
        return prisma.mesa.findMany();
    }

    // Cliente
    static async obtener_mesas_disponible(): Promise<Mesa[]> {
        return prisma.mesa.findMany({
            where: {
                disponible: true
            }
        });
    }    

    // Admin
    static async crear_mesa(datos: Omit<Mesa, 'id' | 'disponible' |'reservas'>): Promise<Mesa> {
        return prisma.mesa.create({
            data: datos
        });
    }

    static async obtener_mesa_por_numero(numero: number): Promise<Mesa> {
        const mesa = await prisma.mesa.findUnique({
            where: { numero },
        });

        if (!mesa) {
            throw new Error('Mesa no encontrada');
        }
        
        return mesa;
    }

    static async obtener_mesa_por_id(id: number): Promise<Mesa & { reservas: Reserva[] }> {
        const mesa = await prisma.mesa.findUnique({
            where: { id },
            include: { reservas: true },
        });

        if (!mesa) {
            throw new Error('Mesa no encontrada');
        }
        
        return mesa;
    }

    // Admin
    static async eliminar_mesa(id: number): Promise<Mesa> {
        const mesa = await ServicioMesa.obtener_mesa_por_id(id);

        if (!mesa) {
            throw new Error(`No se encontró la mesa con ID ${id}`);
        }

        return prisma.mesa.delete({
            where: { id },
        });
    }
}
