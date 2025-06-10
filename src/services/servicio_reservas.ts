import { Reserva, RolUsuario } from '@prisma/client';
import { prisma } from '../index';
import { ServicioMesa } from './servicio_mesas';
import { ErrorDB } from '../errores/errores';

export class ServicioReserva {
    static ERROR_OBTENER_RESERVAS = 'Error al obtener reservas';
    static ERROR_OBTENER_RESERVA = 'Error al obtener reserva';
    static ERROR_CREAR_RESERVA = 'Error al crear la reserva';
    static ERROR_ELIMINAR_RESERVA = 'Error al eliminar reserva';
    static ERROR_RESERVA_NO_ENCONTRADA = 'Reserva no encontrada';
    static ERROR_MESA_NO_DISPONIBLE = 'La mesa no está disponible';

    // Admin
    static async obtener_reservas(): Promise<Reserva[]> {
        try {
            return await prisma.reserva.findMany();
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioReserva.ERROR_OBTENER_RESERVAS, 500);
        }
    }

    // Cliente
    static async obtener_reservas_usuario(usuarioId: number): Promise<Reserva[]> {
        try {
            return await prisma.reserva.findMany({
                where: { usuarioId },
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioReserva.ERROR_OBTENER_RESERVAS, 500);
        }
    }

    // Admin
    static async obtener_reserva_por_id(id: number): Promise<Reserva | null> {
        let reserva;
        try {
            reserva = await prisma.reserva.findUnique({
                where: { id },
            });
        } catch (error: any) {
            console.log(error.message);
            throw new ErrorDB(ServicioReserva.ERROR_OBTENER_RESERVA, 500);
        }
        if (!reserva) {
            throw new ErrorDB(ServicioReserva.ERROR_RESERVA_NO_ENCONTRADA, 404);
        }

        return reserva;
    }

    // Cliente
    static async crear_reserva(datos: Omit<Reserva, 'id' | 'usuario' | 'mesa'>, rol: RolUsuario): Promise<Reserva> {
        try {
            const mesa = await ServicioMesa.obtener_mesa_por_id(datos.mesaId);

            if (!mesa.disponible && rol.toString() === 'CLIENTE') {
                throw new ErrorDB(ServicioReserva.ERROR_MESA_NO_DISPONIBLE, 400);
            }

            const reserva = await prisma.reserva.create({
                data: datos
            });

            await prisma.mesa.update({
                where: { id: reserva.mesaId },
                data: { disponible: false }
            });

            return reserva;
        } catch (error: any) {
            console.log(error.message);
            if (error instanceof ErrorDB) throw error;
            throw new ErrorDB(ServicioReserva.ERROR_CREAR_RESERVA, 500);
        }
    }

    // Admin
    static async eliminar_reserva(id: number) {
        try {
            const reserva = await prisma.reserva.findUnique({
                where: { id },
            });

            if (!reserva) {
                throw new ErrorDB(ServicioReserva.ERROR_RESERVA_NO_ENCONTRADA, 404);
            }

            await prisma.reserva.delete({
                where: { id },
            });

            const mesaId = reserva.mesaId;

            const reservasRestantes = await prisma.reserva.findMany({
                where: { mesaId },
            });

            if (reservasRestantes.length === 0) {
                await prisma.mesa.update({
                    where: { id: mesaId },
                    data: { disponible: true },
                });
            }
        } catch (error: any) {
            console.log(error.message);
            if (error instanceof ErrorDB) throw error;
            throw new ErrorDB(ServicioReserva.ERROR_ELIMINAR_RESERVA, 500);
        }
    }
}
