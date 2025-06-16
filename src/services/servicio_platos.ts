import { Plato, CategoriaPlato } from '@prisma/client';
import { prisma } from '../index';
import { ErrorDB } from '../errores/errores';

export class ServicioPlato {
    static ERROR_OBTENER_PLATOS = 'Error al obtener platos';
    static ERROR_CREAR_PLATO = 'Error al crear el plato';
    static ERROR_ELIMINAR_PLATO = 'Error al eliminar el plato';
    static ERROR_PLATO_NO_ENCONTRADO = 'Plato no encontrado';

    // Admin
    static async obtener_platos(): Promise<Plato[]> {
        try {
            return await prisma.plato.findMany();
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPlato.ERROR_OBTENER_PLATOS, 500);
        }
    }

    static async obtener_plato_por_id(id: number): Promise<Plato> {
        let plato;
        try {
            plato = await prisma.plato.findUnique({
                where: { id }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPlato.ERROR_PLATO_NO_ENCONTRADO, 500);
        }

        if (!plato) {
            throw new ErrorDB(ServicioPlato.ERROR_PLATO_NO_ENCONTRADO, 404);
        }

        return plato;
    }

    // Cliente
    static async obtener_platos_categoria(categoria: CategoriaPlato): Promise<Plato[]> {
        try {
            return await prisma.plato.findMany({
                where: { categoria },
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPlato.ERROR_OBTENER_PLATOS, 500);
        }
    }

    // Admin
    static async crear_plato(datos: Omit<Plato, 'id' | 'pedidos'>): Promise<Plato> {
        try {
            return await prisma.plato.create({
                data: datos
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPlato.ERROR_CREAR_PLATO, 400);
        }
    }

    // Admin
    static async eliminar_plato(id: number): Promise<Plato> {
        try {
            return await prisma.plato.delete({ 
                where: { id } 
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioPlato.ERROR_ELIMINAR_PLATO, 500);
        }
    }
}
