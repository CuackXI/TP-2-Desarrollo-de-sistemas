import { Reserva } from '@prisma/client';
import { prisma } from '../index';

export class ServicioReserva {
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

    // Admin
    static async crear_reserva(datos: Omit<Reserva, 'id' | 'usuario' | 'mesa'>): Promise<Reserva> {
        const reserva = await prisma.reserva.create({
            data: datos
        });

        await prisma.mesa.update({
            where: {
                id: reserva.mesaId
            },
            data: {
                disponible: false
            }
        })
    
        return reserva;
    }

    // Admin
    static async eliminar_reserva(id: number) {
        const reserva = await prisma.reserva.findUnique({
            where: { id },
        });

        if (!reserva){
            throw new Error('Reserva no encontrada');
        }

        await prisma.reserva.delete({
            where: { id },
        });

        await prisma.mesa.update({
            where: {
                id: (await reserva).mesaId
            },
            data: {
                disponible: true
            }
        })

    }
}
