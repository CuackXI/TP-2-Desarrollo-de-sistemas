import { Mesa, Reserva } from '@prisma/client';
import { prisma } from '../index';
import { ErrorDB } from '../errores/errores';

export class ServicioMesa {
    static ERROR_OBTENER_MESAS = 'Error al obtener mesas';
    static ERROR_CREAR_MESA = 'Error al crear mesa';
    static ERROR_MESA_NO_ENCONTRADA = 'Mesa no encontrada';
    static ERROR_ELIMINAR_MESA = 'Error al eliminar mesa';

    // Admin
    static async obtener_mesas(): Promise<Mesa[]> {
        try {
            return await prisma.mesa.findMany();
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioMesa.ERROR_OBTENER_MESAS, 500);
        }
    }

    // Cliente
    static async obtener_mesas_disponible(): Promise<Mesa[]> {
        try {
            return await prisma.mesa.findMany({
                where: { disponible: true }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioMesa.ERROR_OBTENER_MESAS, 500);
        }
    }    

    // Admin
    static async crear_mesa(datos: Omit<Mesa, 'id' | 'disponible' |'reservas'>): Promise<Mesa> {
        try {
            return await prisma.mesa.create({
                data: datos
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioMesa.ERROR_CREAR_MESA, 400);
        }
    }

    static async obtener_mesa_por_numero(numero: number): Promise<Mesa> {
        let mesa;
        try {
            mesa = await prisma.mesa.findUnique({ 
                where: { numero } 
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioMesa.ERROR_MESA_NO_ENCONTRADA, 500);
        }
        if (!mesa) {
            throw new ErrorDB(ServicioMesa.ERROR_MESA_NO_ENCONTRADA, 404);
        }

        return mesa;
    }

    static async obtener_mesa_por_id(id: number): Promise<Mesa & { reservas: Reserva[] }> {
        let mesa;
        try {
            mesa = await prisma.mesa.findUnique({
                where: { id },
                include: { reservas: true }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioMesa.ERROR_MESA_NO_ENCONTRADA, 500);
        }
        
        if (!mesa) {
            throw new ErrorDB(ServicioMesa.ERROR_MESA_NO_ENCONTRADA, 404);
        }

        return mesa;
    }

    // Admin
    static async eliminar_mesa(id: number): Promise<Mesa> {
        try {
            return await prisma.mesa.delete({
                where: { id }
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioMesa.ERROR_ELIMINAR_MESA, 500);
        }
    }
}
