import { Plato } from '@prisma/client';
import { prisma } from '../index';

export class ServicioPlato {
    // Admin
    static async obtener_platos(): Promise<Plato[]> {
        return prisma.plato.findMany();
    }

    // Cliente
    static async obtener_platos_disponibles(): Promise<Plato[]> {
        return prisma.plato.findMany({
            where: {
                disponible: true,
            },
        });
    }

    // Admin
    static async crear_plato(datos: Omit<Plato, 'id' | 'pedidos'>): Promise<Plato> {
        return prisma.plato.create({
            data: {
                nombre: datos.nombre,
                precio: datos.precio,
                disponible: datos.disponible,
            },
        });
    }

    // Admin
    static async actualizar_disponibilidad(id: number, disponible: boolean): Promise<Plato> {
        return prisma.plato.update({
            where: { id },
            data: { disponible },
        });
    }

    // Admin
    static async eliminar_plato(id: number): Promise<Plato> {
        return prisma.plato.delete({
            where: { id },
        });
    }
}
