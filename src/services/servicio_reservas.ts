import { Reserva } from '@prisma/client';
import { prisma } from '../index';

export class ServicioPlato {
    // Admin
    static async obtener_reservas(): Promise<Reserva[]> {
        return prisma.reserva.findMany();
    }

    // Cliente
    static async obtener_reservas_usuario(usuarioId: number): Promise<Reserva[]> {
        return prisma.reserva.findMany({
            where: {
                usuarioId: usuarioId,
            },
        });
    }

    // Admin?
    static async obtener_reservas_fecha(fecha: Date): Promise<Reserva[]> {
        return prisma.reserva.findMany({
            where: {
                fecha: fecha,
            },
        });
    }

    // Admin
    static async crear_reserva(datos: Omit<Reserva, 'id' | 'usuario' | 'mesa'>): Promise<Reserva> {
        const reserva = await prisma.reserva.create({
            data: {
                usuarioId: datos.usuarioId,
                mesaId: datos.mesaId,
                fecha: datos.fecha,
            },
        });
    
        await prisma.mesa.update({
            where: { id: datos.mesaId },
            data: { disponible: false },
        });
    
        return reserva;
    }

    // Admin
    static async eliminar_reserva(id: number): Promise<Reserva> {
        return prisma.reserva.delete({
            where: { id },
        });
    }
}
