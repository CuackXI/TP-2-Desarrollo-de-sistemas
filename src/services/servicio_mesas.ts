import { Mesa } from '@prisma/client';
import { prisma } from '../index';

export class ServicioMesa {
    // Cliente
    static async obtener_mesas(): Promise<Mesa[]> {
        return prisma.mesa.findMany();
    }

    // Cliente
    static async esta_mesa_disponible(idMesa: number, fecha: Date): Promise<boolean> {
        const reservas = await prisma.reserva.findMany({
            where: {
                mesaId: idMesa,
                fecha: fecha,
            },
        });

        return reservas.length === 0;
    }

    // Admin
    static async crear_mesa(datos: Omit<Mesa, 'id' | 'reservas'>): Promise<Mesa> {
        return prisma.mesa.create({
            data: {
                numero: datos.numero,
                disponible: datos.disponible,
            },
        });
    }

    // Admin
    static async eliminar_mesa(id: number): Promise<Mesa> {
        return prisma.mesa.delete({
            where: { id },
        });
    }
}
