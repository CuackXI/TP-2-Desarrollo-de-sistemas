import { Mesa } from '@prisma/client';
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

    // Admin
    static async eliminar_mesa(id: number): Promise<Mesa> {
        return prisma.mesa.delete({
            where: { id },
        });
    }
}
