import { Plato, CategoriaPlato } from '@prisma/client';
import { prisma } from '../index';

export class ServicioPlato {
    // Admin
    static async obtener_platos(): Promise<Plato[]> {
        return prisma.plato.findMany();
    }

    // Cliente
    static async obtener_platos_categoria(categoria: CategoriaPlato): Promise<Plato[]> {
        return prisma.plato.findMany({
            where: {
                categoria: categoria,
            },
        });
    }

    // Admin
    static async crear_plato(datos: Omit<Plato, 'id' | 'pedidos'>): Promise<Plato> {
        return prisma.plato.create({
            data: datos
        });
    }

    // Admin
    static async eliminar_plato(id: number): Promise<Plato> {
        return prisma.plato.delete({
            where: { id },
        });
    }
}
